'use client'

import { motion } from 'framer-motion'

export function SocialIcon({ href, label, children }) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="text-zinc-600 transition-colors transition-transform duration-200 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  )
}
