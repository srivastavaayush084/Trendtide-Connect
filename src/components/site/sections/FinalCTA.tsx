import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10"
      >
        {/* Banner Artwork Image */}
        <img
          src="/images/banner.png"
          alt="Launch your influencer campaign today"
          className="w-full h-auto object-cover rounded-[2.5rem]"
        />

        {/* Start Campaign Button Overlaid on the Image */}
        <Link
          to="/start-campaign"
          className="absolute right-[8%] sm:right-[14%] md:right-[18%] bottom-[12%] sm:bottom-[16%] md:bottom-[20%] z-20 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#312e81] to-[#4c1d95] hover:from-[#172554] hover:to-[#2e1065] text-white border border-white/20 px-5 sm:px-8 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Start campaign <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Link>
      </motion.div>
    </section>
  );
}
