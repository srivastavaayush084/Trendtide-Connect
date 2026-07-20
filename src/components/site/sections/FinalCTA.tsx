import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10 group cursor-pointer"
      >
        <Link to="/start-campaign" className="block relative w-full">
          <img
            src="/images/banner.png"
            alt="Launch your influencer campaign today"
            className="w-full h-auto object-cover rounded-[2.5rem] transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </Link>
      </motion.div>
    </section>
  );
}
