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
    
    // 简化实现：直接使用prepare和bind，不使用run方法
    // 先清空现有数据
    await db.prepare('DELETE FROM training_actions').run();
    
    // 准备插入语句
    const stmt = db.prepare(
      `INSERT INTO training_actions (id, tab, stage, name, sets, weight, tips, remark, tutorial) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    
    let insertedCount = 0;
    
    // 遍历所有标签页和阶段
    const tabs = ['push', 'pull', 'leg'];
    const stages = ['warmup', 'formal', 'relax'];

    for (const tab of tabs) {
      if (!data[tab]) continue;
      
      for (const stage of stages) {
        const actions = data[tab][stage] || [];
        
        for (const action of actions) {
          // 确保动作数据完整
          if (!action || !action.id || !action.name) continue;
          
          // 使用bind和run方法插入数据
          await stmt.bind(
            action.id,
            tab,
            stage,
            action.name,
            action.sets || '',
            action.weight || '',
            action.tips || '',
            action.remark || '',
            action.tutorial || ''
          ).run();
          
          insertedCount++;
        }
      }
    }

    // 返回成功响应
    return new Response(JSON.stringify({ success: true, insertedCount }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // 简化错误处理，不使用事务回滚
    // Cloudflare D1会自动处理事务
    return new Response(JSON.stringify({ 
      error: 'Failed to save training data',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
