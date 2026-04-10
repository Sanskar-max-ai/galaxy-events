"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function HeroSection({ videoUrl, headline, subtext }) {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen md:h-[100svh] w-full flex items-center justify-center overflow-hidden pt-[56px] md:pt-0">
      {/* Background Video Container with Instant CSS Fallback */}
      <div 
        className="absolute inset-0 w-full h-full bg-[#111111] bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: 'url(/photos/wedding-stage.jpg)' }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/photos/wedding-stage.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-50 block"
        >
          <source src={videoUrl || "/videos/hero-main.mp4"} type="video/mp4" />
        </video>
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-[20px] max-w-4xl mx-auto flex flex-col items-center w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#c9a84c] text-xs md:text-base tracking-[0.3em] uppercase mb-4"
        >
          {subtext || "Welcome to Galaxy Events"}
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-semibold text-white leading-[1.2] md:leading-tight mb-8 px-2 w-full"
        >
          {headline || "Where Every Moment Becomes a Memory"}
        </motion.h1>
      </div>
    </section>
  );
}
