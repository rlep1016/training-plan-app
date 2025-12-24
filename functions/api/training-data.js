export async function onRequestGet(context) {
  const { env } = context;
  const db = env.TRAINING_DB;

  try {
    // 获取所有训练动作
    const results = await db.prepare(
      `SELECT * FROM training_actions ORDER BY tab, stage, id`
    ).all();

    // 转换数据格式为前端期望的结构
    const formattedData = {
      push: { warmup: [], formal: [], relax: [] },
      pull: { warmup: [], formal: [], relax: [] },
      leg: { warmup: [], formal: [], relax: [] }
    };

    results.results.forEach(action => {
      formattedData[action.tab][action.stage].push(action);
    });

    return new Response(JSON.stringify(formattedData), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching training data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch training data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPut(context) {
  const { env, request } = context;
  const db = env.TRAINING_DB;

  try {
    // 获取请求体
    const data = await request.json();
    console.log('Received data for PUT request:', JSON.stringify(data, null, 2));

    // 开始事务
    await db.exec('BEGIN TRANSACTION');
    console.log('Transaction started');

    // 清空现有数据
    await db.exec('DELETE FROM training_actions');
    console.log('Cleared existing data');

    // 插入所有数据
    let insertedCount = 0;
    
    // 遍历所有标签页和阶段
    const tabs = ['push', 'pull', 'leg'];
    const stages = ['warmup', 'formal', 'relax'];

    for (const tab of tabs) {
      for (const stage of stages) {
        const actions = data[tab]?.[stage] || [];
        console.log(`Processing ${tab}.${stage}: ${actions.length} actions`);
        
        for (const action of actions) {
          try {
            // 直接使用run方法插入数据，不使用bind
            await db.run(
              `INSERT INTO training_actions (id, tab, stage, name, sets, weight, tips, remark, tutorial) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              action.id,
              tab,
              stage,
              action.name,
              action.sets,
              action.weight,
              action.tips,
              action.remark,
              action.tutorial || ''
            );
            insertedCount++;
          } catch (insertError) {
            console.error('Error inserting action:', insertError, 'Action data:', action);
            throw insertError;
          }
        }
      }
    }

    // 提交事务
    await db.exec('COMMIT');
    console.log(`Transaction committed. Inserted ${insertedCount} actions.`);

    return new Response(JSON.stringify({ success: true, insertedCount }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // 回滚事务
    await db.exec('ROLLBACK');
    console.error('Error in PUT request:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to save training data',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
