import React from 'react'

const BackgroundVideo: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute min-w-full min-h-full object-cover"
      >
        <source src="/videos/track2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  )
}

export default BackgroundVideo

