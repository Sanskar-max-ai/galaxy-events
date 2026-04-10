"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, Briefcase, Home, LogOut } from "lucide-react";

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/admin/dashboard" },
    { name: "Hero Content", icon: Home, href: "/admin/dashboard/hero" },
    { name: "Services", icon: Briefcase, href: "/admin/dashboard/services" },
    { name: "Gallery", icon: ImageIcon, href: "/admin/dashboard/gallery" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111111] border-r border-white/5 flex flex-col fixed h-full z-50">
        <div className="p-8 border-b border-white/5">
          <h2 className="text-xl font-heading font-bold tracking-tight text-[#c9a84c]">GALAXY <span className="text-white">OS</span></h2>
          <p className="text-[12px] tracking-[0.4em] uppercase text-white/30 mt-1 font-black">Management Suite</p>
        </div>
        
        <nav className="flex-grow p-4 space-y-2 mt-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-4 px-4 py-4 rounded-sm transition-all text-sm tracking-widest uppercase font-bold ${
                  isActive 
                    ? "bg-[#c9a84c] text-[#111111]" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-8 border-top border-white/5">
          <Link href="/" className="flex items-center gap-4 text-white/30 hover:text-red-400 transition-colors text-xs tracking-widest uppercase font-bold">
            <LogOut size={16} />
            <span>Terminate Session</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow ml-64 p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
