import { DashboardNavbar } from "@/components/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="pt-14 md:pt-16">{children}</main>
    </div>
  );
}
