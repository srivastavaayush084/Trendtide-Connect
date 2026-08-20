import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader() {
  const [shouldRun, setShouldRun] = useState(false);
  const [stage, setStage] = useState<
    "dropTrendtide" | "dropConnect" | "glow" | "reveal" | "moveNav" | "done"
  >("dropTrendtide");

  useEffect(() => {
    // Only run on first initial visit per browser session
    if (typeof window !== "undefined") {
      const hasSeen = sessionStorage.getItem("hasSeenPreloader");
      if (!hasSeen) {
        setShouldRun(true);
        sessionStorage.setItem("hasSeenPreloader", "true");
      } else {
        setStage("done");
        return;
      }
    }

    // Stage 2: Drop CONNECT (800ms)
    const timer1 = setTimeout(() => setStage("dropConnect"), 800);

    // Stage 3: Glowing gradient & scale up (1600ms)
    const timer2 = setTimeout(() => setStage("glow"), 1600);

    // Stage 4: Background blurs & Homepage starts revealing (2400ms)
    const timer3 = setTimeout(() => setStage("reveal"), 2400);

    // Stage 5: Logo smoothly moves into navbar area (3100ms)
    const timer4 = setTimeout(() => setStage("moveNav"), 3100);

    // Stage 6: Unmount preloader (3800ms)
    const timer5 = setTimeout(() => setStage("done"), 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  if (!shouldRun || stage === "done") return null;

  const showConnect = stage !== "dropTrendtide";
  const isGlowing =
    stage === "glow" || stage === "reveal" || stage === "moveNav";

  return (
    <AnimatePresence>
      <motion.div
        key="preloader-overlay"
        initial={{ opacity: 1 }}
        animate={{
          opacity: stage === "moveNav" ? 0 : 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transform-gpu will-change-transform transition-all duration-700 ${
          stage === "reveal" || stage === "moveNav"
            ? "bg-[#050505]/75 backdrop-blur-md"
            : "bg-[#050505]"
        }`}
      >
        {/* Glow backdrop sphere - GPU Accelerated */}
        <motion.div
          animate={{
            scale: isGlowing ? 1.2 : 0.8,
            opacity: isGlowing ? 0.5 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none absolute h-64 w-64 rounded-full bg-blue-600/30 blur-3xl transform-gpu"
        />

        {/* Outer Moving Container - GPU Composited */}
        <motion.div
          animate={{
            y: stage === "moveNav" ? "-42vh" : 0,
            x: stage === "moveNav" ? "-35vw" : 0,
            scale:
              stage === "glow"
                ? 1.06
                : stage === "reveal"
                  ? 1.03
                  : stage === "moveNav"
                    ? 0.45
                    : 1,
            opacity: stage === "moveNav" ? 0 : 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-4 transform-gpu will-change-transform"
        >
          {/* Logo icon */}
          <motion.div
            initial={{ y: -150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-4 transform-gpu"
          >
            <img
              src="/logo.png"
              alt="TrendTide Connect"
              className="h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]"
            />
          </motion.div>

          {/* Word 1: TRENDTIDE Drops First */}
          <motion.div
            initial={{ y: -180, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.65,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="transform-gpu"
          >
            <span
              className={`font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight block transition-all duration-500 ${
                isGlowing
                  ? "bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]"
                  : "text-white"
              }`}
            >
              TRENDTIDE
            </span>
          </motion.div>

          {/* Word 2: CONNECT Drops Second */}
          {showConnect && (
            <motion.div
              initial={{ y: -180, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-1 sm:mt-2 transform-gpu"
            >
              <span
                className={`font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight block transition-all duration-500 ${
                  isGlowing
                    ? "bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]"
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
