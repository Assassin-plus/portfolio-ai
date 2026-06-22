import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { WORKS_IMAGES, WORKS_VIDEOS, WORKS_SLUGS, CATEGORY_COLORS } from '../data/works'

function useViewportWidth() {
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1280))
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return vw
}

// Shows the lightweight image immediately; when its card is active and a video
// is provided, loads the video and crossfades it in once it can render.
function WorkMedia({ img, video, active, title }: { img: string; video?: string; active: boolean; title: string }) {
  const [videoReady, setVideoReady] = useState(false)
  useEffect(() => { if (!active) setVideoReady(false) }, [active])
  return (
    <>
      <img
        src={img}
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {video && active && (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />
      )}
    </>
  )
}

export default function Works() {
  const { text, lang } = useLang()
  const { works } = text
  const [active, setActive] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const total = works.items.length

  const vw = useViewportWidth()
  const isMobile = vw < 768

  // card dimensions — fluid, scaling with viewport; landscape orientation
  const CARD_BASE = isMobile
    ? Math.min(300, Math.max(220, vw * 0.62))
    : Math.min(620, Math.max(340, vw * 0.36))
  const SHRINK = 0.75
  const CARD_H = CARD_BASE * SHRINK
  const CARD_W = CARD_BASE * 1.69 * SHRINK
  const SIDE_W = 'clamp(200px, 27vw, 460px)'
  const FLANK_GAP = 'clamp(20px, 2.6vw, 40px)'
  const TRACK_GAP = 'clamp(108px, 15vw, 264px)'

  // Desktop: the wrapper is `total` viewport-heights tall and the inner section
  // is `position: sticky`. As the user scrolls through that tall wrapper, scroll
  // is effectively "taken over" by card switching — once the wrapper's scroll
  // room is exhausted the section un-pins naturally and the page scrolls on to
  // the next/previous section, no manual wheel hijacking required.
  useEffect(() => {
    if (isMobile) return
    let rafId: number

    function tick() {
      const el = wrapperRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const pinDistance = el.offsetHeight - window.innerHeight
        if (pinDistance > 0) {
          const progress = Math.min(1, Math.max(0, -rect.top / pinDistance))
          const idx = Math.round(progress * (total - 1))
          setActive(prev => (prev !== idx ? idx : prev))
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isMobile, total])

  const goTo = useCallback((i: number) => {
    if (isMobile) { setActive(i); return }
    const el = wrapperRef.current
    if (!el) { setActive(i); return }
    const pinDistance = el.offsetHeight - window.innerHeight
    if (pinDistance <= 0) { setActive(i); return }
    const wrapperTopAbs = el.getBoundingClientRect().top + window.scrollY
    const p = total > 1 ? i / (total - 1) : 0
    window.scrollTo({ top: wrapperTopAbs + p * pinDistance, behavior: 'smooth' })
  }, [isMobile, total])

  // On returning from a project detail page, jump straight to that card.
  useEffect(() => {
    const raw = sessionStorage.getItem('returnToWork')
    if (raw === null) return
    sessionStorage.removeItem('returnToWork')
    const i = parseInt(raw, 10)
    if (Number.isNaN(i) || i < 0) return
    if (isMobile) { setActive(i); return }
    let tries = 0
    const run = () => {
      const el = wrapperRef.current
      const pinDistance = el ? el.offsetHeight - window.innerHeight : 0
      if (!el || pinDistance <= 0) {
        if (tries++ < 40) { requestAnimationFrame(run); return }
        setActive(i)
        return
      }
      const wrapperTopAbs = el.getBoundingClientRect().top + window.scrollY
      const p = total > 1 ? i / (total - 1) : 0
      window.scrollTo({ top: wrapperTopAbs + p * pinDistance, behavior: 'auto' })
      setActive(i)
    }
    requestAnimationFrame(run)
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const item = works.items[active]
  const accentColor = CATEGORY_COLORS[item.category] ?? '#fff'
  const MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', 'Cascadia Mono', Consolas, monospace"

  // vh of scroll required per card transition — lower = less scrolling to flip through cards
  const SCROLL_PER_CARD_VH = 40
  const wrapperHeight = `${100 + (total - 1) * SCROLL_PER_CARD_VH}vh`

  return (
    <div
      id="projects"
      ref={wrapperRef}
      style={{ position: 'relative', height: isMobile ? 'auto' : wrapperHeight }}
    >
      <section
        style={{
          position: isMobile ? 'static' : 'sticky',
          top: 0,
          height: isMobile ? 'auto' : '100vh',
          minHeight: 600,
          background: '#0c0906',
          overflow: isMobile ? 'visible' : 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Background — blurred version of the active project's artwork */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <motion.img
            key={active}
            src={WORKS_IMAGES[active]}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(1.15)',
              filter: 'blur(60px) saturate(1.3) brightness(0.45)',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${accentColor}30 0%, rgba(12,9,6,0.55) 75%)`,
          }} />
        </div>

        {/* Header — eyebrow + two-line title, matching the other sections */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: 'clamp(40px, 6vw, 64px)' }}>
          <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 12, fontWeight: 500, letterSpacing: 2, color: 'rgba(255,255,255,0.50)', margin: '0 0 14px' }}>
            {works.eyebrow}
          </p>
          <h2 style={{ margin: 0, color: '#fff' }}>
            <span className="section-title-span" style={{ display: 'block', fontFamily: 'Satoshi, MiSans, sans-serif', fontWeight: 400, lineHeight: 1, letterSpacing: -1.02 }}>
              {works.title1}
            </span>
            <span className="section-title-span" style={{ display: 'block', fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontWeight: 400, lineHeight: 1, letterSpacing: -1.02 }}>
              {works.title2}
            </span>
          </h2>
          <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.50)', marginTop: 12 }}>
            {works.sub}
          </p>
        </div>

        {/* Top-right: minimalist tagline + contact */}
        <div style={{ position: 'absolute', top: 'clamp(40px, 6vw, 64px)', right: 52, zIndex: 10, textAlign: 'right' }}>
          <div style={{
            fontFamily: MONO,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: 1.8,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.7,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            {lang === 'zh'
              ? <>技术与艺术<br />融合的<br />→ 视觉体验</>
              : <>WE TURN CODE<br />INTO VISUAL<br />→ EXPERIENCES</>
            }
          </div>
          <a
            href="#contact"
            style={{
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: 1.8,
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            ↳ {lang === 'zh' ? '联系我' : 'CONTACT'}
          </a>
        </div>

        {/* Vertical guide lines framing the card track */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: `calc(50% - ${CARD_W / 2}px)`,
          width: 1, background: 'rgba(255,255,255,0.07)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: `calc(50% + ${CARD_W / 2}px)`,
          width: 1, background: 'rgba(255,255,255,0.07)', pointerEvents: 'none',
        }} />

        {/* Left nav dot */}
        <div style={{
          position: 'absolute', left: 22, top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          {works.items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? 18 : 4,
                height: 4,
                borderRadius: 2,
                background: i === active ? '#fff' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>

        {/* Right nav dot */}
        <div style={{
          position: 'absolute', right: 22, top: '50%', transform: 'translateY(-50%)',
          zIndex: 10,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
        </div>

        {/* Center row: counter/name flank — card track — year/view-project flank */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10,
          gap: isMobile ? 'clamp(48px, 12vw, 72px)' : TRACK_GAP,
          padding: isMobile ? 'clamp(48px, 10vw, 80px) clamp(16px, 5vw, 32px) 24px' : '0 clamp(16px, 4vw, 48px)',
        }}>
          {/* Left flank: dot + counter ····· project name */}
          <div style={{
              width: isMobile ? '100%' : SIDE_W,
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : 'space-between',
              gap: FLANK_GAP,
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                <span style={{
                  fontFamily: MONO,
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: 1.2,
                  color: 'rgba(255,255,255,0.45)',
                  whiteSpace: 'nowrap',
                }}>
                  {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>
              <motion.span
                key={`name-${active}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontFamily: 'Satoshi, MiSans, sans-serif',
                  fontSize: 'clamp(20px, 2.4vw, 32px)',
                  fontWeight: 600,
                  color: '#fff',
                  letterSpacing: -0.5,
                  textAlign: isMobile ? 'left' : 'right',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.title}
              </motion.span>
            </div>

          {/* Card track */}
          <div style={{ position: 'relative', width: CARD_W, height: CARD_H, flexShrink: 0 }}>
            {works.items.map((_, i) => {
              const offset = i - active
              if (Math.abs(offset) > 3) return null

              const absOff = Math.abs(offset)
              const scale = absOff === 0 ? 1 : absOff === 1 ? 0.78 : 0.62
              const translateY = offset * (CARD_H * 0.72)
              const opacity = absOff === 0 ? 1 : absOff === 1 ? 0.45 : 0.2
              const zIndex = 20 - absOff * 5
              const blur = absOff === 0 ? 0 : absOff === 1 ? 2 : 5

              // MicroPT is shown portrait — swap the landscape width/height for this card.
              const isPortrait = WORKS_IMAGES[i].includes('micropt')
              const cardW = isPortrait ? CARD_H : CARD_W
              const cardH = isPortrait ? CARD_W : CARD_H

              return (
                <motion.div
                  key={i}
                  animate={{ scale, y: translateY, opacity, filter: `blur(${blur}px)` }}
                  transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                  onClick={() => absOff > 0 && goTo(i)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: -(cardH / 2),
                    marginLeft: -(cardW / 2),
                    width: cardW,
                    height: cardH,
                    borderRadius: 18,
                    overflow: 'hidden',
                    zIndex,
                    cursor: absOff > 0 ? 'pointer' : 'default',
                    boxShadow: absOff === 0
                      ? '0 32px 80px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.5)'
                      : '0 8px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  <WorkMedia
                    img={WORKS_IMAGES[i]}
                    video={WORKS_VIDEOS[i]}
                    active={i === active}
                    title={works.items[i].title}
                  />
                </motion.div>
              )
            })}
          </div>

          {/* Right flank: year ····· view project + dot */}
          <div style={{
            width: isMobile ? '100%' : SIDE_W,
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'space-between',
            gap: FLANK_GAP,
            flexShrink: 0,
          }}>
            <motion.span
              key={`year-${active}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              style={{
                fontFamily: MONO,
                fontSize: 26,
                color: 'rgba(255,255,255,0.4)',
                whiteSpace: 'nowrap',
              }}
            >
              / {item.year}
            </motion.span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0 }}>
              <Link
                to={`/project/${WORKS_SLUGS[active]}`}
                style={{
                  fontFamily: MONO,
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: 1.8,
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              >
                ↳ {works.btn.toUpperCase()}
              </Link>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
            </div>
          </div>
        </div>

        {/* Scroll hint (fades after first interaction) */}
        <div style={{
          position: 'absolute',
          bottom: 56,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          pointerEvents: 'none',
          opacity: active === 0 ? 0.4 : 0,
          transition: 'opacity 0.5s',
        }}>
          <span style={{
            fontFamily: MONO,
            fontSize: 20,
            letterSpacing: 2,
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
          }}>
            {lang === 'zh' ? '滚动浏览' : 'SCROLL'}
          </span>
          <div style={{
            width: 1,
            height: 28,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
          }} />
        </div>
      </section>
    </div>
  )
}
