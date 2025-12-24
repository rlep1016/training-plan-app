// 初始训练数据
const defaultTrainData = {
    push: {
        warmup: [
            { id: 1, name: "跑步机慢走/椭圆机", sets: "1组×5分钟", weight: "-", tips: "中等速度，活动心肺，微微出汗", remark: "有氧器械", tutorial: "" },
            { id: 2, name: "手臂环绕（前后各）", sets: "1组×20次（每侧）", weight: "-", tips: "双臂自然下垂，画大圈活动肩关节，幅度由小到大", remark: "无", tutorial: "" },
            { id: 3, name: "胸肌动态拉伸", sets: "1组×15次", weight: "-", tips: "双手交叉举过头顶，向侧下方拉伸，感受胸肌舒展", remark: "无", tutorial: "" },
            { id: 4, name: "肘关节活动+腕关节绕环", sets: "1组×20次（每侧）", weight: "-", tips: "屈伸肘关节+手腕顺时针/逆时针绕环，活动关节避免僵硬", remark: "无", tutorial: "" },
            { id: 5, name: "空杆器械推胸预演", sets: "2组×15次", weight: "空杆（无配重）", tips: "熟悉动作轨迹，找胸肌发力感，不追求速度", remark: "坐姿器械推胸机", tutorial: "" }
        ],
        formal: [
            { id: 6, name: "坐姿器械推胸", sets: "4组×10-12次", weight: "女5-10kg / 男10-15kg", tips: "挺胸沉肩贴器械，双手与肩同宽，推时胸肌发力，还原慢（2秒）", remark: "固定器械", tutorial: "" },
            { id: 7, name: "坐姿器械肩推", sets: "3组×10-12次", weight: "女5kg / 男10kg", tips: "肩膀下沉不耸肩，推至手臂快伸直（不锁肘），感受肩中束发力", remark: "固定器械", tutorial: "" },
            { id: 8, name: "绳索夹胸", sets: "3组×12-15次", weight: "轻重量（能控制）", tips: "身体微前倾，手肘微屈，胸肌带动绳索向中间夹，顶点停1秒", remark: "龙门架+绳索", tutorial: "" },
            { id: 9, name: "侧平举", sets: "3组×12-15次", weight: "女2-3kg哑铃 / 男5kg哑铃", tips: "手臂微屈，举至与肩同高，避免甩动，感受肩外侧发力", remark: "哑铃", tutorial: "" },
            { id: 10, name: "绳索下压", sets: "3组×12-15次", weight: "轻重量（能控制）", tips: "上臂贴紧身体，只动前臂下压，感受三头肌收缩，还原充分拉伸", remark: "龙门架+绳索", tutorial: "" }
        ],
        relax: [
            { id: 11, name: "胸肌静态拉伸+三头肌拉伸", sets: "1组×30秒（每侧）", weight: "-", tips: "胸肌：双手抵墙拉伸；三头肌：手臂上举向侧拉伸", remark: "无", tutorial: "" }
        ]
    },
    pull: {
        warmup: [
            { id: 12, name: "跑步机慢走/划船机", sets: "1组×5分钟", weight: "-", tips: "中等速度，激活心肺，活动背部肌群", remark: "有氧器械", tutorial: "" },
            { id: 13, name: "肩胛骨收缩训练", sets: "1组×20次", weight: "-", tips: "双手自然下垂，肩胛骨向中间收紧再放松，激活背部肌肉", remark: "无", tutorial: "" },
            { id: 14, name: "背部动态拉伸", sets: "1组×15次", weight: "-", tips: "双手交叉放体后，向前弯腰，感受背部舒展", remark: "无", tutorial: "" },
            { id: 15, name: "二头肌屈伸+腕关节拉伸", sets: "1组×20次（每侧）", weight: "-", tips: "缓慢屈伸肘关节，手腕向前后拉伸，活动前臂关节", remark: "无", tutorial: "" },
            { id: 16, name: "空杆高位下拉预演", sets: "2组×15次", weight: "空杆（无配重）", tips: "熟悉下拉轨迹，感受背阔肌发力，避免用手臂拽", remark: "高位下拉机", tutorial: "" }
        ],
        formal: [
            { id: 17, name: "高位下拉（宽握）", sets: "4组×10-12次", weight: "女10kg / 男15-20kg", tips: "挺胸沉肩，拉至胸前，背阔肌发力，还原充分拉伸", remark: "高位下拉机", tutorial: "" },
            { id: 18, name: "坐姿划船", sets: "3组×10-12次", weight: "女10kg / 男15-20kg", tips: "腰背挺直，拉时肩胛骨收紧，把手拉至腹部，还原慢", remark: "坐姿划船机", tutorial: "" },
            { id: 19, name: "哑铃弯举", sets: "3组×12-15次/侧", weight: "女2-3kg / 男5kg", tips: "上臂贴紧身体，只动前臂弯举，顶点停1秒，避免甩动", remark: "哑铃", tutorial: "" },
            { id: 20, name: "面拉", sets: "3组×12-15次", weight: "轻重量绳索", tips: "身体微后仰，拉至额头前方，感受肩后束发力，避免手臂代偿", remark: "龙门架+绳索", tutorial: "" },
            { id: 21, name: "坐姿下拉（窄握）", sets: "3组×12-15次", weight: "比宽握轻5kg", tips: "握距与肩同宽，拉至胸前下沿，强化背中下部", remark: "高位下拉机", tutorial: "" }
        ],
        relax: [
            { id: 22, name: "背部静态拉伸+二头肌拉伸", sets: "1组×30秒（每侧）", weight: "-", tips: "背部：双手抵墙弓步拉伸；二头肌：手臂伸直贴墙拉伸", remark: "无", tutorial: "" }
        ]
    },
    leg: {
        warmup: [
            { id: 23, name: "跑步机慢跑/开合跳", sets: "1组×5分钟", weight: "-", tips: "慢跑速度适中，开合跳幅度小，激活下肢心肺", remark: "有氧器械/无", tutorial: "" },
            { id: 24, name: "髋关节绕环（前后各）", sets: "1组×20次（每侧）", weight: "-", tips: "双手扶髋，画大圈活动髋关节，幅度由小到大", remark: "无", tutorial: "" },
            { id: 25, name: "弓步压腿（左右各）", sets: "1组×15次/侧", weight: "-", tips: "弓步幅度适中，膝盖不超过脚尖，感受大腿前/后侧拉伸", remark: "无", tutorial: "" },
            { id: 26, name: "膝关节活动+脚踝绕环", sets: "1组×20次（每侧）", weight: "-", tips: "缓慢屈伸膝关节，脚踝顺时针/逆时针绕环，避免关节僵硬", remark: "无", tutorial: "" },
            { id: 27, name: "腿举机空踏板预演", sets: "2组×15次", weight: "空踏板（无配重）", tips: "熟悉推蹬轨迹，感受股四头肌发力，调整脚位", remark: "腿举机", tutorial: "" }
        ],
        formal: [
            { id: 28, name: "腿举机", sets: "4组×12-15次", weight: "女1-2块配重 / 男3-4块配重", tips: "腰背贴紧靠垫，双脚与肩同宽，推至膝盖快伸直（不锁肘），还原膝盖不超脚尖", remark: "腿举机", tutorial: "" },
            { id: 29, name: "罗马尼亚硬拉（轻重量）", sets: "3组×10-12次", weight: "女10kg / 男15-20kg", tips: "膝盖微屈固定，臀部后坐，上半身前倾，感受腘绳肌拉伸，贴腿向下不弯腰", remark: "杠铃", tutorial: "" },
            { id: 30, name: "腿屈伸", sets: "3组×12-15次", weight: "轻重量（能控制）", tips: "坐直贴器械，大腿前侧发力抬小腿，顶点停1秒，还原慢", remark: "腿屈伸机", tutorial: "" },
            { id: 31, name: "腿弯举", sets: "3组×12-15次", weight: "轻重量（能控制）", tips: "俯卧贴器械，大腿后侧发力弯小腿，感受腘绳肌收缩，还原充分拉伸", remark: "腿弯举机", tutorial: "" },
            { id: 32, name: "提踵", sets: "4组×15-20次", weight: "女自身重量/10kg / 男10kg", tips: "站台阶/提踵机，踮至最高停1秒，缓慢放下，感受小腿拉伸", remark: "提踵机/台阶", tutorial: "" }
        ],
        relax: [
            { id: 33, name: "大腿前/后侧拉伸+小腿拉伸", sets: "1组×30秒（每侧）", weight: "-", tips: "大腿前侧：扶墙后踢腿；大腿后侧：坐姿体前屈；小腿：弓步抵墙拉伸", remark: "无", tutorial: "" }
        ]
    }
};

