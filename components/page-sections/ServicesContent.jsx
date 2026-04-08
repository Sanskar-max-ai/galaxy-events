"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FaGem, FaMusic, FaCamera, FaGlassCheers, FaFire, FaLeaf, 
  FaRing, FaChild, FaCampground, FaStar 
} from "react-icons/fa";
import ServiceCard from "@/components/ServiceCard";

const allServices = [
  { title: "Premium Weddings", icon: FaGem, desc: "End-to-end luxury wedding planning, execution, and management, ensuring a flawless cinematic experience.", image: "/photos/wedding-stage.jfif" },
  { title: "Ring Ceremonies", icon: FaRing, desc: "Elegant engagement setups from stage designs to beautiful ring presentation trays.", image: "/photos/ring-ceremonies.jfif" },
  { title: "New Child Welcome", icon: FaChild, desc: "Naamkaran and welcome events stylized with delicate and warm decor perfect for the family.", image: "/photos/new-child-welcome.jfif" },
  { title: "Birthday Celebrations", icon: FaGlassCheers, desc: "Thematic parties for all ages, featuring custom photo booths and entertainment styling.", image: "/photos/birthday-celebrations.jfif" },
  { title: "Wedding Decor & Haldi", icon: FaLeaf, desc: "Traditional yet modern Haldi, Mehndi, and floral setups bringing vibrant energy.", image: "/photos/haldi-mehndi-decor.jfif" },
  { title: "Tent & Venue Setup", icon: FaCampground, desc: "Luxurious tentage, draping, and structural venue styling with premium elements.", image: "/photos/wedding-1.jfif" },
  { title: "Stage SFX & Pyro", icon: FaFire, desc: "Safe, spectacular cold pyrotechnics and special effects for stage performances.", image: "/photos/stage-sfx-wedding.jfif" },
  { title: "Fireworks Array", icon: FaFire, desc: "Breathtaking outdoor firework displays for the grandest wedding entries and farewells.", image: "/photos/fireworks-array.jfif" },
  { title: "Sangeet Management", icon: FaMusic, desc: "High-energy choreography coordination, stage lighting, and top-tier sound setups.", image: "/photos/wedding-2.jfif" },
  { title: "Golden Mirror Floor", icon: FaStar, desc: "The ultimate premium bride entry experience featuring a golden mirror aisle and mist effects.", image: "/photos/golden-mirror-floor.jfif" },
];

export default function ServicesContent() {
  return (
    <main className="pt-20 bg-[#0a0a0a] min-h-screen">
      {/* Header Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1542031109-77a83d46cb92?q=80&w=1920&auto=format&fit=crop"
            alt="Services Banner"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-heading font-semibold text-white mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#c9a84c] tracking-widest uppercase text-sm"
          >
            Curated elegance for every occasion
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allServices.map((service, idx) => (
              <ServiceCard
                key={idx}
                title={service.title}
                description={service.desc}
                icon={service.icon}
                image={service.image}
                delay={idx * 0.1}
                href="/contact"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Banner */}
      <section className="py-16 bg-[#111111] border-y border-white/5">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Need a custom package for your event?</h2>
          <a href="/contact" className="inline-flex items-center justify-center min-h-[48px] w-full md:w-auto border border-[#c9a84c] text-[#c9a84c] px-8 py-3 uppercase tracking-widest text-sm hover:bg-[#c9a84c] hover:text-[#111111] transition-all duration-300">
            Talk to our Planners
          </a>
        </div>
      </section>
    </main>
  );
}
