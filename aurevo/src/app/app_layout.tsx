import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from './context/CartContext'
import ClientNavbar from './components/clientNavbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aurevo Shop',
  description: 'Your one-stop shop for all things Aurevo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen`}>
        <CartProvider>
          <ClientNavbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  )
}
