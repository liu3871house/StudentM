import { Suspense } from "react";
import Link from "next/link";
import { requireAuth } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import { listStudents } from "@/lib/students";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchBar } from "@/components/students/search-bar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface WelcomePageProps {
  searchParams: Promise<{ keyword?: string; registered?: string }>;
}

export default async function WelcomePage({ searchParams }: WelcomePageProps) {
  await requireAuth();
  const sp = await searchParams;
  const keyword = sp.keyword ?? "";
  const registered = sp.registered;

  const { rows, total } = await listStudents(keyword, 1, 1000);

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold">学生信息管理系统</h1>
          <form action={logoutAction}>
            <Button type="submit" variant="outline" size="sm">
              退出登录
            </Button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {registered && (
          <div className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
            ✅ 添加学生信息成功
          </div>
        )}

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>学生信息列表（共 {total} 条）</CardTitle>
            <Link
              href="/students/new"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              + 添加学生
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            <Suspense fallback={<div className="text-sm text-muted-foreground">加载搜索框…</div>}>
              <SearchBar />
            </Suspense>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学号</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>性别</TableHead>
                  <TableHead>班级</TableHead>
                  <TableHead>电话</TableHead>
                  <TableHead>备注</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      暂无匹配的学生记录
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.student_no}</TableCell>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.gender}</TableCell>
                      <TableCell>{s.class_name ?? "-"}</TableCell>
                      <TableCell>{s.phone ?? "-"}</TableCell>
                      <TableCell>{s.remark ?? "-"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
