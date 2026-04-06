import { MobileLessonNav } from "@/components/mobile-lesson-nav";
import { Sidebar } from "@/components/sidebar";

export default function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-0 flex-1 flex-col md:flex-row">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <MobileLessonNav />
        {children}
      </div>
    </div>
  );
}
