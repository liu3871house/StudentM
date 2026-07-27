# 学生信息管理系统（StudentM）

基于 **Next.js 15 (App Router) + Shadcn UI + Tailwind CSS + Supabase** 构建的学生信息管理系统。支持管理员登录、学生信息的增删改查、模糊搜索与分页。

## 功能列表

> 勾选表示已完成，进度随开发更新。

- [x] **登录功能**
  - [x] 网站首页显示登录页面
  - [x] 用户名密码来自 `usermanagement` 数据库的 `admin` 表
  - [x] 登录成功后跳转到欢迎页面
- [ ] **学生信息列表**
  - [ ] 登录成功页展示 `student` 表数据（学号、姓名、性别、班级、电话、备注）
  - [ ] 表格上方搜索框，支持学号 / 姓名 / 班级模糊查询
  - [ ] "添加学生" 超链接，跳转录入页，成功后返回列表并提示
  - [ ] 操作列：删除按钮（删除并刷新表格）
  - [ ] 操作列：修改按钮（跳转编辑页，保存后返回列表）
  - [ ] 分页导航：每页 1–20 条可选，首页 / 末页 / 上页 / 下页按钮

## 技术栈

| 分类 | 选型 |
| --- | --- |
| 前端框架 | Next.js 15（App Router，React 19） |
| UI 组件 | Shadcn UI（自建组件）+ Tailwind CSS |
| 数据库 | Supabase（PostgreSQL） |
| 数据访问 | supabase-js / @supabase/ssr |
| 数据建模 | Drizzle ORM（schema 定义） |
| 语言 | TypeScript |

## 数据库结构

数据库名：`usermanagement`，包含两张表，建表脚本见 [`supabase/schema.sql`](./supabase/schema.sql)，Drizzle schema 定义见 [`db/schema.ts`](./db/schema.ts)。

### admin 表（管理员登录账号）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | bigint | 主键，自增 |
| username | text | 用户名，唯一 |
| password | text | 密码（明文，演示用） |
| created_at | timestamptz | 创建时间 |

默认账号：`admin` / `admin123`

### student 表（学生基本信息）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | bigint | 主键，自增 |
| student_no | text | 学号 |
| name | text | 姓名 |
| gender | text | 性别 |
| class_name | text | 班级 |
| phone | text | 电话 |
| remark | text | 备注 |
| created_at | timestamptz | 创建时间 |
| updated_at | timestamptz | 更新时间 |

## 项目结构

```
StudentM/
├── app/
│   ├── layout.tsx              # 根布局
│   ├── globals.css             # 全局样式
│   ├── page.tsx                # 首页（登录页面）
│   ├── welcome/                # 欢迎页（登录成功后）
│   └── actions/
│       └── auth.ts             # 登录 / 登出 / 会话守卫 Server Actions
├── components/
│   └── ui/                     # Shadcn UI 基础组件
├── lib/
│   ├── utils.ts                # cn 工具
│   └── supabase/server.ts      # Supabase 服务端客户端
├── db/
│   └── schema.ts               # Drizzle ORM schema
├── supabase/
│   └── schema.sql              # 数据库初始化 SQL
└── ...
```

## 环境变量

复制 `.env.example` 为 `.env.local` 并填入真实值：

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx   # 浏览器/服务端普通客户端
SUPABASE_SECRET_KEY=sb_secret_xxx             # 服务端特权客户端（绕过 RLS）
```

## 本地运行

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env.local   # 填入 Supabase 连接信息

# 3. 在 Supabase SQL Editor 执行 supabase/schema.sql 建表

# 4. 启动开发服务器
npm run dev
```

访问 http://localhost:3000，使用 `admin / admin123` 登录。

## Git 分支策略

每个新功能在独立分支开发，确认后合并到 `main` 并推送：

- `feat/init-and-login` — 项目初始化与登录功能
