import { motion } from "motion/react";

export default function ContactTicker() {
  return (
    <div className="relative w-full pt-8 pb-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-left"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(59,130,246,0.3)]">
            TrendTide Connect
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
