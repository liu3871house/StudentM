import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 创建服务端 Supabase 客户端（使用 publishable key，受 RLS 约束）。
 * 适用于一般服务端读取场景。
 */
export async function createServerClientSSR() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as never)
            );
          } catch {
            // 在 Server Component 中无法 set cookie，忽略即可
          }
        },
      },
    }
  );
}

/**
 * 创建服务端特权 Supabase 客户端（使用 secret key，绕过 RLS）。
 * 用于需要直接读写数据库的服务端 Server Action，避免受限。
 */
export function createAdminClient() {
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    }
  );
}
