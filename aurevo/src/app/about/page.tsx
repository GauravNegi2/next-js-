'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <motion.div 
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
          About Us
        </h1>
        <Card className="bg-white bg-opacity-90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Aurevo was founded with a simple yet powerful vision: to provide high-quality, innovative products that enhance people's lives.Our journey began in 2024 when a group of tech enthusiasts came together with a shared passion for cutting-edge technology and exceptional customer service.
            </p>
            <p className="mb-4">
              Over the years, we've grown from a small startup to a leading e-commerce platform.
            </p>
            <p>
              At Aurevo, we believe that technology should be accessible to everyone. That's why we strive to offer competitive prices without compromising on quality. Our team of experts carefully selects each product in our inventory, ensuring that it meets our high standards of performance, durability, and innovation.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

