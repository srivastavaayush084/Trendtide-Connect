import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10"
      >
        {/* Exact Original Image Card */}
        <img
          src="/images/final-cta-banner.jpg"
          alt="Launch your influencer campaign today"
          className="w-full h-auto object-cover rounded-[2.5rem]"
        />

        {/* Dark Start Campaign Button overlay right over the original button position */}
        <Link
          to="/start-campaign"
          className="absolute right-[8%] sm:right-[15%] md:right-[19.5%] bottom-[13%] sm:bottom-[15%] md:bottom-[17.5%] z-20 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 hover:from-blue-800 hover:to-purple-900 text-white border border-white/20 px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Start campaign <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Link>
      </motion.div>
    </section>
  );
}
