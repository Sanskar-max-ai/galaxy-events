"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaGem, FaMusic, FaCamera, FaGlassCheers, FaFire, FaLeaf, FaArrowLeft, FaArrowRight, FaTimes, FaPlay } from "react-icons/fa";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import TestimonialSlider from "@/components/TestimonialSlider";

const showcaseServices = [
  { title: "Premium Weddings", icon: FaGem, desc: "End-to-end luxury wedding planning and execution.", image: "/photos/wedding-stage.jpg" },
  { title: "Sangeet Management", icon: FaMusic, desc: "Choreography, staging, and musical extravagance.", image: "/photos/wedding-2.jpg" },
  { title: "SFX & Fireworks", icon: FaFire, desc: "Spectacular pyrotechnics and safe cold fireworks stage entry.", image: "/photos/fireworks-array.jpg" },
  { title: "Venue Decor", icon: FaLeaf, desc: "Floral arrangements, thematic drapes, and ambient lighting.", image: "/photos/haldi-mehndi-decor.jpg" },
  { title: "Cinematic Photography", icon: FaCamera, desc: "Capturing your best moments with high-end equipment.", image: "/photos/wedding-4.jpg" },
  { title: "Birthday Celebrations", icon: FaGlassCheers, desc: "Themed birthday parties for kids and adults alike.", image: "/photos/birthday-celebrations.jpg" },
];

const galleryTeaserPhotos = [
  "/photos/wedding-stage.jpg",
  "/photos/wedding-2.jpg",
  "/photos/haldi-mehndi-decor.jpg",
  "/photos/stage-sfx-wedding.jpg",
  "/photos/bride-groom-entry.jpg",
  "/photos/golden-mirror-floor.jpg"
];

export default function HomeContent() {
  const [selectedService, setSelectedService] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);

  // Triple the services for infinite-like scroll effect on mobile
  const infiniteServices = [...showcaseServices, ...showcaseServices, ...showcaseServices];

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
        setActiveSlide(index % showcaseServices.length);
      }
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }
    return () => currentRef?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HeroSection />

      {/* Services Snapshot - Center aligned Mobile Headers */}
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
                aria-label="Scroll Left"
              >
                <FaArrowLeft size={16} />
              </button>
              <button 
                onClick={() => scroll(450)}
                className="p-4 border border-white/10 text-white hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all rounded-full bg-white/5"
                aria-label="Scroll Right"
              >
                <FaArrowRight size={16} />
              </button>
            </div>
            <Link href="/services" className="inline-flex items-center justify-center border border-[#c9a84c]/30 px-8 min-h-[52px] w-full md:w-auto text-xs tracking-[0.3em] text-white uppercase hover:bg-[#c9a84c] hover:text-black transition-all duration-500 font-bold">
              Explore Collection
            </Link>
          </div>
        </div>

        {/* Infinite Paged Carousel wrapper for Mobile */}
        <div className="md:hidden relative px-4">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-0"
          >
            {showcaseServices.map((service, idx) => (
              <div key={idx} className="w-full shrink-0 snap-center px-2">
                <ServiceCard 
                  title={service.title} 
                  description={service.desc} 
                  icon={service.icon} 
                  image={service.image}
                  delay={0}
                  onClick={() => setSelectedService(service)}
                />
              </div>
            ))}
          </div>
          
          {/* Pagination Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {showcaseServices.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 transition-all duration-300 rounded-full ${activeSlide === idx ? "w-8 bg-[#c9a84c]" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:block container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {showcaseServices.map((service, idx) => (
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

      {/* Portfolio Creative Bento Grid - Centered Mobile Alignment */}
      <section className="py-24 md:py-40 bg-[#0a0a0a] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center md:items-end md:flex-row justify-between gap-12 mb-20 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-gold-gradient text-xs tracking-[0.6em] uppercase mb-6 font-black">Our Creations</h2>
              <h3 className="text-5xl md:text-8xl font-heading font-bold text-white leading-[1.1]">
                Featured <br /> <span className="text-gold-gradient italic">Showcase</span>
              </h3>
            </motion.div>
            <Link href="/gallery" className="group flex items-center gap-6 text-[#c9a84c] tracking-[0.4em] uppercase text-xs font-black transition-all hover:text-white">
              <span className="shrink-0">Full Portfolio</span>
              <div className="h-[1px] w-12 bg-[#c9a84c] group-hover:w-24 transition-all duration-700" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-auto md:h-[1300px]">
            {/* Main Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-8 md:row-span-2 relative group overflow-hidden bg-[#111111]"
            >
              <Image src="/photos/wedding-stage.jpg" alt="Wedding Stage" fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 z-20">
                <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-2">Grand Production</p>
                <h4 className="text-4xl font-heading text-white">Cinematic Wedding Stages</h4>
              </div>
            </motion.div>

            {/* Side 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-4 relative group overflow-hidden bg-[#111111]"
            >
              <Image src="/photos/wedding-2.jpg" alt="Wedding 2" fill className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white/60 text-[10px] tracking-widest uppercase">Styling</p>
                <h4 className="text-2xl font-heading text-white">Sangeet Extravaganza</h4>
              </div>
            </motion.div>

            {/* Side 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-4 relative group overflow-hidden bg-[#111111]"
            >
              <Image src="/photos/haldi-mehndi-decor.jpg" alt="Haldi" fill className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white/60 text-[10px] tracking-widest uppercase">Traditional</p>
                <h4 className="text-2xl font-heading text-white">Vibrant Haldi Themes</h4>
              </div>
            </motion.div>

            {/* Wide bottom */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-12 relative group overflow-hidden bg-[#111111]"
            >
              <div className="h-[400px] w-full relative">
                <Image src="/photos/golden-mirror-floor.jpg" alt="Mirror Floor" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                <div className="absolute inset-y-0 left-12 flex flex-col justify-center max-w-lg">
                  <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Ultimate Experience</p>
                  <h4 className="text-5xl font-heading text-white mb-6 leading-tight">Elite Groom & Bride Entries</h4>
                  <p className="text-white/60 font-light leading-relaxed">Redefining reality with golden mirror aisles, fog effects, and cinematic grand entries that stun your guests.</p>
                </div>
              </div>
            </motion.div>
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
                    {selectedService.desc} our team specializes in creating a seamless and high-end experience for your {selectedService.title.toLowerCase()}.
                  </p>
                  <p className="text-white/50 leading-relaxed font-light">
                    From meticulous planning to the final execution, we ensure every detail aligns with our brand's promise of cinematic excellence. This includes custom lighting, high-end sound production, and professional coordination.
                  </p>
                </div>

                <Link 
                  href="/contact" 
                  onClick={() => setSelectedService(null)}
                  className="inline-flex items-center justify-center bg-[#c9a84c] text-[#111111] font-bold py-5 px-10 rounded-sm uppercase tracking-widest text-sm hover:bg-[#dac175] transition-all"
                >
                  Book This Service
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
