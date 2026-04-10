"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "react-icons/fa";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import TestimonialSlider from "@/components/TestimonialSlider";

export default function HomeContent({ initialHero, initialServices, initialGalleryTeaser }) {
  const [selectedService, setSelectedService] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);

  // Fallback to initial data if DB is empty or just starting
  const services = initialServices?.length > 0 ? initialServices : [];
  const heroData = initialHero || { headline: "Where Every Moment Becomes a Memory", subtext: "Galaxy Premium Service", video_url: "/videos/hero-main.mp4" };
  const teaserPhotos = initialGalleryTeaser?.length > 0 ? initialGalleryTeaser : [];

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const width = scrollRef.current.offsetWidth;
        const index = Math.round(scrollLeft / width);
        setActiveSlide(index % (services.length || 1));
      }
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }
    return () => currentRef?.removeEventListener("scroll", handleScroll);
  }, [services.length]);

  // Lock body scroll and hide sticky CTA when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  // Helper to map icon string to Component
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.FaGem;
    return IconComponent;
  };

  return (
    <>
      <HeroSection 
        videoUrl={heroData.video_url} 
        headline={heroData.headline} 
        subtext={heroData.subtext} 
      />

      {/* Services Snapshot */}
      <section className="py-20 md:py-32 bg-[#111111] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 mb-12 flex flex-col items-center md:items-end md:flex-row justify-between gap-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-gold-gradient text-sm tracking-[0.4em] uppercase mb-4 font-bold">Our Expertise</h2>
            <h3 className="text-4xl md:text-7xl font-heading font-semibold text-white">Signature Services</h3>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => scroll(-450)}
                className="p-4 border border-white/10 text-white hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all rounded-full bg-white/5"
              >
                <FaArrowLeft size={16} />
              </button>
              <button 
                onClick={() => scroll(450)}
                className="p-4 border border-white/10 text-white hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all rounded-full bg-white/5"
              >
                <FaArrowRight size={16} />
              </button>
            </div>
            <Link href="/services" className="inline-flex items-center justify-center border border-[#c9a84c]/30 px-8 min-h-[52px] w-full md:w-auto text-xs tracking-[0.3em] text-white uppercase hover:bg-[#c9a84c] hover:text-black transition-all duration-500 font-bold">
              Explore Collection
            </Link>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative px-4">
          <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-0">
            {services.map((service, idx) => (
              <div key={idx} className="w-full shrink-0 snap-center snap-always px-2">
                <ServiceCard 
                  title={service.title} 
                  description={service.description} 
                  icon={getIcon(service.icon_name)} 
                  image={service.image_src}
                  delay={0}
                  onClick={() => setSelectedService(service)}
                />
              </div>
            ))}
          </div>
          
          {/* Mobile Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {services.map((_, idx) => (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  width: idx === activeSlide ? 24 : 8,
                  backgroundColor: idx === activeSlide ? "#c9a84c" : "rgba(255, 255, 255, 0.4)"
                }}
                className="h-2 rounded-full"
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:block container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {services.map((service, idx) => (
                <ServiceCard 
                  key={idx}
                  title={service.title} 
                  description={service.description} 
                  icon={getIcon(service.icon_name)} 
                  image={service.image_src}
                  delay={idx * 0.1}
                  onClick={() => setSelectedService(service)}
                />
             ))}
          </div>
        </div>
      </section>

      {/* Portfolio Bento */}
      <section className="py-24 md:py-40 bg-[#0a0a0a] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center md:items-end md:flex-row justify-between gap-12 mb-20 text-center md:text-left">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-gold-gradient text-xs tracking-[0.6em] uppercase mb-6 font-black">Our Creations</h2>
              <h3 className="text-5xl md:text-8xl font-heading font-bold text-white leading-[1.1]">Featured <br /> <span className="text-gold-gradient italic">Showcase</span></h3>
            </motion.div>
            <Link href="/gallery" className="group flex items-center gap-6 text-[#c9a84c] tracking-[0.4em] uppercase text-xs font-black transition-all hover:text-white">
              <span>Full Portfolio</span>
              <div className="h-[1px] w-12 bg-[#c9a84c] group-hover:w-24 transition-all duration-700" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-auto md:h-[1300px]">
            {teaserPhotos.map((item, idx) => {
              const spanClass = idx === 0 ? "md:col-span-8 md:row-span-2" : "md:col-span-4";
              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.97 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${spanClass} relative group overflow-hidden bg-[#111111] h-[450px] md:h-full`}
                >
                  <Image src={item.type === 'video' ? (item.poster || item.src) : item.src} alt={item.title} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10 z-20">
                    <p className="text-[#c9a84c] text-[12px] tracking-widest uppercase mb-2">{item.category}</p>
                    <h4 className="text-3xl font-heading text-white">{item.title}</h4>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal & Footer Components */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedService(null)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-5xl bg-[#111111] border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors p-2 bg-white/5 rounded-full"><FaTimes size={24} /></button>
              <div className="w-full md:w-1/2 relative h-[300px] md:h-auto">
                <Image src={selectedService.image_src} alt={selectedService.title} fill className="object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-4 sm:p-6 lg:p-16 flex flex-col justify-center">
                <h3 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tight">{selectedService.title}</h3>
                <p className="text-white/70 text-lg leading-relaxed font-light mb-12">{selectedService.description}</p>
                <Link href="/contact" onClick={() => setSelectedService(null)} className="inline-flex items-center justify-center bg-[#c9a84c] text-[#111111] font-bold py-5 px-10 rounded-sm uppercase tracking-widest text-sm">Book This Service</Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="py-12 md:py-20 bg-[#111111]"><div className="container mx-auto text-center"><TestimonialSlider /></div></section>
      
      <section className="py-12 md:py-24 bg-[#c9a84c]">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-heading font-semibold text-[#111111] mb-6">Ready to Plan Your Dream Event?</h2>
          <p className="text-[#1a1a1a] text-lg mb-10 max-w-2xl mx-auto">Contact us today for a consultation. Let us transform your vision into a celebrated reality with unmatched elegance.</p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-[#111111] text-white px-10 py-5 font-semibold uppercase tracking-widest hover:bg-[#1f1f1f] shadow-xl transition-all">Contact Us Now</Link>
        </div>
      </section>
    </>
  );
}
