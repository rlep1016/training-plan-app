# Cloudflare Worker 与 Pages 项目的区别

## 关键区别

| 特性 | Cloudflare Worker | Cloudflare Pages |
|------|-------------------|-------------------|
| **部署方式** | 使用 `npx wrangler deploy` 命令 | 自动部署（连接Git仓库后） |
| **配置文件** | 需要 `wrangler.toml` | 不需要配置文件，通过控制台配置 |
| **构建命令** | 需要指定构建命令 | 可选，静态站点通常留空 |
| **函数架构** | 需要显式注册事件处理器 | 通过 `functions/` 目录自动注册路由 |
| **主要用途** | 无服务器API、边缘计算 | 静态站点+边缘函数 |
| **界面入口** | Workers & Pages → 创建项目 → Workers | Workers & Pages → 创建项目 → Pages |

## 如何正确创建 Pages 项目

从截图来看，您误选了 **创建Worker** 选项，这就是为什么系统要求您提供部署命令。请按照以下步骤创建正确的 Pages 项目：

### 1. 回到创建项目页面
1. 登录 Cloudflare 控制台
2. 从左侧导航栏选择 **Workers & Pages**
3. 点击 **创建项目** 按钮

### 2. 选择 Pages 选项
1. 在创建项目页面，您会看到两个选项卡：**Workers** 和 **Pages**
2. 确保选择 **Pages** 选项卡（而不是您当前选择的 **Workers** 选项卡）
3. 然后点击 **连接到Git** 按钮

### 3. 后续步骤
1. 授权 Cloudflare 访问您的 GitHub 仓库
2. 选择您的训练计划项目仓库
3. 点击 **开始设置**
4. 在配置页面：
   - **框架预设**：选择 `None`
   - **构建命令**：留空
   - **构建输出目录**：留空
5. 在 **函数** 部分配置 D1 绑定
6. 点击 **保存并部署**

## 为什么会出现当前界面

当前界面是创建 Worker 项目的配置页面，它要求：
- **构建命令**：用于构建 Worker 代码
- **部署命令**：用于部署 Worker（默认是 `npx wrangler deploy`）

这些设置不适用于 Pages 项目，Pages 项目有自己的配置选项。

## 验证您的选择

在创建项目时，确保：
1. 您在 **Pages** 选项卡下操作
2. 界面显示的是 "Set up your Pages project" 而不是 "Set up your Worker project"
3. 没有要求您提供 "部署命令" 字段

## 后续帮助

如果您已经创建了错误的 Worker 项目，可以：
1. 删除该 Worker 项目
2. 按照上述步骤重新创建正确的 Pages 项目
3. 或者联系 Cloudflare 支持寻求帮助
