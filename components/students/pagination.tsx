"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
}

/** 构造保留其他参数的 URL */
function buildHref(
  searchParams: URLSearchParams,
  page: number,
  pageSize: number
): string {
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  return `/welcome?${params.toString()}`;
}

/**
 * 分页导航栏。
 * - 每页条数下拉框（1-20 可选）
 * - 首页 / 上一页 / 下一页 / 末页 按钮
 * - 显示当前页码与总条数信息
 */
export function Pagination({ page, pageSize, total }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const onPageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      // 改变每页条数时回到第一页
      router.push(buildHref(searchParams, 1, Number(e.target.value)));
    },
    [router, searchParams]
  );

  const goto = (p: number) => {
    const target = Math.min(Math.max(1, p), totalPages);
    router.push(buildHref(searchParams, target, pageSize));
  };

  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>每页</span>
        <select
          value={pageSize}
          onChange={onPageSizeChange}
          className="h-9 rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span>条</span>
        <span className="ml-4">
          第 {start}-{end} 条 / 共 {total} 条
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => goto(1)}
        >
          首页
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => goto(currentPage - 1)}
        >
          上一页
        </Button>
        <span className="px-2 text-sm">
          {currentPage} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => goto(currentPage + 1)}
        >
          下一页
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => goto(totalPages)}
        >
          末页
        </Button>
      </div>
    </div>
  );
}
