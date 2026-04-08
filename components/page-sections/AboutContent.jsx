"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaHistory, FaCalendarCheck, FaFire, FaClipboardCheck } from "react-icons/fa";

const whyChooseUs = [
  { title: "10+ Years Experience", icon: FaHistory, desc: "A decade of mastering the art of event management." },
  { title: "500+ Events Delivered", icon: FaCalendarCheck, desc: "A proven track record of successful premium weddings and parties." },
  { title: "SFX Specialists", icon: FaFire, desc: "Pioneers in safe, cinematic stage pyrotechnics and grand entries." },
  { title: "End-to-End Planning", icon: FaClipboardCheck, desc: "From concept to venue cleanup, we handle every single detail." },
];

export default function AboutContent() {
  return (
    <main className="pt-20 md:pt-24 bg-[#0a0a0a] min-h-screen">
      
      {/* Hero / Brand Story */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#111111] to-transparent pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[#c9a84c] text-sm tracking-[0.2em] uppercase mb-4 font-semibold">Our Heritage</h1>
              <h2 className="text-4xl md:text-6xl font-heading font-semibold text-white mb-8 leading-tight">
                Redefining Luxury <br /> in Hoshangabad
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">
                Founded with a passion for celebration, Galaxy Events has grown into central India's premier event stylizer. We specialize in transforming ordinary venues into breathtaking cinematic experiences.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                We believe that an event is a reflection of your personality. Our dedicated team of planners, decorators, and technicians work seamlessly to weave your ideas into a flawlessly executed reality. No stress, no compromises—just perfect memories.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square rounded-sm overflow-hidden border border-white/10"
            >
              <Image
                src="/photos/wedding-1.jpg"
                alt="Galaxy Events Setup"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-[#111111] border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#c9a84c] text-sm tracking-[0.2em] uppercase mb-4 font-semibold">The Galaxy Advantage</h2>
            <h3 className="text-3xl md:text-5xl font-heading font-semibold text-white">Why Choose Us</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#1a1a1a] p-8 text-center border border-white/5 hover:border-[#c9a84c]/30 transition-colors group"
              >
                <div className="w-16 h-16 mx-auto bg-[#111111] rounded-full flex items-center justify-center mb-6 text-[#c9a84c] border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon size={24} />
                </div>
                <h4 className="text-xl font-heading font-medium text-white mb-3">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Placeholder */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-[#c9a84c] text-sm tracking-[0.2em] uppercase mb-4 font-semibold">The Masters</h2>
          <h3 className="text-3xl md:text-5xl font-heading font-semibold text-white mb-16">Meet Our Team</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[1, 2, 3].map((_, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <div className="aspect-[3/4] relative overflow-hidden mb-6 bg-[#1a1a1a] border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-500 rounded-sm">
                  <Image
                    src="/photos/wedding-3.jpg"
                    alt="Team Member Placeholder"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xl font-heading text-white">Event Director</h4>
                <p className="text-[#c9a84c] text-sm mt-1">Galaxy Events Core</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Quote */}
      <section className="py-20 md:py-32 bg-[#111111] relative overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[url('/photos/fireworks-array.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-heading font-medium text-white italic leading-relaxed"
          >
            "We don't just build stages; we set the scene for the rest of your life."
          </motion.p>
          <div className="w-24 h-1 bg-[#c9a84c] mx-auto mt-10" />
        </div>
      </section>

    </main>
  );
}
