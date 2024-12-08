'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { useCart } from '../context/CartContext'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CartPage() {
  const { cart, removeFromCart } = useCart()
  const router = useRouter()

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const handleCheckout = () => {
    router.push('/checkout')
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
          Your Cart
        </h1>
        <Card className="bg-white bg-opacity-90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Cart Items</CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
            ) : (
              cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex justify-between items-center mb-4 p-4 border-b last:border-b-0"
                >
                  <span>{item.name} x {item.quantity}</span>
                  <div>
                    <span className="mr-4">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
                  </div>
                </motion.div>
              ))
            )}
          </CardContent>
          {cart.length > 0 && (
            <CardFooter className="flex flex-col items-end">
              <div className="font-bold mt-4 text-xl text-right">Total: ₹{parseInt(getTotalPrice()).toLocaleString('en-IN')}</div>
              <Button className="mt-4 px-8 py-2 text-lg" onClick={handleCheckout}>Proceed to Checkout</Button>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  )
}

