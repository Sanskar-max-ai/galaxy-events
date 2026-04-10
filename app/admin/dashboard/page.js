import { getGalleryData, getServicesData, getHeroData } from "@/lib/actions";
import { LayoutDashboard, ImageIcon, Briefcase, Camera, Edit3 } from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const gallery = await getGalleryData();
  const services = await getServicesData();
  const hero = await getHeroData();

  const stats = [
    { name: "Portfolio Items", value: gallery.length, icon: ImageIcon, color: "text-blue-400" },
    { name: "Active Services", value: services.length, icon: Briefcase, color: "text-gold-gradient" },
    { name: "Hero Status", value: hero ? "Active" : "Offline", icon: Camera, color: "text-green-400" },
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[#c9a84c]/20 rounded-sm border border-[#c9a84c]/30">
          <LayoutDashboard className="text-[#c9a84c]" size={24} />
        </div>
        <div>
          <h1 className="text-4xl font-heading font-bold text-white">Console Overview</h1>
          <p className="text-white/40 text-[12px] tracking-[0.4em] uppercase font-black mt-1">System Health & Metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-[#111111] p-10 border border-white/5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon size={120} />
            </div>
            <div className="relative z-10">
              <p className="text-[12px] tracking-[0.3em] text-white/40 uppercase font-black mb-4">{stat.name}</p>
              <h3 className={`text-5xl font-heading font-bold ${stat.color}`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111111] p-10 border border-white/5 space-y-6">
          <h3 className="text-lg font-heading font-bold text-white uppercase tracking-widest">Recent Activity</h3>
          <div className="space-y-4">
             <div className="flex items-center gap-4 p-4 bg-white/5 rounded-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p className="text-xs text-white/60 tracking-wider">CMS System Initialized Successfully</p>
             </div>
             <div className="flex items-center gap-4 p-4 bg-white/5 rounded-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <p className="text-xs text-white/60 tracking-wider">SQLite Content Store Synchronized</p>
             </div>
          </div>
        </div>

        <div className="bg-[#c9a84c] p-10 space-y-6">
          <h3 className="text-lg font-heading font-bold text-[#111111] uppercase tracking-widest">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/dashboard/gallery" className="bg-black text-white px-6 py-3 text-[12px] tracking-widest font-bold uppercase transition-transform hover:-translate-y-1">Upload Media</Link>
            <Link href="/admin/dashboard/hero" className="bg-[#111111]/10 text-black border border-black/20 px-6 py-3 text-[12px] tracking-widest font-bold uppercase transition-transform hover:-translate-y-1">Edit Headline</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
