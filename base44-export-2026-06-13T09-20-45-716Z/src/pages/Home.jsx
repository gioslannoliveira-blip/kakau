import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleCanvas from "../components/experience/ParticleCanvas";
import CursorGlow from "../components/experience/CursorGlow";
import MusicPlayer from "../components/experience/MusicPlayer";
import OpeningScreen from "../components/experience/OpeningScreen";
import QualitiesSection from "../components/experience/QualitiesSection";
import TimelineSection from "../components/experience/TimelineSection";
import SupportSection from "../components/experience/SupportSection";
import LetterSection from "../components/experience/LetterSection";
import InteractiveExperience from "../components/experience/InteractiveExperience";
import FooterSection from "../components/experience/FooterSection";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "hsl(220, 20%, 4%)" }}
    >
      <ParticleCanvas intensity={started ? 1.2 : 0.6} />
      <CursorGlow />
      <MusicPlayer started={started} />

      {/* Opening */}
      <AnimatePresence>
        {!started && <OpeningScreen onStart={() => setStarted(true)} />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          >
            {/* Navigation dots */}
            <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3">
              {["Qualidades", "Timeline", "Apoio", "Carta", "Especial"].map((label, i) => (
                <a
                  key={i}
                  href={`#section-${i}`}
                  className="group flex items-center gap-3 justify-end"
                >
                  <span className="text-[10px] font-body tracking-wider uppercase text-white/0 group-hover:text-white/40 transition-all duration-300">
                    {label}
                  </span>
                  <div className="w-2 h-2 rounded-full border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/20 transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Hero spacer */}
            <div className="h-20" />

            <div id="section-0">
              <QualitiesSection />
            </div>

            {/* Divider */}
            <div className="max-w-xs mx-auto">
              <div
                className="h-[1px]"
                style={{
                  background: "linear-gradient(90deg, transparent, hsla(38, 70%, 55%, 0.08), transparent)",
                }}
              />
            </div>

            <div id="section-1">
              <TimelineSection />
            </div>

            <div className="max-w-xs mx-auto">
              <div
                className="h-[1px]"
                style={{
                  background: "linear-gradient(90deg, transparent, hsla(38, 70%, 55%, 0.08), transparent)",
                }}
              />
            </div>

            <div id="section-2">
              <SupportSection />
            </div>

            <div className="max-w-xs mx-auto">
              <div
                className="h-[1px]"
                style={{
                  background: "linear-gradient(90deg, transparent, hsla(38, 70%, 55%, 0.08), transparent)",
                }}
              />
            </div>

            <div id="section-3">
              <LetterSection />
            </div>

            <div className="max-w-xs mx-auto">
              <div
                className="h-[1px]"
                style={{
                  background: "linear-gradient(90deg, transparent, hsla(38, 70%, 55%, 0.08), transparent)",
                }}
              />
            </div>

            <div id="section-4">
              <InteractiveExperience />
            </div>

            <FooterSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}