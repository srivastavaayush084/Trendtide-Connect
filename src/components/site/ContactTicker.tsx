import { motion } from "motion/react";

export default function ContactTicker() {
  return (
    <section className="relative bg-[#050505] pt-12 pb-6 text-center px-4 overflow-hidden border-b border-white/5">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-3/4 max-w-4xl bg-blue-600/10 blur-[90px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(59,130,246,0.3)]">
          TrendTide Connect
        </h1>
      </motion.div>
    </section>
  );
}
