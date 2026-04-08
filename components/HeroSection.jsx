"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen md:h-[100svh] w-full flex items-center justify-center overflow-hidden pt-[56px] md:pt-0">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full bg-[#111111]">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/photos/wedding-stage.jfif"
          className="absolute inset-0 w-full h-full object-cover opacity-50 block"
        >
          <source src="/videos/hero-main.mp4" type="video/mp4" />
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
          Welcome to Galaxy Events
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-semibold text-white leading-[1.2] md:leading-tight mb-8 px-2 w-full"
        >
          Where Every Moment <br /> Becomes a <span className="text-gold-gradient italic">Memory</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full md:w-auto"
        >
          <Link
            href="/services"
            className="shimmer-bg relative flex items-center justify-center px-10 py-4 min-h-[48px] font-bold text-[#111111] bg-[#c9a84c] rounded-sm transition-all duration-500 hover:bg-[#dac175] hover:-translate-y-1 shadow-[0_10px_30px_rgba(201,168,76,0.3)] group w-full md:w-auto"
          >
            <span className="mr-3 tracking-[0.2em] uppercase text-xs md:text-sm">Explore Our Work</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#c9a84c] to-transparent" />
      </motion.div>
    </section>
  );
}
