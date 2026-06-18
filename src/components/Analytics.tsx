import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

function useCountUp(target: number, duration: number, format: (v: number) => string, trigger: boolean, delay = 0) {
  const [display, setDisplay] = useState(format(0))
  useEffect(() => {
    if (!trigger) return
    let frame: number
    const timeoutId = window.setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        setDisplay(format(eased * target))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(frame)
    }
  }, [trigger, target, duration, format, delay])
  return display
}

const BLOCK1 = 'https://qclay.design/lovable/synergy/block-1.png'
const BLOCK2 = 'https://qclay.design/lovable/synergy/block-2.png'
const PORTRAIT = 'https://qclay.design/lovable/synergy/person-2.png'

const BAR_GRADIENTS = [
  'linear-gradient(90deg, #1DC47D 60%, rgba(29,196,125,0) 100%)',
  'linear-gradient(90deg, #B48F17 55%, rgba(180,143,23,0) 100%)',
  'linear-gradient(90deg, #FFF 52%, rgba(255,255,255,0) 100%)',
  'linear-gradient(90deg, #7090FF 55%, rgba(112,144,255,0) 100%)',
  'linear-gradient(90deg, #FFA500 55%, rgba(255,165,0,0) 100%)',
]

const countFormat = (v: number) => String(Math.round(v))

