"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { cn } from "@/utils/cn";

const categories = ["All", "Weddings", "Birthdays", "Decor", "SFX & Fireworks", "Entries"];

const galleryImages = [
  { src: "/photos/wedding-stage.jfif", category: "Weddings" },
  { src: "/photos/wedding-1.jfif", category: "Weddings" },
  { src: "/photos/wedding-2.jfif", category: "Weddings" },
  { src: "/photos/wedding-3.jfif", category: "Weddings" },
  { src: "/photos/wedding-4.jfif", category: "Weddings" },
  { src: "/photos/haldi-mehndi-decor.jfif", category: "Decor" },
  { src: "/photos/ring-ceremonies.jfif", category: "Entries" },
  { src: "/photos/new-child-welcome.jfif", category: "Decor" },
  { src: "/photos/birthday-celebrations.jfif", category: "Birthdays" },
  { src: "/photos/fireworks-array.jfif", category: "SFX & Fireworks" },
  { src: "/photos/stage-sfx-wedding.jfif", category: "SFX & Fireworks" },
  { src: "/photos/entries-sfx-1.jfif", category: "SFX & Fireworks" },
  { src: "/photos/entries-sfx-2.jfif", category: "SFX & Fireworks" },
  { src: "/photos/entries-sfx-3.jfif", category: "Entries" },
  { src: "/photos/bride-groom-entry.jfif", category: "Entries" },
  { src: "/photos/golden-mirror-floor.jfif", category: "Entries" },
];

export default function GalleryContent() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = activeTab === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeTab);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <main className="pt-20 md:pt-24 bg-[#0a0a0a] min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-heading font-semibold text-white mb-4"
          >
            Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Browse through our portfolio of meticulously managed premium events.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-4 text-sm uppercase tracking-widest font-medium transition-all duration-300 border flex items-center justify-center min-h-[48px]",
                activeTab === cat 
                  ? "border-[#c9a84c] bg-[#c9a84c] text-[#111111]" 
                  : "border-white/10 text-gray-400 hover:border-[#c9a84c]/50 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <div className="mb-24 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            <Masonry
              breakpointCols={{
                default: 3,
                1100: 3,
                768: 2,
                500: 1
              }}
              className="flex -ml-4 w-auto"
              columnClassName="pl-4 bg-clip-padding"
            >
              {filteredImages.map((image, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={`${image.src}-${idx}-${activeTab}`}
                  className="mb-4 relative group cursor-pointer overflow-hidden rounded-sm bg-[#111111]"
                  onClick={() => openLightbox(idx)}
                >
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <span className="text-white text-sm tracking-widest uppercase border border-white/30 px-4 py-2 bg-black/40 backdrop-blur-sm">View</span>
                  </div>
                  <Image 
                    src={image.src} 
                    alt={image.category}
                    width={800}
                    height={800}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" 
                  />
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
        slides={filteredImages.map(img => ({ src: img.src }))}
      />
    </main>
  );
}
