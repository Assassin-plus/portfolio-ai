import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Heart, MessageCircle } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

const IMAGE_URL = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80&auto=format&fit=crop'
const SLIDE_DURATION = 6000 // ms per slide

export default function StoryCard() {
  const { text } = useLang()
  const slides = text.hero.story.slides
  const [slide, setSlide] = useState(0)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])

  // Single rAF clock drives both the active slide and the progress-bar fill,
  // so the bar reaching 0%/100% and the slide switch always land on the same frame.
  useEffect(() => {
    const cycle = SLIDE_DURATION * slides.length
    const start = performance.now()
    let rafId: number

    function tick() {
      const elapsed = (performance.now() - start) % cycle
      const idx = Math.min(slides.length - 1, Math.floor(elapsed / SLIDE_DURATION))

      barRefs.current.forEach((bar, i) => {
        if (!bar) return
        const frac = i < idx ? 1 : i > idx ? 0 : (elapsed - idx * SLIDE_DURATION) / SLIDE_DURATION
        bar.style.transform = `scaleX(${frac})`
      })

      setSlide(prev => (prev !== idx ? idx : prev))
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [slides.length])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 })
  const rotateY = useTransform(sx, [-1, 1], [-18, 18])
  const rotateX = useTransform(sy, [-1, 1], [12, -12])

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [mx, my])

  const currentSlide = slides[slide]

  return (
    <div style={{ marginTop: 48, perspective: 1200 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 'clamp(224px, 44.8vw, 624px)',
          height: 'clamp(320px, 30.4vw, 448px)',
          borderRadius: 'clamp(16px, 2vw, 26px)',
          background: '#1a1a1a',
          overflow: 'hidden',
          position: 'relative',
          transformStyle: 'preserve-3d',
          rotateY,
          rotateX,
          boxShadow:
            '0 40px 100px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      >
        {/* Background image */}
        <img
          src={IMAGE_URL}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
        />

        {/* Tint overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            mixBlendMode: 'soft-light',
            background: 'linear-gradient(160deg, rgba(220,255,90,0.65) 0%, rgba(170,230,70,0.35) 40%, rgba(80,140,40,0.25) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Radial highlight */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 30% 15%, rgba(230,255,120,0.25) 0%, transparent 55%)',
            pointerEvents: 'none',
          }}
        />

        {/* Inset top highlight */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 28,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
            pointerEvents: 'none',
          }}
        />

        {/* Story progress bars */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            right: 24,
            display: 'flex',
            gap: 6,
            zIndex: 20,
          }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 9999,
                background: 'rgba(0,0,0,0.25)',
                overflow: 'hidden',
              }}
            >
              <div
                ref={el => { barRefs.current[i] = el }}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.95)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left center',
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '55%',
            background: 'linear-gradient(0deg, #040504 20.54%, rgba(29,37,9,0) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Slide text */}
        <motion.h3
          key={slide}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            left: 24,
            right: 24,
            bottom: 88,
            zIndex: 10,
            color: '#fff',
            fontSize: 38,
            lineHeight: '40px',
            letterSpacing: -0.5,
            textShadow: '0 2px 18px rgba(0,0,0,0.35)',
            margin: 0,
          }}
        >
          <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontWeight: 700 }}>
            {currentSlide.line1}
          </span>
          <br />
          <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontWeight: 400 }}>
            {currentSlide.line2}
          </span>
          <br />
          <span style={{ fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontWeight: 400 }}>
            {currentSlide.line3}
          </span>
        </motion.h3>

        {/* Bottom action row */}
        <div
          style={{
            position: 'absolute',
            left: 24,
            right: 24,
            bottom: 24,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: 'Satoshi, MiSans, sans-serif',
              background: 'rgba(255,255,255,0.96)',
              color: '#0a0a0a',
              fontSize: 13,
              fontWeight: 500,
              padding: '9px 16px',
              borderRadius: 9999,
              boxShadow: '0 6px 18px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            {text.hero.story.pill}
          </div>
          {[Heart, MessageCircle].map((Icon, i) => (
            <div
              key={i}
              style={{
                width: 38,
                height: 38,
                borderRadius: 14,
                background: 'rgba(20,20,20,0.45)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.14)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={18} color="#fff" strokeWidth={1.8} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
