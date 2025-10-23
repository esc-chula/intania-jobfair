// ...existing code...
"use client";

import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideEllipsis,
} from "lucide-react";

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  // determine a 3-page window
  const pageWindow = (() => {
    if (totalPages <= 3)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 2) return [1, 2, 3];
    if (currentPage >= totalPages - 1)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  })();

  const showLeftEllipsis = pageWindow[0] > 1;
  const showRightEllipsis = pageWindow[pageWindow.length - 1] < totalPages;

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        className="px-3 py-2 rounded disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <LucideChevronLeft
          className="inline-block mr-1"
          height={16}
          width={16}
          color={"#102E50"}
        />
      </button>

      {showLeftEllipsis && (
        <LucideEllipsis
          className="inline-block"
          height={16}
          width={16}
          color={"#102E50"}
        />
      )}

      {pageWindow.map((p) => (
        <button
          key={p}
          className={`h-9 w-9 font-semibold text-[#102E50] rounded ${
            p === currentPage ? "bg-[#F5C45E] shadow rounded-lg" : ""
          }`}
          onClick={() => onPageChange(p)}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      {showRightEllipsis && (
        <LucideEllipsis
          className="inline-block"
          height={16}
          width={16}
          color={"#102E50"}
        />
      )}

      <button
        className="px-3 py-2 rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <LucideChevronRight
          className="inline-block ml-1"
          height={16}
          width={16}
          color={"#102E50"}
        />
      </button>
    </div>
  );
}
