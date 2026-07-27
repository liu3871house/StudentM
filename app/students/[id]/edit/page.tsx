import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import { getStudent } from "@/lib/students";
import { updateStudentAction } from "@/app/actions/students";
import { StudentForm } from "@/components/students/student-form";

interface EditStudentPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditStudentPage({
  params,
  searchParams,
}: EditStudentPageProps) {
  await requireAuth();
  const { id: idStr } = await params;
  const sp = await searchParams;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const student = await getStudent(id);
  if (!student) notFound();

  // 闭包包装 Server Action，绑定 id
  const action = updateStudentAction.bind(null, id);

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8">
      <StudentForm
        action={action}
        title={`编辑学生 - ${student.name}`}
        submitLabel="保存修改"
        error={sp.error}
        defaultValues={{
          student_no: student.student_no,
          name: student.name,
          gender: student.gender,
          class_name: student.class_name ?? "",
          phone: student.phone ?? "",
          remark: student.remark ?? "",
        }}
      />
      <div className="mx-auto mt-4 max-w-xl text-center">
        <a href="/welcome" className="text-sm text-muted-foreground hover:underline">
          ← 返回学生列表
        </a>
      </div>
    </main>
  );
}
