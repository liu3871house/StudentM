-- ==========================================================================
-- 学生信息管理系统 - 数据库初始化脚本
-- 在 Supabase 控制台的 SQL Editor 中执行此脚本
-- 数据库名: usermanagement
-- ==========================================================================

-- --------------------------------------------------------------------------
-- 1. admin 表（登录账号）
-- --------------------------------------------------------------------------
create table if not exists public.admin (
  id          bigint generated always as identity primary key,
  username    text not null unique,
  password    text not null,            -- 明文存储（演示用，生产环境应加密）
  created_at  timestamptz not null default now()
);

comment on table  public.admin is '管理员登录账号表';
comment on column public.admin.username is '登录用户名';
comment on column public.admin.password is '登录密码（明文，演示用）';

-- 插入默认管理员账号: admin / admin123
insert into public.admin (username, password)
values ('admin', 'admin123')
on conflict (username) do nothing;

-- --------------------------------------------------------------------------
-- 2. student 表（学生基本信息）
-- --------------------------------------------------------------------------
create table if not exists public.student (
  id          bigint generated always as identity primary key,
  student_no  text not null,                          -- 学号
  name        text not null,                          -- 姓名
  gender      text not null default '男',             -- 性别
  class_name  text,                                   -- 班级
  phone       text,                                   -- 电话
  remark      text,                                   -- 备注
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table  public.student is '学生基本信息表';
comment on column public.student.student_no is '学号';
comment on column public.student.name is '姓名';
comment on column public.student.gender is '性别';
comment on column public.student.class_name is '班级';
comment on column public.student.phone is '电话';
comment on column public.student.remark is '备注';

-- 按学号、姓名、班级建立索引（支持模糊查询）
create index if not exists idx_student_student_no on public.student (student_no);
create index if not exists idx_student_name       on public.student (name);
create index if not exists idx_student_class_name on public.student (class_name);

-- 学号唯一约束（防止重复录入）
create unique index if not exists idx_student_student_no_unique on public.student (student_no);

-- 插入几条示例数据
insert into public.student (student_no, name, gender, class_name, phone, remark)
values
  ('2024001', '张三', '男', '计算机2401', '13800000001', '班长'),
  ('2024002', '李四', '女', '计算机2401', '13800000002', null),
  ('2024003', '王五', '男', '计算机2402', '13800000003', '转专业学生'),
  ('2024004', '赵六', '女', '软件2401',   '13800000004', null),
  ('2024005', '钱七', '男', '软件2401',   '13800000005', '文艺委员')
on conflict (student_no) do nothing;
