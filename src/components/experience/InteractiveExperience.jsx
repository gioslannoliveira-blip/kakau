import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const messages = [
  "Nem sempre percebemos o impacto que causamos nas pessoas.",
  "Mas algumas pessoas deixam marcas sem sequer tentar.",
  "Você é uma delas.",
  "Obrigado por ser exatamente quem você é.",
  "Independentemente do caminho que a vida escolher,\nvocê continuará sendo uma pessoa\nextremamente especial.",
];

function CinematicMessage({ text, index, total }) {
  const isFinal = index === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      exit={{ opacity: 0, filter: "blur(8px)", y: -20 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex items-center justify-center px-8"
    >
      <div className="text-center max-w-2xl">
        <p
          className={`font-display leading-relaxed whitespace-pre-line ${
            isFinal
              ? "text-2xl md:text-4xl font-medium"
              : "text-xl md:text-3xl font-light"
          }`}
          style={{
            color: isFinal ? "hsla(38, 80%, 65%, 0.9)" : "hsla(40, 20%, 85%, 0.7)",
            textShadow: isFinal
              ? "0 0 40px hsla(38, 70%, 55%, 0.2)"
              : "0 0 30px hsla(0, 0%, 100%, 0.05)",
          }}
        >
          {text}
        </p>

        {isFinal && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="w-16 h-[1px] mx-auto mt-8"
            style={{ background: "linear-gradient(90deg, transparent, hsl(38, 75%, 55%, 0.5), transparent)" }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function InteractiveExperience() {
  const [active, setActive] = useState(false);
  const [currentMsg, setCurrentMsg] = useState(0);
  const [finished, setFinished] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const startExperience = () => {
    setActive(true);
    setCurrentMsg(0);
    setFinished(false);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= messages.length) {
        clearInterval(interval);
        setTimeout(() => setFinished(true), 5000);
        return;
      }
      setCurrentMsg(i);
    }, 4000);
  };

  const closeExperience = () => {
    setActive(false);
    setFinished(false);
    setCurrentMsg(0);
  };

  return (
    <>
      <section className="relative py-32 px-6" ref={ref}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary/60 mb-4 block">
              Experiência
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-white/90 mb-6">
              Algo especial
            </h2>
            <div
              className="w-20 h-[1px] mx-auto mb-10"
              style={{ background: "linear-gradient(90deg, transparent, hsl(38, 75%, 55%, 0.5), transparent)" }}
            />
            <p className="text-white/30 font-body font-light text-sm md:text-base mb-12 max-w-md mx-auto">
              Reserve um momento. Respire fundo. E permita-se sentir.
            </p>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={startExperience}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl overflow-hidden transition-all duration-500"
            >
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, hsla(38, 75%, 55%, 0.15) 0%, hsla(28, 70%, 45%, 0.1) 100%)",
                  border: "1px solid hsla(38, 75%, 55%, 0.15)",
                }}
              />
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, hsla(38, 75%, 55%, 0.25) 0%, hsla(28, 70%, 45%, 0.15) 100%)",
                  border: "1px solid hsla(38, 75%, 55%, 0.25)",
                }}
              />
              <Sparkles className="w-5 h-5 text-primary relative z-10" />
              <span className="text-sm font-body font-medium tracking-wider uppercase text-primary relative z-10">
                Quero ver algo especial
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen cinematic overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-[60] flex items-center justify-center"
            style={{ background: "hsl(220, 25%, 3%)" }}
          >
            {/* Ambient orbs */}
            <motion.div
              className="absolute w-[800px] h-[800px] rounded-full"
              style={{
                background: "radial-gradient(circle, hsla(38, 70%, 50%, 0.04) 0%, transparent 60%)",
                top: "10%",
                left: "20%",
              }}
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full"
              style={{
                background: "radial-gradient(circle, hsla(28, 60%, 40%, 0.03) 0%, transparent 60%)",
                bottom: "10%",
                right: "10%",
              }}
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Messages */}
            <AnimatePresence mode="wait">
              <CinematicMessage
                key={currentMsg}
                text={messages[currentMsg]}
                index={currentMsg}
                total={messages.length}
              />
            </AnimatePresence>

            {/* Close button (appears after last message) */}
            <AnimatePresence>
              {finished && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  onClick={closeExperience}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full border border-white/[0.08] text-white/40 text-xs font-body tracking-wider uppercase hover:text-white/60 hover:border-white/15 transition-all duration-500"
                >
                  Voltar
                </motion.button>
              )}
            </AnimatePresence>

            {/* Progress dots */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
              {messages.map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  animate={{
                    background: i === currentMsg
                      ? "hsl(38, 75%, 55%)"
                      : i < currentMsg
                      ? "hsla(38, 75%, 55%, 0.3)"
                      : "hsla(0, 0%, 100%, 0.1)",
                    scale: i === currentMsg ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}