function SkillBar({ bar, index, isInView }: { bar: { label: string; pct: number }; index: number; isInView: boolean }) {
  const delaySec = 0.2 + index * 0.1
  const pctDisplay = useCountUp(bar.pct, 1000, countFormat, isInView, delaySec * 1000)

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.70)' }}>{bar.label}</span>
        <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, color: '#fff', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{pctDisplay}%</span>
      </div>
      <div style={{ height: 5, borderRadius: 5, width: '100%', marginTop: 6, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 5, opacity: 0.13, background: 'linear-gradient(90deg, #040504 0%, rgba(4,5,4,0.50) 100%)' }} />
        <motion.div
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${bar.pct}%` } : {}}
          transition={{ duration: 1, ease: 'easeOut', delay: delaySec }}
          style={{ position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 5, background: BAR_GRADIENTS[index % BAR_GRADIENTS.length] }}
        />
      </div>
    </div>
  )
}

export default function Analytics() {
  const { text } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projectsDisplay = useCountUp(10, 1200, countFormat, isInView, 800)

  return (
    <section
      id="about"
      className="section-padded"
      style={{
        background: `linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.82) 42%, rgba(0,0,0,0.82) 58%, rgba(0,0,0,0.95) 100%), url(${import.meta.env.BASE_URL}bg-about.jpg) center / cover no-repeat #000`,
      }}
    >
      {/* Header */}
      <div ref={ref} style={{ textAlign: 'center', marginBottom: 64 }}>
        <p
          style={{
            fontFamily: 'Satoshi, MiSans, sans-serif',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 2,
            color: 'rgba(255,255,255,0.50)',
            marginBottom: 16,
            margin: '0 0 16px',
          }}
        >
          {text.analytics.eyebrow}
        </p>
        <motion.h2
          initial={{ opacity: 0, filter: 'blur(12px)', y: 30 }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ margin: 0, color: '#fff' }}
        >
          <span className="section-title-span" style={{ display: 'block', fontFamily: 'Satoshi, MiSans, sans-serif', fontWeight: 400, lineHeight: 1, letterSpacing: -1.02 }}>
            {text.analytics.title1}
          </span>
          <span className="section-title-span" style={{ display: 'block', fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontWeight: 400, lineHeight: 1, letterSpacing: -1.02 }}>
            {text.analytics.title2}
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          style={{
            fontFamily: 'Satoshi, MiSans, sans-serif',
            fontSize: 16,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.60)',
            marginTop: 16,
          }}
        >
          {text.analytics.sub}
        </motion.p>
      </div>

      {/* Cards row */}
      <div className="cards-row">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          style={{ flex: 1.4, borderRadius: 24, overflow: 'hidden', position: 'relative', minHeight: 480 }}
        >
          <img src={BLOCK1} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.45)' }} />

          {/* Glass overview card */}
          <div
            style={{
              position: 'absolute',
              top: 32,
              left: 32,
              right: 32,
              zIndex: 2,
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.20)',
              background: 'rgba(255,255,255,0.10)',
              backdropFilter: 'blur(56px)',
              WebkitBackdropFilter: 'blur(56px)',
              padding: '24px 28px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: 1.5, color: 'rgba(255,255,255,0.60)' }}>
                {text.analytics.card1.header}
              </span>
              <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: 1.5, color: 'rgba(255,255,255,0.60)', textDecoration: 'underline' }}>
                {text.analytics.card1.period}
              </span>
            </div>

            <div style={{ width: '100%', borderTop: '1px dashed rgba(255,255,255,0.20)', marginBottom: 20 }} />

            {text.analytics.card1.bars.map((bar, i) => (
              <SkillBar key={i} bar={bar} index={i} isInView={isInView} />
            ))}
          </div>

          {/* Bottom text */}
          <div style={{ position: 'absolute', bottom: 22, left: 32, right: 32, zIndex: 2 }}>
            <p style={{ fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontSize: 26, fontWeight: 400, color: '#fff', marginBottom: 8, margin: '0 0 8px' }}>
              {text.analytics.card1.heading}
            </p>
            <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
              {text.analytics.card1.desc}
            </p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
          style={{ flex: 1, borderRadius: 24, overflow: 'hidden', position: 'relative', minHeight: 480 }}
        >
          <img src={BLOCK2} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.25)' }} />

          {/* Tag */}
          <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 2, fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: 1.5, color: 'rgba(255,255,255,0.70)', textDecoration: 'underline' }}>
            {text.analytics.card2.tag}
          </div>

          {/* White transaction card */}
          <div style={{ position: 'absolute', top: 32, left: 32, zIndex: 2, width: 200, borderRadius: 16, background: '#fff', padding: '16px 18px', boxShadow: '0 8px 32px rgba(0,0,0,0.20)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 22, fontWeight: 400, color: '#000', letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums' }}>
                {projectsDisplay}+
              </span>
            </div>
            <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 12, color: 'rgba(0,0,0,0.45)', marginBottom: 14, margin: '4px 0 14px' }}>
              {text.analytics.card2.caption}
            </p>
            <button
              style={{
                fontFamily: 'Satoshi, MiSans, sans-serif',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#000',
                color: '#fff',
                fontSize: 13,
                fontWeight: 500,
                padding: '10px 14px',
                borderRadius: 9999,
                width: '100%',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {text.analytics.card2.btn}
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowUpRight size={13} color="#fff" />
              </div>
            </button>
          </div>

          {/* Portrait */}
          <img
            src={PORTRAIT}
            alt="Ziqi Lu"
            style={{
              position: 'absolute',
              bottom: 140,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
              width: 200,
              height: 240,
              objectFit: 'cover',
              objectPosition: 'top center',
              borderRadius: 16,
            }}
          />

          {/* Brand bar */}
          <a
            href="https://assassin-plus.github.io/portfolio/"
            target="_blank"
            rel="noreferrer"
            style={{ position: 'absolute', bottom: 160, right: 24, zIndex: 3, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', borderRadius: 9999, padding: '8px 16px 8px 10px' }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 10, fontWeight: 700, color: '#000' }}>ZL</span>
              </div>
              <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, fontWeight: 500, color: '#fff' }}>Portfolio</span>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUpRight size={16} color="#fff" />
            </div>
          </a>

          {/* Bottom text */}
          <div style={{ position: 'absolute', bottom: 22, left: 32, right: 32, zIndex: 2 }}>
            <p style={{ fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontSize: 24, fontWeight: 400, color: '#fff', marginBottom: 8, margin: '0 0 8px' }}>
              {text.analytics.card2.heading}
            </p>
            <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
              {text.analytics.card2.desc}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
