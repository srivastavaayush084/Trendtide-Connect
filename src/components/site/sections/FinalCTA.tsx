import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2.5rem] shadow-2xl min-h-[420px] sm:min-h-[460px] flex items-center border border-white/10"
      >
        {/* Creator Studio Artwork Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/final-cta-banner.jpg"
            alt="Creator Studio"
            className="h-full w-full object-cover object-left"
          />
        </div>

        {/* Gradient Mask Transitioning into Vibrant Purple/Cyan Card */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-[#581c87]/90 to-[#0284c7] sm:bg-gradient-to-r" />

        {/* Dark Mobile Backdrop */}
        <div className="absolute inset-0 z-10 bg-black/40 sm:bg-transparent" />

        {/* Content Container (Right Aligned matching Reference Layout) */}
        <div className="relative z-20 w-full p-8 sm:p-12 lg:p-16 flex flex-col items-center lg:items-end text-center lg:text-right">
          <div className="max-w-xl flex flex-col items-center lg:items-end">
            
            {/* Top Pill Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md border border-white/25 shadow-sm mb-6">
              <Sparkles className="h-3.5 w-3.5" /> Launch in under 10 minutes
            </span>

            {/* Headline */}
            <h2 className="font-display text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Launch your influencer campaign today
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/90 font-normal leading-relaxed mb-8 max-w-lg">
              Get matched with verified creators and start driving measurable
              results — no agency overhead.
            </p>

            {/* Dark Start Campaign Button */}
            <div>
              <Link
                to="/start-campaign"
                className="inline-flex items-center gap-2 rounded-full bg-[#0a0f1d] hover:bg-[#030712] text-white border border-white/20 px-8 py-3.5 text-sm font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start campaign <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
