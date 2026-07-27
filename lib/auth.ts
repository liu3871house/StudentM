import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/** 登录状态 cookie 名称 */
export const AUTH_COOKIE = "sm_auth";

/** 判断当前是否已登录（供 Server Component 调用） */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(AUTH_COOKIE)?.value;
  return Boolean(value);
}

/** 判断当前是否已登录，未登录则跳转首页 */
export async function requireAuth() {
  const ok = await isAuthenticated();
  if (!ok) redirect("/");
}
