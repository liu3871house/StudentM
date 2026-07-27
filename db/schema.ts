/**
 * Drizzle ORM 数据库 Schema 定义
 * ------------------------------------------------------------------
 * 说明：本项目实际通过 supabase-js 访问 Supabase REST API，
 * 此文件用于以 Drizzle 形式集中定义表结构，作为数据模型的
 * 单一来源（schema of truth），便于维护与迁移。
 * 对应的 SQL 建表脚本见 supabase/schema.sql。
 */
import {
  pgTable,
  bigint,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

/** admin 表：管理员登录账号 */
export const admin = pgTable(
  "admin",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("idx_admin_username").on(t.username)]
);

/** student 表：学生基本信息 */
export const student = pgTable(
  "student",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    studentNo: text("student_no").notNull(),
    name: text("name").notNull(),
    gender: text("gender").notNull().default("男"),
    className: text("class_name"),
    phone: text("phone"),
    remark: text("remark"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("idx_student_student_no").on(t.studentNo),
    index("idx_student_name").on(t.name),
    index("idx_student_class_name").on(t.className),
  ]
);

/** 学生信息类型（前端用） */
export type Student = typeof student.$inferSelect;
export type NewStudent = typeof student.$inferInsert;

/** 管理员类型 */
export type Admin = typeof admin.$inferSelect;