// API 基础 URL - Pages Functions 端点
const API_BASE_URL = '/api/training-data';

// 从 Cloudflare Pages Functions 获取数据，失败则回退到本地存储
async function getTrainData() {
    try {
        const response = await fetch(API_BASE_URL);
        if (response.ok) {
            const data = await response.json();
            // 如果有数据，更新本地存储
            if (data && Object.keys(data).length > 0) {
                localStorage.setItem("trainData", JSON.stringify(data));
                return data;
            }
        }
    } catch (error) {
        console.log('从Pages Functions获取数据失败，使用本地存储:', error);
    }
    
    // 回退到本地存储
    const storedData = localStorage.getItem("trainData");
    const data = storedData ? JSON.parse(storedData) : JSON.parse(JSON.stringify(defaultTrainData));
    
    // 初始化KV数据
    await saveTrainData(data);
    return data;
}

// 保存数据到 Cloudflare Pages Functions 和本地存储
async function saveTrainData(data) {
    // 更新本地存储
    localStorage.setItem("trainData", JSON.stringify(data));
    
    // 尝试更新KV存储
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            console.error('保存数据到KV失败:', await response.text());
        }
    } catch (error) {
        console.error('网络请求失败，数据仅保存到本地:', error);
    }
}

// 渲染单个动作
function renderAction(action, tab, stage) {
    const card = document.createElement("div");
    card.className = "action-card";
    card.dataset.id = action.id;
    card.dataset.tab = tab;
    card.dataset.stage = stage;

    card.innerHTML = `
        <div class="action-name">
            <div class="action-value">${action.name}</div>
        </div>
        <div class="action-item">
            <span class="action-label">组数：</span>
            <span class="action-value">${action.sets}</span>
        </div>
        <div class="action-item">
            <span class="action-label">重量：</span>
            <span class="action-value">${action.weight}</span>
        </div>
        <div class="action-item">
            <span class="action-label">要点：</span>
            <span class="action-value">${action.tips}</span>
        </div>
        <div class="action-item">
            <span class="action-label">器械：</span>
            <span class="action-value">${action.remark}</span>
        </div>
        <div class="btn-group">
            <button class="btn edit-btn">编辑</button>
            <button class="btn tutorial-btn ${!action.tutorial ? 'disabled' : ''}" ${!action.tutorial ? 'disabled' : ''}>
                查看教程
            </button>
            <button class="btn delete-btn">删除</button>
        </div>
    `;

    // 编辑按钮点击事件
    card.querySelector(".edit-btn").addEventListener("click", () => {
        openEditModal(action, tab, stage);
    });

    // 教程按钮点击事件
    card.querySelector(".tutorial-btn").addEventListener("click", () => {
        if (action.tutorial) {
            window.open(action.tutorial, "_blank");
        }
    });

    // 删除按钮点击事件
    card.querySelector(".delete-btn").addEventListener("click", () => {
        deleteAction(action.id, tab, stage);
    });

    return card;
}

