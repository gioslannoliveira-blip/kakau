import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="relative py-20 px-6">
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsla(38, 70%, 55%, 0.1), transparent)",
        }}
      />

      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Heart className="w-5 h-5 text-primary/30 mx-auto mb-6" />
          <p className="font-display text-lg text-white/25 italic mb-2">
            Feito com admiração e respeito.
          </p>
          <p className="font-body text-xs text-white/15 tracking-wider">
            Uma experiência exclusiva.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}