import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function OpeningScreen({ onStart }) {
  const [exiting, setExiting] = useState(false);

  const handleStart = () => {
    setExiting(true);
    setTimeout(onStart, 1200);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(180deg, hsl(220,20%,3%) 0%, hsl(220,18%,6%) 100%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full"
              style={{
                background: "radial-gradient(circle, hsla(38, 80%, 50%, 0.08) 0%, transparent 70%)",
                top: "20%",
                left: "30%",
              }}
              animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full"
              style={{
                background: "radial-gradient(circle, hsla(28, 70%, 45%, 0.06) 0%, transparent 70%)",
                bottom: "20%",
                right: "20%",
              }}
              animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0], y: [0, 30, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] mb-8"
                style={{ background: "rgba(255,255,255,0.03)" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-body tracking-widest uppercase text-white/40">
                  Uma experiência exclusiva
                </span>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-body tracking-[0.3em] uppercase text-white/30 mb-6"
            >
              feito especialmente para
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight mb-4"
              style={{
                background: "linear-gradient(135deg, hsl(38, 80%, 65%) 0%, hsl(28, 70%, 50%) 50%, hsl(38, 75%, 60%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Kakau
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-[1px] mx-auto mb-8"
              style={{ background: "linear-gradient(90deg, transparent, hsl(38, 75%, 55%), transparent)" }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="text-sm md:text-base text-white/30 font-body font-light max-w-md mx-auto mb-12 leading-relaxed"
            >
              Algumas pessoas simplesmente tornam o mundo mais bonito apenas por existirem.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="group relative px-10 py-4 rounded-full overflow-hidden font-body text-sm tracking-wider uppercase transition-all duration-500"
            >
              <div
                className="absolute inset-0 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, hsl(38, 75%, 55%) 0%, hsl(28, 70%, 45%) 100%)",
                }}
              />
              <div className="absolute inset-[1px] rounded-full bg-[hsl(220,20%,4%)] group-hover:bg-[hsl(220,20%,6%)] transition-colors" />
              <span className="relative z-10 text-primary font-medium">
                Iniciar experiência
              </span>
            </motion.button>
          </div>

          {/* Bottom line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              className="w-[1px] h-8"
              style={{ background: "linear-gradient(to bottom, transparent, hsl(38, 75%, 55%, 0.3))" }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}