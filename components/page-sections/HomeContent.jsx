"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGem, FaMusic, FaCamera, FaGlassCheers, FaFire, FaLeaf, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import TestimonialSlider from "@/components/TestimonialSlider";

const showcaseServices = [
  { title: "Premium Weddings", icon: FaGem, desc: "End-to-end luxury wedding planning and execution.", image: "/photos/wedding-stage.jfif" },
  { title: "Sangeet Management", icon: FaMusic, desc: "Choreography, staging, and musical extravagance.", image: "/photos/wedding-2.jfif" },
  { title: "SFX & Fireworks", icon: FaFire, desc: "Spectacular pyrotechnics and safe cold fireworks stage entry.", image: "/photos/fireworks-array.jfif" },
  { title: "Venue Decor", icon: FaLeaf, desc: "Floral arrangements, thematic drapes, and ambient lighting.", image: "/photos/haldi-mehndi-decor.jfif" },
  { title: "Cinematic Photography", icon: FaCamera, desc: "Capturing your best moments with high-end equipment.", image: "/photos/wedding-4.jfif" },
  { title: "Birthday Celebrations", icon: FaGlassCheers, desc: "Themed birthday parties for kids and adults alike.", image: "/photos/birthday-celebrations.jfif" },
];

const galleryTeaserPhotos = [
  "/photos/wedding-stage.jfif",
  "/photos/wedding-2.jfif",
  "/photos/haldi-mehndi-decor.jfif",
  "/photos/stage-sfx-wedding.jfif",
  "/photos/bride-groom-entry.jfif",
  "/photos/golden-mirror-floor.jfif"
];

export default function HomeContent() {
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <>
      <HeroSection />

      {/* Intro Section - World Class Spacing */}
      <section className="py-12 md:py-36 px-4 md:px-6 bg-[#0a0a0a] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="text-gold-gradient text-[10px] tracking-[0.5em] uppercase mb-6 font-black">Our Heritage</h2>
              <h3 className="text-5xl md:text-7xl font-heading font-bold text-white mb-10 leading-[1.1]">
                Crafting Timeless <br /> <span className="italic font-light">Elegance</span>
              </h3>
              <p className="text-gray-400 text-xl leading-relaxed mb-8 font-light max-w-xl">
                At Galaxy Events, we don't just organize; we design cinematic experiences. With over a decade of expertise, our team brings your vision to life with immaculate style and perfect timing.
              </p>
              <Link href="/about" className="group flex items-center gap-4 text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-bold transition-all hover:text-white">
                <span>The Story</span>
                <div className="h-[1px] w-12 bg-[#c9a84c] group-hover:w-20 transition-all duration-500" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative aspect-[4/5] lg:h-[700px] rounded-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 z-10" />
              <Image
                src="/photos/wedding-3.jfif"
                alt="Elegant Indian Wedding Setup"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-16 md:py-24 bg-[#111111] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-gold-gradient text-sm tracking-[0.3em] uppercase mb-4 font-bold">Our Expertise</h2>
            <h3 className="text-4xl md:text-6xl font-heading font-semibold text-white">Signature Services</h3>
          </motion.div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="hidden md:flex items-center gap-2 mr-4">
              <button 
                onClick={() => scroll(-400)}
                className="p-3 border border-white/10 text-white hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all rounded-full"
                aria-label="Scroll Left"
              >
                <FaArrowLeft size={14} />
              </button>
              <button 
                onClick={() => scroll(400)}
                className="p-3 border border-white/10 text-white hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all rounded-full"
                aria-label="Scroll Right"
              >
                <FaArrowRight size={14} />
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/services" className="inline-flex items-center justify-center border border-white/20 px-6 min-h-[48px] w-full md:w-auto text-sm tracking-widest text-white uppercase hover:bg-white hover:text-black transition-colors">
                View All
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Auto Scroll wrapper Desktop / Vertical layout Mobile */}
        <div 
          ref={scrollRef}
          className="w-full overflow-x-hidden md:overflow-x-auto pb-8 hide-scrollbar cursor-grab active:cursor-grabbing px-4 md:px-8 md:snap-x md:snap-mandatory"
        >
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-6 w-full md:w-max mx-auto md:mx-0">
             {showcaseServices.map((service, idx) => (
                <div key={idx} className="w-full md:w-[400px] shrink-0 md:snap-center">
                  <ServiceCard 
                    title={service.title} 
                    description={service.desc} 
                    icon={service.icon} 
                    image={service.image}
                    delay={idx * 0.1}
                  />
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="py-12 md:py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-gold-gradient text-[10px] tracking-[0.5em] uppercase mb-6 font-black">Portfolio</h2>
            <h3 className="text-5xl md:text-7xl font-heading font-bold text-white">Moments Captured</h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
            {galleryTeaserPhotos.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative overflow-hidden group rounded-sm ${idx === 0 || idx === 3 ? "col-span-2 md:col-span-1 md:row-span-2" : "aspect-square"}`}
                style={{ minHeight: idx === 0 || idx === 3 ? "400px" : "auto" }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                <Image
                  src={src}
                  alt={`Gallery teaser ${idx}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center w-full">
            <Link href="/gallery" className="inline-flex items-center justify-center border border-[#c9a84c] text-[#c9a84c] px-8 min-h-[48px] w-full md:w-auto font-semibold uppercase tracking-widest text-sm hover:bg-[#c9a84c] hover:text-[#111111] transition-colors">
              Explore Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-[#111111]">
        <div className="container mx-auto text-center px-4 md:px-6">
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 md:py-24 bg-[#c9a84c]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-semibold text-[#111111] mb-6"
          >
            Ready to Plan Your Dream Event?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#1a1a1a] text-lg mb-10 max-w-2xl mx-auto"
          >
            Contact us today for a consultation. Let us transform your vision into a celebrated reality with unmatched elegance.
          </motion.p>
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="w-full"
          >
            <Link href="/contact" className="inline-flex items-center justify-center bg-[#111111] text-white px-10 min-h-[48px] w-full md:w-auto font-semibold uppercase tracking-widest hover:bg-[#1f1f1f] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              Contact Us Now
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
