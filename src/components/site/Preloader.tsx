import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader() {
  const [stage, setStage] = useState<"drop" | "glow" | "reveal" | "moveNav" | "done">("drop");

  useEffect(() => {
    // Stage 1: Drop & Soft Bounce (0ms - 700ms)
    const timer1 = setTimeout(() => {
      setStage("glow");
    }, 700);

    // Stage 2: Scale up slightly & Glowing gradient appears (700ms - 1300ms)
    const timer2 = setTimeout(() => {
      setStage("reveal");
    }, 1300);

    // Stage 3: Background blurs, homepage becomes visible (1300ms - 1900ms)
    const timer3 = setTimeout(() => {
      setStage("moveNav");
    }, 1900);

    // Stage 4: Logo moves smoothly into navbar position & finishes fade (1900ms - 2600ms)
    const timer4 = setTimeout(() => {
      setStage("done");
    }, 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  if (stage === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="preloader-overlay"
        initial={{ opacity: 1 }}
        animate={{
          opacity: stage === "moveNav" ? 0 : 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-colors duration-700 ${
          stage === "reveal" || stage === "moveNav"
            ? "bg-black/60 backdrop-blur-md"
            : "bg-[#050505]"
        }`}
      >
        {/* Glow backdrop sphere */}
        <motion.div
          animate={{
            scale: stage === "glow" || stage === "reveal" ? [1, 1.4, 1.2] : 0.8,
            opacity: stage === "glow" || stage === "reveal" ? 0.6 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-none absolute h-64 w-64 rounded-full bg-blue-600/40 blur-[100px]"
        />

        {/* Animated Brand Logo Container */}
        <motion.div
          initial={{ y: "-100vh", scale: 0.8, opacity: 0 }}
          animate={{
            y:
              stage === "drop"
                ? 0
                : stage === "moveNav"
                ? "-42vh"
                : 0,
            x: stage === "moveNav" ? "-35vw" : 0,
            scale:
              stage === "glow"
                ? 1.08
                : stage === "reveal"
                ? 1.05
                : stage === "moveNav"
                ? 0.45
                : 1,
            opacity: stage === "moveNav" ? 0 : 1,
          }}
          transition={{
            y:
              stage === "drop"
                ? { type: "spring", stiffness: 110, damping: 12, mass: 1 }
                : { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.5, ease: "easeOut" },
            opacity: { duration: 0.5 },
          }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-4"
        >
          {/* Logo icon */}
          <motion.div
            animate={{
              rotate: stage === "glow" ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
            className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-[0_0_40px_rgba(59,130,246,0.5)]"
          >
            <img
              src="/logo.png"
              alt="TrendTide Connect"
              className="h-10 w-10 object-contain"
            />
          </motion.div>

          {/* Logo text */}
          <h1
            className={`font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight transition-all duration-500 ${
              stage === "glow" || stage === "reveal" || stage === "moveNav"
                ? "bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(59,130,246,0.4)]"
                : "text-white"
            }`}
          >
            TRENDTIDE
            <br />
            CONNECT
          </h1>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
