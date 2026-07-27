import { requireAuth } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function WelcomePage() {
  await requireAuth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">🎉 登录成功</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">欢迎进入学生信息管理系统</p>
          <form action={logoutAction}>
            <Button type="submit" variant="outline">
              退出登录
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
