'use client'

import dynamic from 'next/dynamic'

const DynamicNavbar = dynamic(() => import('./Navbar'), { ssr: false })

export default function ClientNavbar() {
  return <DynamicNavbar />
}

