import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const springX = useSpring(0, { stiffness: 80, damping: 20 });
  const springY = useSpring(0, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const handler = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const hide = () => setVisible(false);

    window.addEventListener("mousemove", handler);
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseleave", hide);
    };
  }, [visible, springX, springY]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50 hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div
        className="w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsla(38, 70%, 55%, 0.06) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}