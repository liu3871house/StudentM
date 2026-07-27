"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createStudent,
  updateStudent,
  deleteStudent,
} from "@/lib/students";

/** 新增学生 Server Action：成功后返回欢迎页并显示成功提示 */
export async function createStudentAction(formData: FormData) {
  const payload = {
    student_no: String(formData.get("student_no") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    gender: String(formData.get("gender") ?? "男").trim() || "男",
    class_name: String(formData.get("class_name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    remark: String(formData.get("remark") ?? "").trim(),
  };

  if (!payload.student_no || !payload.name) {
    redirect(
      "/students/new?error=" + encodeURIComponent("学号和姓名为必填项")
    );
  }

  try {
    await createStudent(payload);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "新增失败";
    redirect("/students/new?error=" + encodeURIComponent(msg));
  }

  // 刷新 welcome 列表页缓存，确保表格更新
  revalidatePath("/welcome");
  // 返回登录成功页（welcome），并显示"添加学生信息成功"提示
  redirect("/welcome?registered=1");
}

/** 更新学生 Server Action：成功后返回欢迎页 */
export async function updateStudentAction(id: number, formData: FormData) {
  const payload = {
    student_no: String(formData.get("student_no") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    gender: String(formData.get("gender") ?? "男").trim() || "男",
    class_name: String(formData.get("class_name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    remark: String(formData.get("remark") ?? "").trim(),
  };

  if (!payload.student_no || !payload.name) {
    redirect(
      `/students/${id}/edit?error=` +
        encodeURIComponent("学号和姓名为必填项")
    );
  }

  try {
    await updateStudent(id, payload);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "更新失败";
    redirect(`/students/${id}/edit?error=` + encodeURIComponent(msg));
  }

  revalidatePath("/welcome");
  redirect("/welcome");
}

/** 删除学生 Server Action：成功后刷新欢迎页表格 */
export async function deleteStudentAction(id: number) {
  await deleteStudent(id);
  revalidatePath("/welcome");
  redirect("/welcome");
}
