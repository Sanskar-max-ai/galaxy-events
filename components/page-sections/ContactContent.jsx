"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaCheckCircle, FaChevronDown } from "react-icons/fa";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // 'idle' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Accessing the Google Apps Script URL via Environment Variables for security
      const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      if (!GOOGLE_SCRIPT_URL) {
        console.error("Google Script URL is not defined in Environment Variables.");
        setSubmitStatus("error");
        setIsSubmitting(false);
        return;
      }
      
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for many Google Sheets scripts without explicit CORS set
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Since mode is no-cors, res.ok is not strictly reliable, but typically it doesn't throw if network succeeds
      setSubmitStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        eventDate: "",
        message: ""
      });
    } catch (error) {
      console.error("Form Submission Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20 md:pt-24 min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-[#c9a84c] text-sm tracking-[0.2em] uppercase mb-4 font-semibold">Get in Touch</h1>
          <h2 className="text-4xl md:text-6xl font-heading font-semibold text-white">Let's Plan Your Day</h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 max-w-6xl mx-auto">
          
          {/* Contact Info Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/3 bg-[#111111] p-8 border border-white/5 rounded-sm h-fit"
          >
            <h3 className="text-2xl font-heading text-white mb-8 border-b border-white/10 pb-4">Contact Details</h3>
            
            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#c9a84c] mr-4 group-hover:bg-[#c9a84c] group-hover:text-[#111111] transition-colors shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Office Location</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Hoshangabad (Narmadapuram)<br />
                    Madhya Pradesh, India<br />
                    461001
                  </p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#c9a84c] mr-4 group-hover:bg-[#c9a84c] group-hover:text-[#111111] transition-colors shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Phone</h4>
                  <a href="tel:+910000000000" className="text-gray-400 hover:text-white text-sm transition-colors">
                    +91 00000 00000
                  </a>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#c9a84c] mr-4 group-hover:bg-[#c9a84c] group-hover:text-[#111111] transition-colors shrink-0">
                  <FaWhatsapp className="text-lg" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">WhatsApp</h4>
                  <a href="https://wa.me/910000000000" target="_blank" rel="noreferrer" className="text-[#c9a84c] hover:text-[#dac175] text-sm transition-colors block">
                    Chat with an expert
                  </a>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#c9a84c] mr-4 group-hover:bg-[#c9a84c] group-hover:text-[#111111] transition-colors shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email directly</h4>
                  <a href="mailto:booking@galaxyevents.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                    booking@galaxyevents.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="lg:w-2/3"
          >
            {submitStatus === "success" ? (
              <div className="bg-[#111111] border border-[#c9a84c]/30 text-white p-12 text-center rounded-sm h-full flex flex-col items-center justify-center">
                <FaCheckCircle className="text-[#c9a84c] text-6xl mb-6" />
                <h3 className="text-3xl font-heading mb-4">Request Received</h3>
                <p className="text-gray-400">
                  Thank you for reaching out! One of our expert event planners will be in touch with you shortly to discuss your upcoming event.
                </p>
                <button 
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-8 border border-[#c9a84c] text-[#c9a84c] px-6 min-h-[48px] w-full md:w-auto uppercase tracking-widest text-sm hover:bg-[#c9a84c] hover:text-[#111111] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-gray-400 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#111111] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors rounded-sm"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm text-gray-400 uppercase tracking-wider">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#111111] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors rounded-sm"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-400 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#111111] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors rounded-sm"
                      placeholder="johndoe@email.com"
                    />
                  </div>

                  {/* Event Date */}
                  <div className="space-y-2">
                    <label htmlFor="eventDate" className="text-sm text-gray-400 uppercase tracking-wider">Event Date</label>
                    <input 
                      type="date" 
                      id="eventDate"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full bg-[#111111] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors rounded-sm"
                      style={{ colorScheme: "dark" }}
                    />
                  </div>
                </div>

                {/* Event Type */}
                <div className="space-y-2">
                  <label htmlFor="eventType" className="text-sm text-gray-400 uppercase tracking-wider">Event Type</label>
                  <div className="relative">
                    <select 
                      id="eventType"
                      name="eventType"
                      required
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full bg-[#111111] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors rounded-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select an event type</option>
                      <option value="Wedding">Premium Wedding</option>
                      <option value="Ring Ceremony">Ring Ceremony</option>
                      <option value="Naamkaran">Welcome / Naamkaran</option>
                      <option value="Birthday">Birthday Celebration</option>
                      <option value="SFX">Stage SFX & Pyrotechnics</option>
                      <option value="Decor">Decor & Tent Setup</option>
                      <option value="Other">Other / Custom</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#c9a84c]">
                      <FaChevronDown size={14} />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm text-gray-400 uppercase tracking-wider">Additional Details</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#111111] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors rounded-sm resize-none"
                    placeholder="Tell us a little bit about what you have in mind..."
                  ></textarea>
                </div>

                {submitStatus === "error" && (
                  <p className="text-red-500 text-sm">Failed to submit the form. Please try again later or contact us directly.</p>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#c9a84c] hover:bg-[#dac175] text-[#111111] disabled:bg-gray-600 disabled:cursor-not-allowed font-semibold uppercase tracking-widest min-h-[48px] py-4 rounded-sm transition-colors text-sm"
                >
                  {isSubmitting ? "Sending Request..." : "Submit Booking Inquiry"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
