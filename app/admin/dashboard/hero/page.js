import { getHeroData, updateHero } from "@/lib/actions";
import { Home, Save, Upload } from "lucide-react";

export default async function AdminHeroPage() {
  const hero = await getHeroData();

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-[#c9a84c]/20 rounded-sm border border-[#c9a84c]/30">
          <Home className="text-[#c9a84c]" size={24} />
        </div>
        <div>
          <h1 className="text-4xl font-heading font-bold text-white">Hero Management</h1>
          <p className="text-white/40 text-[12px] tracking-[0.4em] uppercase font-black mt-1">Landing Impact Settings</p>
        </div>
      </div>

      <form action={updateHero} className="space-y-12">
        <input type="hidden" name="currentVideoUrl" value={hero?.video_url || ""} />
        
        <div className="grid grid-cols-1 gap-10">
          {/* Text Settings */}
          <div className="p-10 bg-[#111111] border border-white/5 space-y-8">
            <h2 className="text-lg font-heading font-bold text-[#c9a84c] tracking-widest uppercase">Messaging</h2>
            
            <div className="space-y-4">
              <label className="block text-[12px] tracking-[0.2em] text-white/40 uppercase font-black">Main Headline</label>
              <input 
                name="headline"
                defaultValue={hero?.headline}
                className="w-full bg-black border border-white/10 p-4 text-white font-heading text-xl outline-none focus:border-[#c9a84c] transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-[12px] tracking-[0.2em] text-white/40 uppercase font-black">Subheading / Badge</label>
              <input 
                name="subtext"
                defaultValue={hero?.subtext}
                className="w-full bg-black border border-white/10 p-4 text-white font-light text-lg outline-none focus:border-[#c9a84c] transition-all"
              />
            </div>
          </div>

          {/* Visual Settings */}
          <div className="p-10 bg-[#111111] border border-white/5 space-y-8">
            <h2 className="text-lg font-heading font-bold text-[#c9a84c] tracking-widest uppercase">Cinematic Background</h2>
            
            <div className="space-y-6">
              <div className="aspect-video w-full bg-black relative overflow-hidden group border border-white/10">
                <video 
                  src={hero?.video_url} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[12px] tracking-[0.3em] font-black text-white/20 uppercase">Current Media Active</p>
                </div>
              </div>

              <div className="relative">
                <input 
                  type="file" 
                  name="videoFile"
                  accept="video/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full border-2 border-dashed border-white/10 p-8 text-center group-hover:border-[#c9a84c] transition-all flex flex-col items-center gap-3">
                  <Upload className="text-white/20" />
                  <p className="text-[12px] tracking-[0.2em] text-white/40 uppercase font-black">Click or Drag to Replace 4K Video</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            className="flex items-center gap-3 bg-[#c9a84c] text-[#111111] px-12 py-5 font-bold uppercase tracking-[0.3em] text-sm hover:bg-[#dac175] transition-all shadow-xl"
          >
            <Save size={18} />
            Commit Changes
          </button>
        </div>
      </form>
    </div>
  );
}
