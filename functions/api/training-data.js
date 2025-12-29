export async function onRequestGet(context) {
  const { env } = context;
  const db = env.TRAINING_DB;

  try {
    // 获取所有训练动作
    const results = await db.prepare(
      `SELECT * FROM training_actions ORDER BY tab, stage, id`
    ).all();

    // 记录原始查询结果
    console.log('Raw query results:', results.results);
    console.log('Total actions found:', results.results.length);
    
    // 按tab分组统计
    const tabCount = {};
    results.results.forEach(action => {
      tabCount[action.tab] = (tabCount[action.tab] || 0) + 1;
    });
    console.log('Actions per tab:', tabCount);

    // 转换数据格式为前端期望的结构
    const formattedData = {
      push: { warmup: [], formal: [], relax: [] },
      pull: { warmup: [], formal: [], relax: [] },
      leg: { warmup: [], formal: [], relax: [] }
    };

    // 遍历并添加到对应数组
    results.results.forEach(action => {
      if (formattedData[action.tab] && formattedData[action.tab][action.stage]) {
        formattedData[action.tab][action.stage].push(action);
        console.log('Added action:', action.id, action.tab, action.stage, action.name);
      } else {
        console.error('Invalid tab or stage:', action.tab, action.stage);
      }
    });
    
    // 记录最终格式化数据
    console.log('Formatted data:', formattedData);

    return new Response(JSON.stringify(formattedData), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching training data:', error);
    console.error('Error stack:', error.stack);
    return new Response(JSON.stringify({ error: 'Failed to fetch training data', details: error.message }), {
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
