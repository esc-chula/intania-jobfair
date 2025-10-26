"use client";
import { LucideChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="text-gray-600 hover:underline font-bodyTH flex items-center"
    >
      <LucideChevronLeft size={16} />
      กลับ
    </button>
  );
}
