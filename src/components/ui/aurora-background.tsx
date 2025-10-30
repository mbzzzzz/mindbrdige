'use client';

import * as React from 'react';
import { motion } from 'motion/react';

type AuroraBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
};

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  return (
    <div className={className}>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            aria-hidden
            className="absolute -top-32 -left-32 h-[36rem] w-[36rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(closest-side, hsl(var(--primary)/0.20), transparent)' }}
            initial={{ opacity: 0.2, scale: 0.9 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute top-1/3 -right-20 h-[28rem] w-[28rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(closest-side, hsl(var(--accent)/0.18), transparent)' }}
            initial={{ opacity: 0.15, y: 0 }}
            animate={{ opacity: 0.3, y: -20 }}
            transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(closest-side, hsl(var(--ring)/0.18), transparent)' }}
            initial={{ opacity: 0.12, y: 10 }}
            animate={{ opacity: 0.25, y: -10 }}
            transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          />
        </div>
      </div>
      {children}
    </div>
  );
}

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Background lights are cool you know.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          And this, is chemical burn.
        </div>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Debug now
        </button>
      </motion.div>
    </AuroraBackground>
  );
}