// 渲染指定标签页的指定阶段
async function renderStage(tab, stage) {
    const trainData = await getTrainData();
    const container = document.getElementById(`${tab}-${stage}`);
    container.innerHTML = "";

    const actions = trainData[tab][stage];
    actions.forEach(action => {
        container.appendChild(renderAction(action, tab, stage));
    });
}

// 渲染整个标签页
async function renderTab(tab) {
    await renderStage(tab, "warmup");
    await renderStage(tab, "formal");
    await renderStage(tab, "relax");
}

// 删除动作
async function deleteAction(id, tab, stage) {
    if (confirm("确定要删除这个动作吗？")) {
        const trainData = await getTrainData();
        const actions = trainData[tab][stage];
        const index = actions.findIndex(item => item.id === id);
        if (index !== -1) {
            actions.splice(index, 1);
            await saveTrainData(trainData);
            await renderStage(tab, stage);
        }
    }
}

// 打开编辑弹窗
function openEditModal(action, tab, stage) {
    const modal = document.getElementById("editModal");
    document.getElementById("actionId").value = action.id;
    document.getElementById("actionTab").value = tab;
    document.getElementById("actionStage").value = stage;
    document.getElementById("actionName").value = action.name;
    document.getElementById("actionSets").value = action.sets;
    document.getElementById("actionWeight").value = action.weight;
    document.getElementById("actionTips").value = action.tips;
    document.getElementById("actionRemark").value = action.remark;
    document.getElementById("actionTutorial").value = action.tutorial || "";

    modal.classList.add("active");
}

