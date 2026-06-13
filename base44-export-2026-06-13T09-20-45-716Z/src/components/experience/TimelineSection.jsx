import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const moments = [
  {
    title: "O primeiro olhar",
    text: "Há momentos que passam e outros que ficam gravados. O primeiro contato com a sua presença foi um desses.",
    date: "O começo",
  },
  {
    title: "As conversas",
    text: "Cada conversa revelava algo novo — uma camada, uma profundidade que poucos demonstram ter.",
    date: "Descobertas",
  },
  {
    title: "Os risos",
    text: "Momentos leves que ficaram pesados de tão marcantes. Risos sinceros que mudam o tom de um dia inteiro.",
    date: "Leveza",
  },
  {
    title: "Os silêncios",
    text: "Nem tudo precisa de palavras. Alguns dos melhores momentos foram feitos de silêncios confortáveis.",
    date: "Conexão",
  },
  {
    title: "A admiração",
    text: "Com o tempo, a admiração não diminuiu — só se transformou em algo mais profundo e mais verdadeiro.",
    date: "Presente",
  },
];

function TimelineItem({ moment, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-16 gap-6`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} text-left`}>
        <span className="text-xs font-body tracking-[0.2em] uppercase text-primary/50 mb-2 block">
          {moment.date}
        </span>
        <h3 className="font-heading text-2xl md:text-3xl font-medium text-white/90 mb-3">
          {moment.title}
        </h3>
        <p className="text-sm text-white/35 font-body font-light leading-relaxed max-w-md inline-block">
          {moment.text}
        </p>
      </div>

      {/* Center dot */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          animate={isInView ? { scale: [0, 1.2, 1] } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-4 h-4 rounded-full border-2"
          style={{
            borderColor: "hsl(38, 75%, 55%)",
            background: "hsl(220, 20%, 4%)",
            boxShadow: "0 0 20px hsla(38, 75%, 55%, 0.3)",
          }}
        />
      </div>

      {/* Empty space for alignment */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase text-primary/60 mb-4 block">
            Uma trajetória
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-white/90 mb-6">
            Momentos & Lembranças
          </h2>
          <div
            className="w-20 h-[1px] mx-auto"
            style={{ background: "linear-gradient(90deg, transparent, hsl(38, 75%, 55%, 0.5), transparent)" }}
          />
        </motion.div>

        {/* Timeline line */}
        <div className="relative">
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] hidden md:block"
            style={{
              background: "linear-gradient(to bottom, transparent, hsla(38, 75%, 55%, 0.15) 10%, hsla(38, 75%, 55%, 0.15) 90%, transparent)",
            }}
          />

          <div className="space-y-20 md:space-y-24">
            {moments.map((m, i) => (
              <TimelineItem key={i} moment={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}