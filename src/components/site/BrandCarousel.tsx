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
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="text-center mb-12 px-4">
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
          <span className="text-gradient">50+ Brands Worked</span>
          <br />
          With TrendTide Connect
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
          Trusted by leading consumer brands, startups, and high-growth companies.
        </p>
      </div>

      <div className="relative w-full overflow-hidden py-4">
        {/* Left Edge Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 sm:w-48 bg-gradient-to-r from-background to-transparent" />

        {/* Right Edge Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 sm:w-48 bg-gradient-to-l from-background to-transparent" />

        {/* Infinite Moving Marquee Track */}
        <div className="flex w-full overflow-hidden">
          <motion.div
            className="flex min-w-full shrink-0 gap-6 sm:gap-8 items-center pr-6 sm:pr-8"
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
                className="group relative flex h-24 w-48 sm:h-28 sm:w-56 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-glow hover:-translate-y-1"
              >
                <img
                  src={logo}
                  alt={`Brand logo ${(index % logos.length) + 1}`}
                  className="max-h-full max-w-full object-contain filter brightness-90 contrast-125 transition-all duration-300 group-hover:scale-105 group-hover:brightness-100"
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
