"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteStudentAction } from "@/app/actions/students";

/**
 * 删除按钮：点击后二次确认，确认则调用删除 Server Action。
 * 删除成功后会 redirect 刷新欢迎页，表格内容随之更新。
 */
export function DeleteButton({ id, name }: { id: number; name: string }) {
  const [pending, startTransition] = useTransition();

  const onClick = () => {
    const ok = window.confirm(`确认删除学生「${name}」吗？此操作不可撤销。`);
    if (!ok) return;
    startTransition(() => {
      void deleteStudentAction(id).catch(() => {
        alert("删除失败，请重试");
      });
    });
  };

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={onClick}
    >
      {pending ? "删除中…" : "删除"}
    </Button>
  );
}
