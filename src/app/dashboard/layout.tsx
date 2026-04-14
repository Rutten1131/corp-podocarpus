import Sidebar, { TopBar } from "@/components/Sidebar";
import { Suspense } from "react";
import { ModuleProvider } from "@/context/module-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-50">
      <Suspense fallback={<div className="w-[260px] h-screen bg-andina-surface border-r border-andina-border" />}>
        <Sidebar />
      </Suspense>
      <div className="flex-1 transition-all duration-300 lg:pl-[260px]">
        <Suspense fallback={<div className="h-16 bg-andina-bg/80 border-b border-andina-border" />}>
          <TopBar />
        </Suspense>
        <main className="p-4 md:p-8 bg-andina-bg/50 min-h-[calc(100-64px)]">{children}</main>
      </div>
    </div>
  );
}
