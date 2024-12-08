import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from './context/CartContext'
import ClientNavbar from './components/clientNavbar'
import BackgroundVideo from '../components/BackgroundVideo'

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
      <body className={`${inter.className} min-h-screen`}>
        <CartProvider>
          <div className="relative min-h-screen">
            <BackgroundVideo />
            <ClientNavbar />
            <main className="pt-16">
              {children}
            </main>
          </div>
        </CartProvider>
      </body>
    </html>
  )
}

