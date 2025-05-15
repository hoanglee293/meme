import React from 'react';

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute min-w-full min-h-full object-cover opacity-40"
      >
        <source src="/3ca179f2c62fb2bf9e643e9bc9a5b68b239dad0f.mp4" type="video/mp4" />
      </video>
      {/* Overlay gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div> */}
    </div>
  );
};

export default VideoBackground; 