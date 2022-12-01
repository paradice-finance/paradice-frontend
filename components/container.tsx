import React from "react";
import { motion } from "framer-motion";

export default function Container(props: { className?: string, children?: React.ReactNode; }) {
  return (
    <motion.div
      className={`container mx-auto xl:px-0 ${props.className ? props.className : ""
        }`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {props.children}
    </motion.div>

  );
}
