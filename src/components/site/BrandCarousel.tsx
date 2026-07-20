import { motion } from "motion/react";

const logos = [
  "/logos/logo1.png",
  "/logos/logo2.png",
  "/logos/logo3.png",
  "/logos/logo4.png",
  "/logos/logo5.png",
  "/logos/logo6.jpg",
  "/logos/logo7.jpg",
  "/logos/logo8.png",
  "/logos/logo9.jpg",
  "/logos/logo10.jpg",
  "/logos/logo11.png",
  "/logos/logo12.png",
  "/logos/logo13.jpg",
  "/logos/logo14.jpg",
  "/logos/logo15.jpg",
  "/logos/logo16.png",
];

export default function BrandCarousel() {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-20 bg-[#050505] overflow-hidden">
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
          <span className="text-blue-600">50+ Brand's Worked</span>
          <br />
          With Trendtide-connect
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 sm:w-48 bg-gradient-to-r from-[#050505] to-transparent" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 sm:w-48 bg-gradient-to-l from-[#050505] to-transparent" />

        <div className="flex w-full overflow-hidden">
          <motion.div
            className="flex min-w-full shrink-0 gap-6 items-center pr-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="min-w-[240px] h-[140px] bg-[#0b0b0b] rounded-full overflow-hidden shrink-0 hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={logo}
                  alt={`Brand logo ${(index % logos.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
