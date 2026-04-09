"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGem, FaMusic, FaCamera, FaGlassCheers, FaFire, FaLeaf, 
  FaRing, FaChild, FaCampground, FaStar, FaTimes 
} from "react-icons/fa";
import ServiceCard from "@/components/ServiceCard";

const allServices = [
  { title: "Premium Weddings", icon: FaGem, desc: "End-to-end luxury wedding planning, execution, and management, ensuring a flawless cinematic experience.", image: "/photos/wedding-stage.jpg" },
  { title: "Ring Ceremonies", icon: FaRing, desc: "Elegant engagement setups from stage designs to beautiful ring presentation trays.", image: "/photos/ring-ceremonies.jpg" },
  { title: "New Child Welcome", icon: FaChild, desc: "Naamkaran and welcome events stylized with delicate and warm decor perfect for the family.", image: "/photos/new-child-welcome.jpg" },
  { title: "Birthday Celebrations", icon: FaGlassCheers, desc: "Thematic parties for all ages, featuring custom photo booths and entertainment styling.", image: "/photos/birthday-celebrations.webp" },
  { title: "Wedding Decor & Haldi", icon: FaLeaf, desc: "Traditional yet modern Haldi, Mehndi, and floral setups bringing vibrant energy.", image: "/photos/haldi-mehndi-decor.jpg" },
  { title: "Tent & Venue Setup", icon: FaCampground, desc: "Luxurious tentage, draping, and structural venue styling with premium elements.", image: "/photos/wedding-1.jpg" },
  { title: "Stage SFX & Pyro", icon: FaFire, desc: "Safe, spectacular cold pyrotechnics and special effects for stage performances.", image: "/photos/stage-sfx-wedding.jpg" },
  { title: "Fireworks Array", icon: FaFire, desc: "Breathtaking outdoor firework displays for the grandest wedding entries and farewells.", image: "/photos/fireworks-array.jpg" },
  { title: "Sangeet Management", icon: FaMusic, desc: "High-energy choreography coordination, stage lighting, and top-tier sound setups.", image: "/photos/sangeet-management.png" },
  { title: "Bride & Groom Entry", icon: FaStar, desc: "Grand cinematic entries with cold pyro, flowers, and matching background scores.", image: "/photos/bride-groom-entry.jpg" },
  { title: "Golden Mirror Floor", icon: FaStar, desc: "The ultimate premium bride entry experience featuring a golden mirror aisle and mist effects.", image: "/photos/golden-mirror-floor.jpg" },
];

export default function ServicesContent() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <main className="pt-20 bg-[#0a0a0a] min-h-screen">
      {/* Header Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/photos/wedding-stage.jpg"
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
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-[#111111] border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors p-2 bg-white/5 rounded-full"
              >
                <FaTimes size={24} />
              </button>

              <div className="w-full md:w-1/2 relative h-[300px] md:h-auto">
                <Image src={selectedService.image} alt={selectedService.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                <selectedService.icon className="text-[#c9a84c] text-5xl mb-8" />
                <h3 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tight">
                  {selectedService.title}
                </h3>
                <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-8 font-black">Galaxy Premium Service</p>
                
                <div className="space-y-6 mb-12">
                  <p className="text-white/70 text-lg leading-relaxed font-light">
                    {selectedService.desc} Our team of experts at Galaxy Events guarantees that your {selectedService.title.toLowerCase()} is managed with absolute precision and world-class flair.
                  </p>
                  <p className="text-white/50 leading-relaxed font-light">
                    Every aspect is tailored to your vision, utilizing our proprietary design techniques and high-end vendor network to deliver a truly cinematic celebration that your guests will talk about for years.
                  </p>
                </div>

                <Link 
                  href="/contact" 
                  onClick={() => setSelectedService(null)}
                  className="inline-flex items-center justify-center bg-[#c9a84c] text-[#111111] font-bold py-5 px-10 rounded-sm uppercase tracking-widest text-sm hover:bg-[#dac175] transition-all"
                >
                  Confirm Booking Inquiry
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
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
