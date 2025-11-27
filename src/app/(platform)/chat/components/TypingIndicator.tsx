/* eslint-disable id-length */
"use client";

import React from "react";

import { Card } from "~/components/ui/card";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3 justify-start"
    >
      <div className="flex-shrink-0 size-8 rounded-full bg-slate-900 flex items-center justify-center">
        <Bot className="size-4 text-white" />
      </div>

      <Card className="px-4 py-3 bg-white border-slate-200">
        <div className="flex items-center gap-1">
          <motion.div
            className="size-2 rounded-full bg-slate-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="size-2 rounded-full bg-slate-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.div
            className="size-2 rounded-full bg-slate-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </div>
      </Card>
    </motion.div>
  );
};
