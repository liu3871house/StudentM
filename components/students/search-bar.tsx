"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * 学生搜索框。
 * 输入文字可在学号、姓名、班级三个字段模糊查询。
 * 提交时通过 URL query 参数携带关键字，页面重新渲染获取过滤结果。
 */
export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("keyword") ?? "";
  const [value, setValue] = useState(current);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("keyword", value.trim());
      } else {
        params.delete("keyword");
      }
      // 重新搜索时回到第一页
      params.delete("page");
      router.push(`/welcome?${params.toString()}`);
    },
    [value, router, searchParams]
  );

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        name="keyword"
        placeholder="按学号 / 姓名 / 班级模糊搜索"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="max-w-sm"
      />
      <Button type="submit">搜索</Button>
      {current && (
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setValue("");
            const params = new URLSearchParams(searchParams.toString());
            params.delete("keyword");
            params.delete("page");
            router.push(`/welcome?${params.toString()}`);
          }}
        >
          重置
        </Button>
      )}
    </form>
  );
}
