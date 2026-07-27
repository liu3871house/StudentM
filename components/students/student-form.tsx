"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface StudentFormValues {
  student_no: string;
  name: string;
  gender: string;
  class_name: string;
  phone: string;
  remark: string;
}

interface StudentFormProps {
  /** 表单 action（Server Action 引用） */
  action: (formData: FormData) => void;
  /** 初始值（编辑时传入） */
  defaultValues?: Partial<StudentFormValues>;
  /** 提交按钮文案 */
  submitLabel?: string;
  /** 返回链接 */
  cancelHref?: string;
  /** 顶部错误信息 */
  error?: string;
  /** 标题 */
  title?: string;
}

export function StudentForm({
  action,
  defaultValues,
  submitLabel = "保存",
  cancelHref = "/welcome",
  error,
  title = "学生信息",
}: StudentFormProps) {
  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            ❌ {error}
          </div>
        )}
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student_no">
              学号 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="student_no"
              name="student_no"
              required
              defaultValue={defaultValues?.student_no ?? ""}
              placeholder="请输入学号"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">
              姓名 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={defaultValues?.name ?? ""}
              placeholder="请输入姓名"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">性别</Label>
            <select
              id="gender"
              name="gender"
              defaultValue={defaultValues?.gender ?? "男"}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class_name">班级</Label>
            <Input
              id="class_name"
              name="class_name"
              defaultValue={defaultValues?.class_name ?? ""}
              placeholder="请输入班级"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">电话</Label>
            <Input
              id="phone"
              name="phone"
              defaultValue={defaultValues?.phone ?? ""}
              placeholder="请输入电话"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remark">备注</Label>
            <Input
              id="remark"
              name="remark"
              defaultValue={defaultValues?.remark ?? ""}
              placeholder="请输入备注"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit">{submitLabel}</Button>
            <a href={cancelHref}>
              <Button type="button" variant="outline">
                取消
              </Button>
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
