import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const placeholders = [
  { id: 1, label: "Foto 1", aspect: "aspect-square" },
  { id: 2, label: "Foto 2", aspect: "aspect-[4/5]" },
  { id: 3, label: "Foto 3", aspect: "aspect-square" },
  { id: 4, label: "Foto 4", aspect: "aspect-[4/5]" },
  { id: 5, label: "Foto 5", aspect: "aspect-square" },
  { id: 6, label: "Foto 6", aspect: "aspect-[4/5]" },
];

function GalleryItem({ item, index, onSelect }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${item.aspect}`}
      onClick={() => onSelect(item)}
    >
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `linear-gradient(135deg, hsla(220, 15%, ${12 + index * 2}%, 1) 0%, hsla(220, 15%, ${8 + index}%, 1) 100%)`,
        }}
      />

      {/* Placeholder content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center border border-white/[0.06]"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <ZoomIn className="w-6 h-6 text-white/20 group-hover:text-primary/60 transition-colors duration-500" />
        </div>
        <span className="text-xs font-body text-white/20 tracking-wider uppercase">
          {item.label}
        </span>
        <span className="text-[10px] font-body text-white/10">
          Adicione sua foto aqui
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "radial-gradient(circle at top right, hsla(38, 70%, 55%, 0.1) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState(null);

  return (
    <section className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase text-primary/60 mb-4 block">
            Registros
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-white/90 mb-6">
            Galeria
          </h2>
          <div
            className="w-20 h-[1px] mx-auto"
            style={{ background: "linear-gradient(90deg, transparent, hsl(38, 75%, 55%, 0.5), transparent)" }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {placeholders.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} onSelect={setSelected} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center text-xs text-white/20 font-body mt-8"
        >
          Substitua os placeholders pelas suas fotos favoritas
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 cursor-pointer"
            style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-3xl w-full aspect-square rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, hsl(220, 15%, 14%) 0%, hsl(220, 15%, 10%) 100%)` }}
              >
                <span className="text-white/20 font-body text-sm">{selected.label}</span>
              </div>
            </motion.div>

            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}