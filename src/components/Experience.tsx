import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

const TAG_GLOW: Record<string, string> = {
  EDUCATION: '29,196,125',
  RESEARCH: '80,120,255',
  INDUSTRY: '255,160,0',
  教育: '29,196,125',
  研究: '80,120,255',
  行业: '255,160,0',
}

const TAG_COLORS: Record<string, string> = {
  EDUCATION: 'rgba(29,196,125,0.15)',
  RESEARCH: 'rgba(80,120,255,0.15)',
  INDUSTRY: 'rgba(255,160,0,0.14)',
  教育: 'rgba(29,196,125,0.15)',
  研究: 'rgba(80,120,255,0.15)',
  行业: 'rgba(255,160,0,0.14)',
}
const TAG_TEXT: Record<string, string> = {
  EDUCATION: '#1DC47D',
  RESEARCH: '#7090FF',
  INDUSTRY: '#FFAA30',
  教育: '#1DC47D',
  研究: '#7090FF',
  行业: '#FFAA30',
}

export default function Experience() {
  const { text } = useLang()
  const { experience: exp } = text
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])

  // Scroll-driven flowing light — direct DOM mutation, no re-renders
  useEffect(() => {
    let rafId: number

    function tick() {
      const centerY = window.innerHeight * 0.46

      dotRefs.current.forEach(dot => {
        if (!dot) return
        if (dot.getAttribute('data-current') === '1') return // CSS breathing handles it

        const rect = dot.getBoundingClientRect()
        const dotY = rect.top + rect.height / 2
        const dist = Math.abs(dotY - centerY)
        const range = window.innerHeight * 0.40
        const g = Math.max(0, Math.pow(Math.max(0, 1 - dist / range), 1.8))
        const rgb = dot.getAttribute('data-glow') ?? '255,255,255'

        dot.style.background = `rgba(${rgb},${0.12 + g * 0.88})`
        dot.style.borderColor = `rgba(${rgb},${0.2 + g * 0.5})`
        dot.style.boxShadow = g > 0.04
          ? `0 0 ${g * 14}px rgba(${rgb},${g * 0.55}), 0 0 ${g * 30}px rgba(${rgb},${g * 0.18})`
          : 'none'
        dot.style.transform = `scale(${1 + g * 0.35})`
      })

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const reversedTimeline = [...exp.timeline].reverse()

  return (
    <section id="research" className="section-padded" style={{ background: '#050505' }}>
      {/* Header */}
      <div ref={sectionRef} style={{ textAlign: 'center', marginBottom: 72 }}>
        <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 12, fontWeight: 500, letterSpacing: 2, color: 'rgba(255,255,255,0.50)', margin: '0 0 16px' }}>
          {exp.eyebrow}
        </p>
        <motion.h2
          initial={{ opacity: 0, filter: 'blur(12px)', y: 30 }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ margin: 0, color: '#fff' }}
        >
          <span className="section-title-span" style={{ display: 'block', fontFamily: 'Satoshi, MiSans, sans-serif', fontWeight: 400, lineHeight: 1, letterSpacing: -1.02 }}>
            {exp.title1}
          </span>
          <span className="section-title-span" style={{ display: 'block', fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontWeight: 400, lineHeight: 1, letterSpacing: -1.02 }}>
            {exp.title2}
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.55)', marginTop: 16 }}
        >
          {exp.sub}
        </motion.p>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: 'clamp(32px,4vw,64px)', maxWidth: 1200, margin: '0 auto', alignItems: 'center', flexWrap: 'wrap' }}>

        {/* Left: Timeline (newest first) */}
        <div style={{ flex: '1 1 500px', position: 'relative' }}>
          {/* Vertical connector line */}
          <div style={{ position: 'absolute', left: 7, top: 12, bottom: 12, width: 1, background: 'rgba(255,255,255,0.10)' }} />

          {reversedTimeline.map((item, i) => {
            const delay = 0.15 + i * 0.12
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
                style={{ display: 'flex', gap: 24, marginBottom: i < reversedTimeline.length - 1 ? 32 : 0 }}
              >
                {/* Timeline dot */}
                <div style={{ flexShrink: 0, position: 'relative', top: 4 }}>
                  <div
                    ref={el => { dotRefs.current[i] = el }}
                    data-current={item.current ? '1' : '0'}
                    data-glow={TAG_GLOW[item.tag] ?? '255,255,255'}
                    className={item.current ? 'dot-breathe' : undefined}
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: '50%',
                      background: item.current ? '#1DC47D' : 'rgba(255,255,255,0.12)',
                      border: `2px solid ${item.current ? '#1DC47D' : 'rgba(255,255,255,0.20)'}`,
                      transition: 'transform 0.06s linear',
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* Entry card */}
                <div style={{
                  flex: 1,
                  background: item.current ? 'rgba(29,196,125,0.04)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${item.current ? 'rgba(29,196,125,0.18)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 16,
                  padding: '20px 24px',
                  position: 'relative',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                    <span style={{
                      fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: 1.5,
                      color: TAG_TEXT[item.tag] ?? '#fff',
                      background: TAG_COLORS[item.tag] ?? 'rgba(255,255,255,0.08)',
                      padding: '3px 10px', borderRadius: 9999,
                    }}>
                      {item.tag}
                    </span>
                    <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.40)', letterSpacing: 0.5 }}>
                      {item.period}
                    </span>
                  </div>

                  <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 17, fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>
                    {item.institution}
                  </p>
                  <p style={{ fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,0.70)', margin: '0 0 10px' }}>
                    {item.role}
                  </p>
                  <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0 }}>
                    {item.detail}
                  </p>

                  {item.highlight && (
                    <div style={{
                      marginTop: 12,
                      background: 'rgba(29,196,125,0.08)',
                      border: '1px solid rgba(29,196,125,0.20)',
                      borderRadius: 10,
                      padding: '8px 14px',
                      fontFamily: 'Satoshi, MiSans, sans-serif',
                      fontSize: 12, color: '#1DC47D',
                    }}>
                      {item.highlight}
                    </div>
                  )}

                  {/* Current indicator dot in card corner */}
                  {item.current && (
                    <div style={{
                      position: 'absolute', top: 16, right: 16,
                      width: 8, height: 8, borderRadius: '50%',
                      background: '#1DC47D',
                      boxShadow: '0 0 8px rgba(29,196,125,0.8)',
                    }} />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Right: Publication card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{ flex: '1 1 320px', minWidth: 280 }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 24,
            overflow: 'hidden',
          }}>
            <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
              <img
                src="https://qclay.design/lovable/synergy/block-1.png"
                alt="TerraCraft"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
              <span style={{
                position: 'absolute', top: 16, left: 16,
                fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: 1.5,
                color: '#1DC47D', background: 'rgba(29,196,125,0.15)',
                padding: '4px 12px', borderRadius: 9999,
              }}>
                {exp.pub.tag}
              </span>
            </div>

            <div style={{ padding: '24px 28px 28px' }}>
              <h3 style={{ fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontSize: 32, fontWeight: 400, color: '#fff', margin: '0 0 6px', lineHeight: 1.1 }}>
                {exp.pub.title}
              </h3>
              <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.60)', margin: '0 0 16px', lineHeight: 1.4 }}>
                {exp.pub.subtitle}
              </p>
              <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: '0 0 20px' }}>
                {exp.pub.desc}
              </p>
              <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.30)', letterSpacing: 0.3, margin: '0 0 20px' }}>
                {exp.pub.doiLabel}
              </p>
              <a
                href={exp.pub.doi}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 14, fontWeight: 500,
                  color: '#000', background: '#fff',
                  padding: '10px 10px 10px 20px', borderRadius: 9999, textDecoration: 'none',
                }}
              >
                {exp.pub.btn}
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowUpRight size={13} color="#fff" strokeWidth={2.5} />
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
