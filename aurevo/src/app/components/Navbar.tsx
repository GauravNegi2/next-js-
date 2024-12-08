'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useScrollPosition } from '@/hooks/useScrollPosition'

const Navbar = () => {
  const { totalItems } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { scrollDirection } = useScrollPosition()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/buy', label: 'Shop' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
  ]

  return (
    <motion.nav 
      className="fixed w-full z-50 bg-transparent transition-all duration-300"
      initial={{ top: 0 }}
      animate={{ top: scrollDirection === 'down' ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="Aurevo Logo" width={40} height={40} />
            <span className="ml-2 text-xl font-bold text-white">Aurevo</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-light ${
                  pathname === item.href ? 'text-white' : 'text-gray-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative hover:text-primary-light transition-colors text-white">
              <ShoppingCart size={24} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span 
                    key="cart-count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`block py-2 text-sm font-medium ${
                    pathname === item.href ? 'text-primary' : 'text-gray-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

