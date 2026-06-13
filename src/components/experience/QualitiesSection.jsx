import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Heart,
  Sparkles,
  Eye,
  MessageCircle,
  Fingerprint,
  Brain,
} from "lucide-react";

const qualities = [
  {
    icon: Fingerprint,
    title: "Autenticidade",
    text: "Você não tenta ser outra pessoa. Essa coragem silenciosa de ser quem é, sem pedir permissão, é uma das coisas mais bonitas que existem.",
  },
  {
    icon: MessageCircle,
    title: "Seu jeito de falar",
    text: "Cada palavra tem peso. Você não fala por falar — quando diz algo, faz sentido, provoca reflexão, e fica na memória de quem escuta.",
  },
  {
    icon: Heart,
    title: "Sua personalidade",
    text: "Uma mistura rara de força e sensibilidade. Você carrega uma intensidade genuína que pouquíssimas pessoas conseguem ter.",
  },
  {
    icon: Brain,
    title: "Sua inteligência",
    text: "Não só em conhecimento — mas na maneira como conecta ideias, enxerga padrões e entende as coisas de um jeito único.",
  },
  {
    icon: Eye,
    title: "Sua visão de mundo",
    text: "Você olha para o mundo com uma profundidade que a maioria das pessoas nem percebe que existe. Isso muda quem está ao seu redor.",
  },
  {
    icon: Sparkles,
    title: "Sua presença",
    text: "Algumas pessoas entram em um ambiente e nada muda. Você entra, e algo se transforma — sem esforço, sem intenção.",
  },
];

function QualityCard({ quality, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = quality.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div
        className="relative rounded-2xl border border-white/[0.06] p-8 h-full transition-all duration-500 group-hover:border-white/[0.12] overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(15,15,25,0.6) 0%, rgba(10,10,18,0.8) 100%)",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "radial-gradient(circle at 50% 0%, hsla(38, 70%, 55%, 0.05) 0%, transparent 60%)",
          }}
        />

        {/* Top light line */}
        <div
          className="absolute top-0 left-[20%] right-[20%] h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "linear-gradient(90deg, transparent, hsla(38, 70%, 55%, 0.3), transparent)",
          }}
        />

        <div className="relative z-10">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, hsla(38, 70%, 55%, 0.1) 0%, hsla(38, 70%, 55%, 0.05) 100%)",
              border: "1px solid hsla(38, 70%, 55%, 0.1)",
            }}
          >
            <Icon className="w-5 h-5 text-primary" />
          </div>

          <h3 className="font-heading text-xl font-medium text-white/90 mb-3">
            {quality.title}
          </h3>

          <p className="text-sm text-white/40 font-body font-light leading-relaxed">
            {quality.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function QualitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase text-primary/60 mb-4 block">
            O que te torna única
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-white/90 mb-6">
            Qualidades que impressionam
          </h2>
          <div
            className="w-20 h-[1px] mx-auto"
            style={{ background: "linear-gradient(90deg, transparent, hsl(38, 75%, 55%, 0.5), transparent)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qualities.map((q, i) => (
            <QualityCard key={i} quality={q} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}