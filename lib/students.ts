import "server-only";
import { createAdminClient } from "@/lib/supabase/server";

/** 学生记录类型（与 db/schema.ts 的 Student 保持一致） */
export interface StudentRow {
  id: number;
  student_no: string;
  name: string;
  gender: string;
  class_name: string | null;
  phone: string | null;
  remark: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * 查询学生列表，支持按学号 / 姓名 / 班级 模糊搜索。
 * keyword 为空时返回全部。返回过滤后的总数与当前页数据。
 *
 * @param keyword  关键字（模糊匹配 student_no / name / class_name）
 * @param page     页码（从 1 开始）
 * @param pageSize 每页条数
 */
export async function listStudents(
  keyword: string,
  page: number,
  pageSize: number
): Promise<{ rows: StudentRow[]; total: number }> {
  const supabase = createAdminClient();
  const kw = keyword.trim();

  // 构造 or 过滤条件（ilike 大小写不敏感模糊匹配）
  // PostgREST 语法: col.ilike.%value%,col2.ilike.%value%
  const orFilter = kw
    ? `student_no.ilike.%${kw}%,name.ilike.%${kw}%,class_name.ilike.%${kw}%`
    : undefined;

  let query = supabase
    .from("student")
    .select("*", { count: "exact" })
    .order("id", { ascending: true })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (orFilter) {
    query = query.or(orFilter);
  }

  const { data, count, error } = await query;

  if (error) {
    throw new Error("查询学生列表失败: " + error.message);
  }

  return {
    rows: (data as StudentRow[]) ?? [],
    total: count ?? 0,
  };
}

/** 根据 id 获取单个学生 */
export async function getStudent(id: number): Promise<StudentRow | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("student")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("查询学生失败: " + error.message);
  return (data as StudentRow) ?? null;
}

/** 新增学生 */
export async function createStudent(
  input: Omit<StudentRow, "id" | "created_at" | "updated_at">
): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("student").insert({
    student_no: input.student_no,
    name: input.name,
    gender: input.gender || "男",
    class_name: input.class_name || null,
    phone: input.phone || null,
    remark: input.remark || null,
  });
  if (error) throw new Error("新增学生失败: " + error.message);
}

/** 更新学生 */
export async function updateStudent(
  id: number,
  input: Omit<StudentRow, "id" | "created_at" | "updated_at">
): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("student")
    .update({
      student_no: input.student_no,
      name: input.name,
      gender: input.gender || "男",
      class_name: input.class_name || null,
      phone: input.phone || null,
      remark: input.remark || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw new Error("更新学生失败: " + error.message);
}

/** 删除学生 */
export async function deleteStudent(id: number): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("student").delete().eq("id", id);
  if (error) throw new Error("删除学生失败: " + error.message);
}
