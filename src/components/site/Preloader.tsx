import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader() {
  const [stage, setStage] = useState<
    "dropTrendtide" | "dropConnect" | "glow" | "reveal" | "moveNav" | "done"
  >("dropTrendtide");

  useEffect(() => {
    // Stage 1: Drop TRENDTIDE (200ms) - already initial state

    // Stage 2: Drop CONNECT (1000ms)
    const timer1 = setTimeout(() => {
      setStage("dropConnect");
    }, 1000);

    // Stage 3: Glowing gradient & scale up (1900ms)
    const timer2 = setTimeout(() => {
      setStage("glow");
    }, 1900);

    // Stage 4: Background blurs & Homepage starts revealing (2800ms)
    const timer3 = setTimeout(() => {
      setStage("reveal");
    }, 2800);

    // Stage 5: Logo smoothly moves into navbar area (3600ms)
    const timer4 = setTimeout(() => {
      setStage("moveNav");
    }, 3600);

    // Stage 6: Unmount preloader (4400ms)
    const timer5 = setTimeout(() => {
      setStage("done");
    }, 4400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  if (stage === "done") return null;

  const showConnect = stage !== "dropTrendtide";
  const isGlowing = stage === "glow" || stage === "reveal" || stage === "moveNav";

  return (
    <AnimatePresence>
      <motion.div
        key="preloader-overlay"
        initial={{ opacity: 1 }}
        animate={{
          opacity: stage === "moveNav" ? 0 : 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-all duration-1000 ${
          stage === "reveal" || stage === "moveNav"
            ? "bg-black/60 backdrop-blur-xl"
            : "bg-[#050505]"
        }`}
      >
        {/* Glow backdrop sphere */}
        <motion.div
          animate={{
            scale: isGlowing ? [1, 1.3, 1.1] : 0.8,
            opacity: isGlowing ? 0.7 : 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="pointer-events-none absolute h-72 w-72 rounded-full bg-blue-600/40 blur-[110px]"
        />

        {/* Outer Moving Container */}
        <motion.div
          animate={{
            y: stage === "moveNav" ? "-42vh" : 0,
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
            y: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.7, ease: "easeOut" },
            opacity: { duration: 0.7 },
          }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-4"
        >
          {/* Logo icon */}
          <motion.div
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 14,
              mass: 1.1,
            }}
            className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-[0_0_40px_rgba(59,130,246,0.5)]"
          >
            <img
              src="/logo.png"
              alt="TrendTide Connect"
              className="h-10 w-10 object-contain"
            />
          </motion.div>

          {/* Word 1: TRENDTIDE Drops First */}
          <motion.div
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 14,
              mass: 1.1,
              delay: 0.1,
            }}
          >
            <span
              className={`font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight block transition-all duration-700 ${
                isGlowing
                  ? "bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(59,130,246,0.4)]"
                  : "text-white"
              }`}
            >
              TRENDTIDE
            </span>
          </motion.div>

          {/* Word 2: CONNECT Drops Second */}
          {showConnect && (
            <motion.div
              initial={{ y: "-100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 85,
                damping: 13,
                mass: 1.1,
              }}
              className="mt-1 sm:mt-2"
            >
              <span
                className={`font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight block transition-all duration-700 ${
                  isGlowing
                    ? "bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(59,130,246,0.4)]"
                    : "text-white"
                }`}
              >
                CONNECT
              </span>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
