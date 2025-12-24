export async function onRequestGet(context) {
  try {
    const { env } = context;
    
    // 检查D1绑定是否存在
    if (!env || !env.TRAINING_DB) {
      console.error('D1 binding TRAINING_DB not found in environment');
      return new Response(JSON.stringify({ 
        error: 'D1 binding not configured',
        details: 'TRAINING_DB binding is missing from environment' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const db = env.TRAINING_DB;
    
    try {
      // 获取所有训练动作
      console.log('Executing SELECT query to get all training actions');
      const results = await db.prepare(
        `SELECT * FROM training_actions ORDER BY tab, stage, id`
      ).all();
      
      console.log('Query executed successfully, results:', results);
      
      // 检查结果是否存在
      if (!results || !results.results) {
        console.error('Invalid results format from D1 query:', results);
        return new Response(JSON.stringify({ 
          error: 'Invalid query results',
          details: 'D1 returned invalid results format' 
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 转换数据格式为前端期望的结构
      const formattedData = {
        push: { warmup: [], formal: [], relax: [] },
        pull: { warmup: [], formal: [], relax: [] },
        leg: { warmup: [], formal: [], relax: [] }
      };

      results.results.forEach(action => {
        // 确保action有必要的字段
        if (action && action.tab && action.stage) {
          formattedData[action.tab][action.stage].push(action);
        } else {
          console.error('Invalid action format:', action);
        }
      });

      console.log('Returning formatted data with', 
        Object.values(formattedData.push).reduce((sum, arr) => sum + arr.length, 0) + ' push actions,',
        Object.values(formattedData.pull).reduce((sum, arr) => sum + arr.length, 0) + ' pull actions,',
        Object.values(formattedData.leg).reduce((sum, arr) => sum + arr.length, 0) + ' leg actions'
      );

      return new Response(JSON.stringify(formattedData), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (queryError) {
      console.error('Error executing SQL query:', queryError);
      return new Response(JSON.stringify({ 
        error: 'Failed to fetch training data',
        details: queryError.message || 'Unknown database error',
        stack: queryError.stack || 'No stack trace available' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Unexpected error in onRequestGet:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message || 'Unknown error',
      stack: error.stack || 'No stack trace available' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPut(context) {
  try {
    const { env, request } = context;
    
    // 检查D1绑定是否存在
    if (!env || !env.TRAINING_DB) {
      console.error('D1 binding TRAINING_DB not found in environment for PUT request');
      return new Response(JSON.stringify({ 
        error: 'D1 binding not configured',
        details: 'TRAINING_DB binding is missing from environment' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const db = env.TRAINING_DB;
    let transactionStarted = false;

    try {
      // 获取请求体
      console.log('Reading request body for PUT request');
      const data = await request.json();
      console.log('Received data for PUT request:', JSON.stringify(data, null, 2));
      
      // 验证数据格式
      if (!data || typeof data !== 'object') {
        return new Response(JSON.stringify({ 
          error: 'Invalid request body',
          details: 'Request body must be a JSON object' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 开始事务
      await db.exec('BEGIN TRANSACTION');
      transactionStarted = true;
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
              // 验证动作数据
              if (!action || !action.id || !action.name) {
                console.warn('Skipping invalid action:', action);
                continue;
              }
              
              // 直接使用run方法插入数据
              await db.run(
                `INSERT INTO training_actions (id, tab, stage, name, sets, weight, tips, remark, tutorial) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                action.id,
                tab,
                stage,
                action.name,
                action.sets || '',
                action.weight || '',
                action.tips || '',
                action.remark || '',
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
      transactionStarted = false;
      console.log(`Transaction committed. Inserted ${insertedCount} actions.`);

      return new Response(JSON.stringify({ success: true, insertedCount }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      // 回滚事务（如果已开始）
      if (transactionStarted) {
        try {
          await db.exec('ROLLBACK');
          console.log('Transaction rolled back due to error');
        } catch (rollbackError) {
          console.error('Error during rollback:', rollbackError);
        }
      }
      
      console.error('Error in PUT request:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to save training data',
        details: error.message || 'Unknown error',
        stack: error.stack || 'No stack trace available' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Unexpected error in onRequestPut:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message || 'Unknown error',
      stack: error.stack || 'No stack trace available' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
