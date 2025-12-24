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
    const data = await request.json();

    // 开始事务
    await db.exec('BEGIN TRANSACTION');

    // 清空现有数据
    await db.exec('DELETE FROM training_actions');

    // 插入所有数据
    const stmt = db.prepare(
      `INSERT INTO training_actions (id, tab, stage, name, sets, weight, tips, remark, tutorial) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    // 遍历所有标签页和阶段
    const tabs = ['push', 'pull', 'leg'];
    const stages = ['warmup', 'formal', 'relax'];

    for (const tab of tabs) {
      for (const stage of stages) {
        const actions = data[tab][stage] || [];
        for (const action of actions) {
          await stmt.bind(
            action.id,
            tab,
            stage,
            action.name,
            action.sets,
            action.weight,
            action.tips,
            action.remark,
            action.tutorial || ''
          ).run();
        }
      }
    }

    // 提交事务
    await db.exec('COMMIT');

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // 回滚事务
    await db.exec('ROLLBACK');
    console.error('Error saving training data:', error);
    return new Response(JSON.stringify({ error: 'Failed to save training data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
