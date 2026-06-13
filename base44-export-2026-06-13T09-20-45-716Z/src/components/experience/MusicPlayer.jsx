const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer({ started }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  }, [playing]);

  useEffect(() => {
    if (started && audioRef.current && !playing) {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [started]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onEnd = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const seekTo = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (audioRef.current) {
      audioRef.current.currentTime = pct * audioRef.current.duration;
    }
  };

  const changeVolume = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const v = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    if (v > 0 && muted) setMuted(false);
  };

  const toggleMute = () => {
    setMuted(!muted);
    if (audioRef.current) audioRef.current.muted = !muted;
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <audio ref={audioRef} src="https://media.db.com/files/public/6a2d1b04cd7ebfcdc9bf07a6/e8e344ce4_ytmp3freecc_dimensions-youtubemp3freeorg.mp3" preload="metadata" loop />

      <AnimatePresence>
        {started && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div
              onClick={() => setExpanded(!expanded)}
              className="cursor-pointer rounded-2xl border border-white/[0.08] p-4 backdrop-blur-xl shadow-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(15,15,25,0.85) 0%, rgba(10,10,18,0.92) 100%)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, hsl(38, 75%, 55%) 0%, hsl(28, 70%, 45%) 100%)",
                  }}
                >
                  {playing ? (
                    <Pause className="w-4 h-4 text-black" fill="black" />
                  ) : (
                    <Play className="w-4 h-4 text-black ml-0.5" fill="black" />
                  )}
                </button>

                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-body font-medium text-white/90 truncate">
                    Dimensions
                  </span>
                  <span className="text-[10px] text-white/40 font-body">
                    {playing ? "Reproduzindo" : "Pausado"}
                  </span>
                </div>

                {playing && (
                  <div className="flex items-end gap-[2px] ml-2">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="w-[3px] rounded-full"
                        style={{ background: "hsl(38, 75%, 55%)" }}
                        animate={{ height: [4, 12 + i * 2, 6, 14, 4] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="pt-3 mt-3 border-t border-white/[0.06] space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40 font-mono w-8">{fmt(currentTime)}</span>
                        <div className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer group relative" onClick={seekTo}>
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${progress}%`,
                              background: "linear-gradient(90deg, hsl(38, 75%, 55%), hsl(28, 70%, 50%))",
                            }}
                          />
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                              left: `${progress}%`,
                              transform: `translate(-50%, -50%)`,
                              background: "hsl(38, 75%, 55%)",
                              boxShadow: "0 0 8px hsla(38, 75%, 55%, 0.5)",
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-white/40 font-mono w-8 text-right">{fmt(duration)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={toggleMute} className="text-white/50 hover:text-white/80 transition-colors">
                          {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                        <div className="w-20 h-1 bg-white/10 rounded-full cursor-pointer" onClick={changeVolume}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${muted ? 0 : volume * 100}%`,
                              background: "linear-gradient(90deg, hsl(38, 75%, 55%), hsl(28, 70%, 50%))",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}