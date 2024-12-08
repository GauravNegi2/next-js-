'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <motion.h1 
        className="text-6xl font-bold mb-4 text-center text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Aurevo
      </motion.h1>
      <motion.p 
        className="text-xl mb-8 text-center text-gray-600"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Discover our amazing products and start shopping today!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href="/buy">
          <Button size="lg" className="text-lg px-8 py-6">
            Shop Now
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
