'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Loading from '../components/Loading'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Simulate loading time

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loading />}
      </AnimatePresence>
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <motion.div
          className="text-center px-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Welcome to Aurevo
          </h1>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            Discover our amazing products and start shopping today! Experience the Freshness with Aurevo.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/buy">
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100 transition-all duration-300">
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