// 关闭编辑弹窗
function closeEditModal() {
    document.getElementById("editModal").classList.remove("active");
    document.getElementById("editForm").reset();
}

// 保存编辑内容
async function saveEditForm(e) {
    e.preventDefault();
    const trainData = await getTrainData();

    const id = parseInt(document.getElementById("actionId").value);
    const tab = document.getElementById("actionTab").value;
    const stage = document.getElementById("actionStage").value;

    const updatedAction = {
        id: id,
        name: document.getElementById("actionName").value,
        sets: document.getElementById("actionSets").value,
        weight: document.getElementById("actionWeight").value,
        tips: document.getElementById("actionTips").value,
        remark: document.getElementById("actionRemark").value,
        tutorial: document.getElementById("actionTutorial").value
    };

    // 找到并替换原有动作
    const actions = trainData[tab][stage];
    const index = actions.findIndex(item => item.id === id);
    if (index !== -1) {
        actions[index] = updatedAction;
        await saveTrainData(trainData);
        await renderStage(tab, stage);
        closeEditModal();
    }
}

// 打开添加动作弹窗
function openAddModal(tab, stage) {
    const modal = document.getElementById("addModal");
    document.getElementById("addTab").value = tab;
    document.getElementById("addStage").value = stage;
    modal.classList.add("active");
}

// 关闭添加动作弹窗
function closeAddModal() {
    document.getElementById("addModal").classList.remove("active");
    document.getElementById("addForm").reset();
}

// 保存添加动作
async function saveAddForm(e) {
    e.preventDefault();
    const trainData = await getTrainData();

    const tab = document.getElementById("addTab").value;
    const stage = document.getElementById("addStage").value;

    // 生成新的动作ID
    const allActions = [...trainData.push.warmup, ...trainData.push.formal, ...trainData.push.relax, 
                      ...trainData.pull.warmup, ...trainData.pull.formal, ...trainData.pull.relax,
                      ...trainData.leg.warmup, ...trainData.leg.formal, ...trainData.leg.relax];
    const newId = Math.max(...allActions.map(action => action.id)) + 1;

    const newAction = {
        id: newId,
        name: document.getElementById("addActionName").value,
        sets: document.getElementById("addActionSets").value,
        weight: document.getElementById("addActionWeight").value,
        tips: document.getElementById("addActionTips").value,
        remark: document.getElementById("addActionRemark").value,
        tutorial: document.getElementById("addActionTutorial").value
    };

    // 添加到对应阶段
    trainData[tab][stage].push(newAction);
    await saveTrainData(trainData);
    await renderStage(tab, stage);
    closeAddModal();
}

// 标签页切换功能
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // 移除所有激活状态
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // 添加当前激活状态
        this.classList.add('active');
        const tab = this.dataset.tab;
        document.getElementById(tab).classList.add('active');
    });
});

// 添加动作按钮点击事件
document.querySelectorAll('.add-action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tab = this.dataset.tab;
        const stage = this.dataset.stage;
        openAddModal(tab, stage);
    });
});

// 编辑弹窗事件
document.getElementById("cancelBtn").addEventListener("click", closeEditModal);
document.getElementById("editForm").addEventListener("submit", saveEditForm);

// 添加动作弹窗事件
document.getElementById("addCancelBtn").addEventListener("click", closeAddModal);
document.getElementById("addForm").addEventListener("submit", saveAddForm);



// 初始化渲染
async function init() {
    await renderTab("push");
    await renderTab("pull");
    await renderTab("leg");
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}