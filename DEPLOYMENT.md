# Cloudflare Pages + D1 部署流程

## 前提条件

1. 拥有Cloudflare账号
2. 拥有GitHub账号
3. 本地项目已初始化Git仓库

## 部署步骤

### 步骤1：将本地仓库推送到GitHub

1. 登录GitHub，创建一个新的仓库
2. 复制仓库的远程URL（如：`https://github.com/your-username/training-plan-app.git`）
3. 在本地项目目录中执行以下命令：
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin master
   ```

### 步骤2：在Cloudflare控制台创建D1数据库

1. 登录Cloudflare控制台
2. 从左侧导航栏选择**Workers & Pages**
3. 点击顶部标签页的**D1**
4. 点击**创建数据库**按钮
5. 填写数据库名称（建议使用 `training-db`）
6. 选择数据库位置
7. 点击**创建**按钮
8. 记录下数据库ID，稍后会用到

### 步骤3：初始化D1数据库

#### 3.1 创建数据库表
1. 在D1数据库详情页，点击**查询**标签页
2. 将 `db-schema.sql` 文件中的内容复制到查询编辑器
3. 点击**运行**按钮执行SQL语句
4. 等待执行完成，确认数据库表已成功创建

#### 3.2 插入初始数据
1. 在查询编辑器中，清空之前的内容
2. 将 `db-insert-data.sql` 文件中的内容复制到查询编辑器
3. 点击**运行**按钮执行SQL语句
4. 等待执行完成，确认初始数据已成功插入
5. 可以执行 `SELECT * FROM training_actions LIMIT 5;` 来验证数据是否存在

### 步骤4：创建Cloudflare Pages项目

1. 从左侧导航栏选择**Workers & Pages**
2. 点击**创建项目**按钮
3. 选择**Pages**选项卡
4. 点击**连接到Git**按钮
5. 授权Cloudflare访问你的GitHub账号
6. 选择你刚才创建的GitHub仓库
7. 点击**开始设置**按钮

### 步骤5：配置Pages项目

1. 在**项目名称**字段中输入一个名称（如：`training-plan-app`）
2. 在**构建设置**部分：
   - **框架预设**：选择 `None`
   - **构建命令**：留空（Cloudflare Pages会自动构建和部署）
   - **构建输出目录**：留空
3. 在**函数**部分：
   - 确保**启用函数**开关已打开
   - 在**D1数据库绑定**部分，点击**添加绑定**：
     - **变量名**：`TRAINING_DB`
     - **数据库**：选择你刚才创建的D1数据库
4. 点击**保存并部署**按钮

**重要提示**：不要在构建命令中使用 `npx wrangler deploy`，这是用于部署Workers的命令，不是Pages项目。Cloudflare Pages会自动处理构建和部署流程。

### 步骤6：等待部署完成

1. 部署过程将自动开始
2. 你可以在**部署**标签页中查看部署进度
3. 部署完成后，会显示**部署成功**状态
4. 记录下分配的域名（如：`training-plan-app.pages.dev`）

### 步骤7：测试部署后的功能

1. 在浏览器中打开分配的域名
2. 测试以下功能：
   - 查看不同标签页（推日、拉日、腿日）的训练动作
   - 添加新的训练动作
   - 编辑现有训练动作
   - 删除训练动作
   - 查看动作教程链接
3. 确认所有功能正常工作

## 后续维护

### 更新项目

1. 在本地项目中进行更改
2. 提交并推送到GitHub：
   ```bash
   git add .
   git commit -m "Update description"
   git push origin master
   ```
3. Cloudflare Pages将自动检测到GitHub上的更改，并触发新的部署

### 管理D1数据库

- 可以在Cloudflare控制台的D1数据库详情页管理数据库
- 使用**查询**标签页执行SQL语句
- 使用**导出**功能备份数据库
- 使用**导入**功能恢复数据库

## 故障排除

### 部署失败

1. 检查**部署**标签页中的日志，查找错误信息
2. 确保GitHub仓库的分支名称正确（默认是 `master`）
3. 确保构建命令和构建输出目录设置正确
4. 确保D1数据库绑定配置正确

### 功能无法正常工作

1. 打开浏览器的开发者工具（F12）
2. 查看**控制台**标签页中的错误信息
3. 检查**网络**标签页中的API请求，确认是否成功
4. 确保D1数据库已正确初始化且包含数据
5. 确保API端点的路径正确（`/api/training-data`）

## 相关资源

- [Cloudflare Pages文档](https://developers.cloudflare.com/pages/)
- [Cloudflare D1文档](https://developers.cloudflare.com/d1/)
- [Cloudflare Workers文档](https://developers.cloudflare.com/workers/)
