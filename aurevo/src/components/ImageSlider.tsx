'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageSliderProps {
  images: string[]
  alt: string
  productName: string
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, alt, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  useEffect(() => {
    if (isHovering) {
      intervalRef.current = setInterval(goToNext, 1000) // Change image every 3 seconds
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovering, images.length])

  return (
    <div 
      className="relative w-full h-0 pb-[100%] overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0">
        <Image
          src={images[currentIndex]}
          alt={`${alt} - View ${currentIndex + 1}`}
          layout="fill"
          objectFit="contain"
          className="bg-gray-100"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-xl drop-shadow-lg">
        {productName}
      </div>
      {/* Navigation buttons - visible only on hover */}
      <div className="hidden group-hover:flex justify-between items-center absolute inset-0">
        <button
          onClick={(e) => {
            e.stopPropagation()
            goToPrevious()
          }}
          className="absolute top-1/2 left-2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            goToNext()
          }}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      {/* Dots navigation */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentIndex(index)
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400 bg-opacity-50 hover:bg-opacity-100'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
