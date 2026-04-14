import Sidebar, { TopBar } from "@/components/Sidebar";
import { Suspense } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-50">
      <Suspense fallback={<div className="w-[260px] h-screen bg-surface-900 border-r border-surface-800" />}>
        <Sidebar />
      </Suspense>
      <div className="ml-[260px] transition-all duration-300">
        <TopBar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
