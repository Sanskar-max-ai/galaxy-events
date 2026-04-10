import { getServicesData, addService, updateService, deleteService } from "@/lib/actions";
import { Briefcase, Plus, Save, Trash2, Edit2, X, Upload } from "lucide-react";
import Image from "next/image";

export default async function AdminServicesPage() {
  const services = await getServicesData();
  const iconOptions = ["FaGem", "FaMusic", "FaCamera", "FaGlassCheers", "FaFire", "FaLeaf", "FaUtensils", "FaMagic"];

  return (
    <div className="max-w-6xl pb-20">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#c9a84c]/20 rounded-sm border border-[#c9a84c]/30">
            <Briefcase className="text-[#c9a84c]" size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-heading font-bold text-white">Service Management</h1>
            <p className="text-white/40 text-[12px] tracking-[0.4em] uppercase font-black mt-1">Configure Signature Offerings</p>
          </div>
        </div>

        <div className="bg-[#111111] p-8 border border-white/5 w-full md:w-auto">
          <h2 className="text-[12px] tracking-[0.3em] font-black text-[#c9a84c] uppercase mb-6 flex items-center gap-2">
            <Plus size={14} /> Create New Service
          </h2>
          <form action={addService} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input name="title" placeholder="Service Title" className="bg-black border border-white/10 p-3 text-[12px] tracking-widest uppercase text-white outline-none flex-grow" required />
              <select name="icon_name" className="bg-black border border-white/10 p-3 text-[12px] tracking-widest uppercase text-white outline-none w-32">
                {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
              </select>
            </div>
            <textarea name="description" placeholder="Short description for the card" className="bg-black border border-white/10 p-3 text-xs text-white outline-none h-20" required />
            <div className="flex items-center gap-4">
               <label className="text-[12px] text-white/40 uppercase tracking-widest">Service Image</label>
               <input type="file" name="imageFile" className="text-[12px] text-white/40 file:bg-white/5 file:border-none file:text-white file:px-4 file:py-2 file:cursor-pointer" required />
            </div>
            <button type="submit" className="bg-[#c9a84c] text-[#111111] px-8 py-3 font-bold uppercase tracking-widest text-[12px] mt-2">Publish Service</button>
          </form>
        </div>
      </div>

      <div className="space-y-12">
        <h2 className="text-xs tracking-[0.6em] text-white/20 uppercase font-black">Existing Services</h2>
        {services.map((service) => (
          <div key={service.id} className="bg-[#111111] border border-white/5 p-8 group">
            <form action={async (formData) => { "use server"; await updateService(service.id, formData); }}>
              <input type="hidden" name="currentImageSrc" value={service.image_src} />
              
              <div className="flex flex-col md:flex-row gap-10">
                {/* Visual Preview & Replace */}
                <div className="w-full md:w-64 space-y-4">
                  <div className="aspect-square relative border border-white/5 overflow-hidden">
                    <Image src={service.image_src} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="relative">
                    <input type="file" name="imageFile" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="bg-white/5 border border-white/5 p-3 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                      <Upload size={12} className="text-[#c9a84c]" />
                      <span className="text-[10px] tracking-widest text-white/60 uppercase">Change Photo</span>
                    </div>
                  </div>
                </div>

                {/* Content Management */}
                <div className="flex-grow space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                      <label className="text-[8px] tracking-widest text-white/20 uppercase block mb-1">Service Headline</label>
                      <input 
                        name="title" 
                        defaultValue={service.title} 
                        className="w-full bg-transparent border-b border-white/10 text-2xl font-heading font-bold text-white outline-none focus:border-[#c9a84c] transition-all pb-2"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] tracking-widest text-white/20 uppercase block mb-1">Brand Icon</label>
                      <select 
                        name="icon_name" 
                        defaultValue={service.icon_name}
                        className="bg-black border border-white/10 p-3 text-[12px] tracking-widest uppercase text-[#c9a84c] outline-none"
                      >
                        {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[8px] tracking-widest text-white/20 uppercase block mb-1">Service Description</label>
                    <textarea 
                      name="description" 
                      defaultValue={service.description} 
                      className="w-full bg-black/40 border border-white/5 p-4 text-xs text-white/60 leading-relaxed outline-none focus:border-[#c9a84c] transition-all h-28"
                    />
                  </div>

                  <div className="flex justify-end pt-6 border-t border-white/5">
                    <button type="submit" className="flex items-center gap-3 bg-white/5 hover:bg-[#c9a84c] text-white hover:text-black px-8 py-3 transition-all">
                       <Save size={14} />
                       <span className="text-[12px] tracking-widest uppercase font-bold">Save Changes</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Delete form - moved outside update form to fix nesting bug */}
            <div className="flex justify-start mt-4 pt-4 border-t border-white/5">
              <form action={async () => { "use server"; await deleteService(service.id); }}>
                <button className="flex items-center gap-2 text-[12px] text-red-500/40 hover:text-red-500 tracking-widest uppercase font-black transition-all">
                  <Trash2 size={12} />
                  Delete Service
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
