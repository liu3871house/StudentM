import { requireAuth } from "@/lib/auth";
import { createStudentAction } from "@/app/actions/students";
import { StudentForm } from "@/components/students/student-form";

interface NewStudentPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewStudentPage({ searchParams }: NewStudentPageProps) {
  await requireAuth();
  const sp = await searchParams;

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8">
      <StudentForm
        action={createStudentAction}
        title="添加学生"
        submitLabel="添加"
        error={sp.error}
      />
      <div className="mx-auto mt-4 max-w-xl text-center">
        <a href="/welcome" className="text-sm text-muted-foreground hover:underline">
          ← 返回学生列表
        </a>
      </div>
    </main>
  );
}
