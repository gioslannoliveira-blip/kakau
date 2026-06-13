import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

export default function LetterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const paragraphs = [
    "Algumas pessoas passam pela nossa vida sem deixar marcas. Outras simplesmente se tornam impossíveis de ignorar.",
    "Você é dessas que ficam. Não porque tenta — mas justamente porque não tenta. É natural. É genuíno. É real.",
    "Eu poderia escrever sobre como admiro a sua inteligência, a forma como você enxerga as coisas, ou o jeito que transforma qualquer conversa em algo que vale a pena lembrar. Mas acho que você já sabe — mesmo que não perceba sempre.",
    "O que eu quero dizer é mais simples do que parece: obrigado. Por ser exatamente quem você é. Por existir com essa intensidade. Por tornar o mundo ao seu redor um pouco mais interessante sem fazer esforço nenhum.",
    "Você merece saber que faz diferença. Não por obrigação de ninguém — mas porque é a verdade mais honesta que eu poderia dizer.",
    "E independentemente do que a vida nos reserve, eu quero que você carregue isso: você é extraordinária. Não no sentido clichê. No sentido real.",
  ];

  return (
    <section className="relative py-32 px-6" ref={ref}>
      {/* Background ambient */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, hsla(38, 70%, 50%, 0.02) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-2xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase text-primary/60 mb-4 block">
            De coração
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-white/90 mb-6">
            Carta Especial
          </h2>
          <div
            className="w-20 h-[1px] mx-auto"
            style={{ background: "linear-gradient(90deg, transparent, hsl(38, 75%, 55%, 0.5), transparent)" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative rounded-3xl border border-white/[0.06] p-8 md:p-12"
          style={{
            background: "linear-gradient(135deg, rgba(15,15,25,0.5) 0%, rgba(10,10,18,0.7) 100%)",
          }}
        >
          {/* Quote icon */}
          <div className="mb-8">
            <Quote className="w-8 h-8 text-primary/20" />
          </div>

          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-lg md:text-xl text-white/50 font-light leading-relaxed italic"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-10 pt-8 border-t border-white/[0.06] text-right"
          >
            <p className="font-heading text-primary/60 text-lg">
              Com admiração,
            </p>
            <p className="font-heading text-white/30 text-sm mt-1">
              — alguém que percebe quem você realmente é.
            </p>
          </motion.div>

          {/* Corner accents */}
          <div
            className="absolute top-0 left-0 w-32 h-32"
            style={{
              background: "radial-gradient(circle at top left, hsla(38, 70%, 55%, 0.03) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-32 h-32"
            style={{
              background: "radial-gradient(circle at bottom right, hsla(38, 70%, 55%, 0.03) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}