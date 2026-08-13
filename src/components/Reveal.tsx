"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Reveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 120,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}