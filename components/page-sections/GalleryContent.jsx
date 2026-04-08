"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { FaPlay, FaExpandAlt } from "react-icons/fa";
import { cn } from "@/utils/cn";

const categories = ["All", "Weddings", "Birthdays", "Decor", "SFX & Fireworks", "Entries"];

const galleryImages = [
  { src: "/photos/wedding-stage.jpg", title: "The Royal Stage", category: "Weddings", type: "image" },
  { src: "/photos/wedding-1.jpg", title: "Palace Mandap", category: "Weddings", type: "image" },
  { src: "/videos/hero-main.mp4", title: "Signature Entry", category: "Weddings", type: "video", poster: "/photos/wedding-stage.jpg" },
  { src: "/photos/wedding-2.jpg", title: "Sangeet Night", category: "Weddings", type: "image" },
  { src: "/photos/wedding-3.jpg", title: "Reception Decor", category: "Weddings", type: "image" },
  { src: "/photos/wedding-4.jpg", title: "Bridal Shoot", category: "Weddings", type: "image" },
  { src: "/photos/haldi-mehndi-decor.jpg", title: "Floral Haldi", category: "Decor", type: "image" },
  { src: "/photos/ring-ceremonies.jpg", title: "Engagement Set", category: "Entries", type: "image" },
  { src: "/photos/new-child-welcome.jpg", title: "Nursery Theme", category: "Decor", type: "image" },
  { src: "/photos/birthday-celebrations.jpg", title: "Themed Party", category: "Birthdays", type: "image" },
  { src: "/photos/fireworks-array.jpg", title: "Midnight Pyro", category: "SFX & Fireworks", type: "image" },
  { src: "/photos/stage-sfx-wedding.jpg", title: "Cold Pyro Entry", category: "SFX & Fireworks", type: "image" },
  { src: "/photos/entries-sfx-1.jpg", title: "Grand Arrival", category: "SFX & Fireworks", type: "image" },
  { src: "/photos/entries-sfx-2.jpg", title: "Stage Fog", category: "SFX & Fireworks", type: "image" },
  { src: "/photos/entries-sfx-3.jpg", title: "Mirror Entry", category: "Entries", type: "image" },
  { src: "/photos/bride-groom-entry.jpg", title: "Classic Entry", category: "Entries", type: "image" },
  { src: "/photos/golden-mirror-floor.jpg", title: "Golden Aisle", category: "Entries", type: "image" },
];

export default function GalleryContent() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const filteredImages = activeTab === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeTab);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="bg-[#0a0a0a] min-h-screen pb-24">
      
      {/* Cinematic Parallax Header */}
      <section ref={headerRef} className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <Image
            src="/photos/wedding-stage.jpg"
            alt="Gallery Heritage"
            fill
            className="object-cover scale-110 grayscale brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-[#c9a84c] text-xs md:text-sm tracking-[0.8em] uppercase mb-8 font-black">Portfolio</h2>
            <h1 className="text-5xl md:text-9xl font-heading font-bold text-white leading-none tracking-tighter">
              Curated <br /> <span className="text-gold-gradient italic">Collection</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Artistic Filter Tabs */}
        <div className="sticky top-20 z-40 py-8 bg-[#0a0a0a]/80 backdrop-blur-md -mt-10 mb-16">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-6 py-2 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold transition-all duration-500 rounded-full border",
                  activeTab === cat 
                    ? "border-[#c9a84c] bg-[#c9a84c] text-[#111111] shadow-[0_0_20px_rgba(201,168,76,0.2)]" 
                    : "border-white/10 text-gray-500 hover:border-white/30 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid with Reveal effects */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="popLayout">
            <Masonry
              breakpointCols={{
                default: 3,
                1100: 3,
                768: 2,
                500: 1
              }}
              className="flex -ml-6 w-auto"
              columnClassName="pl-6 bg-clip-padding"
            >
              {filteredImages.map((image, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  key={`${image.src}-${idx}-${activeTab}`}
                  className="mb-6 relative group cursor-pointer overflow-hidden rounded-sm bg-[#111111]"
                  onClick={() => openLightbox(idx)}
                >
                  {/* Premium Reveal Overlay */}
                  <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px] flex flex-col justify-end p-8">
                    <motion.div 
                      className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                    >
                      <p className="text-[#c9a84c] text-[10px] tracking-widest uppercase mb-1">{image.category}</p>
                      <h4 className="text-xl md:text-2xl font-heading text-white font-medium">{image.title}</h4>
                      <div className="w-8 h-[1px] bg-[#c9a84c] mt-4 group-hover:w-full transition-all duration-700" />
                    </motion.div>
                  </div>

                  {/* Type Indicators */}
                  <div className="absolute top-4 right-4 z-20">
                     {image.type === 'video' ? (
                        <div className="bg-black/60 p-3 rounded-full backdrop-blur-sm border border-white/10 group-hover:bg-[#c9a84c] group-hover:text-black transition-colors">
                           <FaPlay size={12} />
                        </div>
                     ) : (
                        <div className="bg-black/60 p-3 rounded-full backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                           <FaExpandAlt size={12} className="text-white" />
                        </div>
                     )}
                  </div>

                  {/* The Asset */}
                  <Image 
                    src={image.type === 'video' ? (image.poster || image.src) : image.src} 
                    alt={image.title}
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-110 filter grayscale-[0.3] group-hover:grayscale-0" 
                  />
                  
                  {/* Subtle Numbering */}
                  <div className="absolute bottom-4 left-4 z-20 text-[8px] tracking-[0.5em] text-white/20 uppercase font-black group-hover:text-white/60 transition-colors">
                     0{idx + 1} / Collection
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </AnimatePresence>
        </div>

      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={filteredImages.map(img => ({ 
          src: img.src,
          type: img.type === 'video' ? 'video' : 'image'
        }))}
        render={{
          slide: ({ slide }) => {
            if (slide.type === 'video') {
              return (
                <div className="w-full h-full flex items-center justify-center px-4">
                  <video 
                    controls 
                    autoPlay 
                    className="max-w-full max-h-full shadow-2xl"
                    poster={filteredImages[lightboxIndex]?.poster}
                  >
                    <source src={slide.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              );
            }
            return null;
          }
        }}
      />
    </main>
  );
}
