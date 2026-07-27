"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { AUTH_COOKIE } from "@/lib/auth";

/**
 * 登录 Server Action
 * 校验用户名密码是否匹配 admin 表记录，
 * 成功则写入登录态 cookie 并跳转欢迎页。
 */
export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!username || !password) {
    redirect("/?error=" + encodeURIComponent("请输入用户名和密码"));
  }

  // 用特权客户端直接查询 admin 表（绕过 RLS）
  const supabase = createAdminClient();
  const { data, error: queryError } = await supabase
    .from("admin")
    .select("id, username")
    .eq("username", username)
    .eq("password", password)
    .maybeSingle();

  if (queryError || !data) {
    redirect("/?error=" + encodeURIComponent("用户名或密码错误"));
  }

  // 写入登录态：使用 HttpOnly cookie（演示用，简单会话标记）
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, String(data.id), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 小时
  });

  redirect("/welcome");
}

/** 登出 Server Action */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  redirect("/");
}
