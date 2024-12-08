'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useCart, Product } from '../context/CartContext'
import { ShoppingCart } from 'lucide-react'
import ImageSlider from '@/components/ImageSlider'

const products: Product[] = [
  { 
    id: 1, 
    name: "Two In One Set", 
    price: 249, 
    images: [
      "/images/p3.jpg",
      "/images/p2.jpg",
      "/images/p1.jpg",
    ]
  },
  { 
    id: 2, 
    name: "Refill-Pack", 
    price: 49, 
    images: [
      "/images/r1.jpg",
      "/images/r2.jpg",
      "/images/r3.jpg",
    ]
  },
  { 
    id: 3, 
    name: "Toothbrush + Refill", 
    price: 269, 
    images: [
      "/images/tr1.jpg",
      "/images/tr2.jpg",
      "/images/tr3.jpg",
    ]
  },
]

export default function BuyPage() {
  const { addToCart, totalItems } = useCart()
  const [showCartFooter, setShowCartFooter] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: { duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
    })
  }, [controls])

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity)
    setShowCartFooter(true)
  }

  return (
    <motion.div 
      className="min-h-screen pb-16 pt-24 px-4 sm:px-6 lg:px-8"
      animate={controls}
      style={{
        backgroundImage: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
        backgroundSize: '400% 400%'
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Products
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 w-full"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white bg-opacity-80 backdrop-blur-sm flex flex-col">
                <div className="aspect-square w-full">
                  <ImageSlider images={product.images} alt={product.name} productName={product.name} />
                </div>
                <CardContent className="flex-grow pt-4">
                  {/* <h3 className="text-lg font-semibold mb-2">{product.name}</h3> */}
                  <CardDescription>₹{product.price.toLocaleString('en-IN')}</CardDescription>
                  <div className="flex items-center space-x-2 mt-2">
                    <Label htmlFor={`quantity-${product.id}`}>Quantity:</Label>
                    <Input
                      id={`quantity-${product.id}`}
                      type="number"
                      defaultValue="1"
                      min="1"
                      className="w-20"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(product, parseInt((document.getElementById(`quantity-${product.id}`) as HTMLInputElement).value))}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {showCartFooter && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-4"
        >
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <ShoppingCart className="mr-2" />
              <span>{totalItems} item(s) in cart</span>
            </div>
            <Link href="/cart">
              <Button variant="secondary">Proceed to Cart</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

