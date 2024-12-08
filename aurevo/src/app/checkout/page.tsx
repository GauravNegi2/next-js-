'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from '../context/CartContext'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutPage() {
  const [orderPlaced, setOrderPlaced] = useState(false)
  const { cart, clearCart } = useCart()
  const router = useRouter()

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setOrderPlaced(true)
    clearCart()
  }

  const getDeliveryDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 2)
    return date.toLocaleDateString()
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
          Checkout
        </h1>
        <Card className="bg-white bg-opacity-90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>{orderPlaced ? 'Order Confirmation' : 'Order Summary'}</CardTitle>
          </CardHeader>
          <CardContent>
            {orderPlaced ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-xl mb-4">Your order has been placed successfully!</p>
                <p className="text-lg">Your order will be delivered by: {getDeliveryDate()}</p>
                <Button className="mt-8" onClick={() => router.push('/')}>
                  Continue Shopping
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="mb-6">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </motion.div>
                  ))}
                  <div className="font-bold mt-4 text-xl">Total: ₹{getTotalPrice()}</div>
                </div>
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" required />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" required />
                  </div>
                  <div>
                    <Label htmlFor="card">Credit Card Number</Label>
                    <Input id="card" required />
                  </div>
                  <Button type="submit" className="w-full">Place Order</Button>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

