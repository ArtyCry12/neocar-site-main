import DockNav from "@/components/layout/DockNav";
import Footer from "@/components/layout/Footer";
import SiteHeader from "@/components/layout/SiteHeader";

export default function LegalSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Footer />
      <DockNav />
    </div>
  );
}
