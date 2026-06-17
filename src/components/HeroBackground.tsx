import { useEffect, useRef } from 'react'

const VIDEO_URL = 'https://qclay.design/lovable/kubric/body.mp4'

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.autoplay = true
    v.loop = true
    v.playsInline = true
    v.setAttribute('webkit-playsinline', 'true')
    v.play().catch(() => {})
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', background: '#000' }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
    </div>
  )
}
