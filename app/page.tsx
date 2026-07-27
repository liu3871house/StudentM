import { loginAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HomePageProps {
  searchParams: Promise<{ error?: string; registered?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const sp = await searchParams;
  const error = sp.error;
  const registered = sp.registered;

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">学生信息管理系统</CardTitle>
          <CardDescription>请输入账号密码登录</CardDescription>
        </CardHeader>
        <CardContent>
          {registered && (
            <div className="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
              ✅ 添加学生信息成功
            </div>
          )}
          {error && (
            <div className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              ❌ {error}
            </div>
          )}
          <form action={loginAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                name="username"
                placeholder="请输入用户名"
                autoFocus
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="请输入密码"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              登录
            </Button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            默认账号：admin / admin123
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} 学生信息管理系统
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
