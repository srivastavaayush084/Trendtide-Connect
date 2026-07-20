import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  TrendingUp,
  Users,
  BadgeCheck,
  Sparkles,
  Zap,
  Instagram,
  Youtube,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-12 lg:py-20">
      <div className="hero-deco-1" aria-hidden />
      <div className="hero-deco-2" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Headline & Action */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              India's fastest{" "}
              <span className="text-gradient">influencer marketing</span> platform
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground">
              Connect with verified creators across Instagram, YouTube, Facebook
              and Snapchat. Launch high-performing campaigns in minutes — not
              weeks.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white shadow-lg hover:from-blue-800 hover:to-purple-900 text-base px-8 h-12 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Link to="/start-campaign">
                  Start Campaign <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2 font-medium">
                <BadgeCheck className="h-4 w-4 text-primary" /> 35,000+ verified creators
              </span>
              <span className="flex items-center gap-2 font-medium">
                <TrendingUp className="h-4 w-4 text-secondary" /> 100M+ reach generated
              </span>
              <span className="flex items-center gap-2 font-medium">
                <Users className="h-4 w-4 text-accent" /> 100+ brand partners
              </span>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Interactive AI Visual Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:col-span-5 flex justify-center"
          >
            {/* Ambient Radiant Glow Sphere */}
            <div className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-purple-600/30 blur-[70px]" />

            {/* Main Interactive Dashboard Card */}
            <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-card/60 p-6 backdrop-blur-xl shadow-2xl">
              
              {/* Header Status */}
              <div className="flex items-center justify-between border-b border-border/50 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live Campaign Engine
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary border border-primary/20">
                  <Zap className="h-3 w-3" /> AI Active
                </span>
              </div>

              {/* Campaign Analytics Chart Visual */}
              <div className="mt-5 rounded-2xl bg-muted/40 p-4 border border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Campaign Reach</p>
                    <p className="text-2xl font-bold font-display text-foreground">5,842,190</p>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold bg-emerald-500/10 px-2 py-1 rounded-md">
                    <TrendingUp className="h-3.5 w-3.5" /> +42.8%
                  </div>
                </div>

                {/* Animated Bars */}
                <div className="flex items-end gap-2 h-20 pt-4 px-1">
                  {[40, 65, 45, 90, 75, 100, 85, 95].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: "0%" }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        duration: 1,
                        delay: 0.3 + i * 0.1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 2,
                      }}
                      className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-indigo-400 opacity-90 hover:opacity-100 transition-opacity"
                    />
                  ))}
                </div>
              </div>

              {/* Creator Matching Quick Bar */}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-card p-3 border border-border/60">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Creator Matching</p>
                    <p className="text-[11px] text-muted-foreground">10,000+ Profiles Scanned</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400">Instant Match</span>
              </div>

              {/* Floating Badge 1: Ananya K. Creator Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 rounded-2xl border border-white/15 bg-card/90 p-3 shadow-xl backdrop-blur-md"
              >
                <div className="relative">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-pink-500 to-orange-400 text-xs font-bold text-white shadow-md">
                    AK
                  </div>
                  <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-card p-0.5 text-pink-500">
                    <Instagram className="h-3 w-3" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold">Ananya K.</span>
                    <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">428K Followers • Fashion</span>
                </div>
              </motion.div>

              {/* Floating Badge 2: AI Match Rating Badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-2.5 rounded-2xl border border-primary/30 bg-card/95 px-4 py-3 shadow-glow backdrop-blur-md"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/20 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">99.4% Match Score</p>
                  <p className="text-[10px] text-muted-foreground">High Engagement Fit</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
