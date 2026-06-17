import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import HeroBackground from './HeroBackground'
import StoryCard from './StoryCard'
import { useLang } from '../context/LanguageContext'

const ASSET = import.meta.env.BASE_URL
const INSTITUTIONS = [
  { name: 'Tsinghua University', svg: `${ASSET}institutions/thu-name-crest.svg`, href: 'https://www.tsinghua.edu.cn/' },
  { name: 'University of Utah', svg: `${ASSET}institutions/University_of_Utah_horizontal_logo.svg`, href: 'https://www.utah.edu/' },
  { name: 'Tsinghua Graphics Lab', svg: `${ASSET}institutions/cst-logo-with-text.svg`, href: 'https://cg.cs.tsinghua.edu.cn/' },
  { name: 'Utah EAE Program', svg: `${ASSET}institutions/utah_computer_graphics.svg`, href: 'https://graphics.cs.utah.edu/' },
]

export default function Hero() {
  const { text, lang } = useLang()

  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', background: '#000' }}>
      <HeroBackground />

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* Hero content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          zIndex: 10,
          paddingTop: 'clamp(96px, 11vh, 140px)',
        }}
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hero-title"
          style={{
            color: '#fff',
            textAlign: 'center',
            margin: 0,
            lineHeight: lang === 'zh' ? 1.25 : 0.94,
            letterSpacing: -1.02,
            fontWeight: 400,
          }}
        >
          <span style={{ display: 'block', fontFamily: 'Satoshi, MiSans, sans-serif' }}>
            {text.hero.title1}
          </span>
          <span style={{ display: 'block', textAlign: 'center' }}>
            <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', verticalAlign: lang === 'zh' ? 'bottom' : undefined }}>{text.hero.title2a}</span>
            {lang !== 'zh' && <span style={{ display: 'inline-block', width: '0.22em' }} />}
            <span style={{ fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', verticalAlign: lang === 'zh' ? 'bottom' : undefined }}>
              {text.hero.title2b}
            </span>
          </span>
        </motion.h1>

        {/* CTA button */}
        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 32,
            background: '#fff',
            color: '#000',
            fontSize: 15,
            fontWeight: 500,
            fontFamily: 'Satoshi, MiSans, sans-serif',
            paddingLeft: 24,
            paddingRight: 8,
            paddingTop: 6,
            paddingBottom: 6,
            borderRadius: 9999,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
          }}
        >
          {text.hero.cta}
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 9999,
              background: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowUpRight size={14} color="#fff" strokeWidth={2.5} />
          </div>
        </motion.a>

        <StoryCard />
      </div>

      {/* Bottom-left: marquee */}
      <motion.div
        className="hero-footer-left"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          style={{
            fontFamily: 'Satoshi, MiSans, sans-serif',
            fontSize: 21,
            lineHeight: 1.2,
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 18,
            margin: '0 0 18px',
          }}
        >
          {text.hero.marqueeHeading}
        </p>
        <div style={{ width: 430, overflow: 'hidden' }}>
          <div className="flex animate-marquee" style={{ gap: 48, alignItems: 'center', width: 'max-content' }}>
            {[...INSTITUTIONS, ...INSTITUTIONS].map((inst, i) => (
              <a
                key={i}
                href={inst.href}
                target="_blank"
                rel="noreferrer"
                style={{ flexShrink: 0, display: 'flex', alignItems: 'center', opacity: 0.7, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
              >
                <img
                  src={inst.svg}
                  alt={inst.name}
                  style={{ height: 44, width: 'auto', maxWidth: 280, filter: 'brightness(0) invert(1)' }}
                />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom-right: bio */}
      <motion.div
        className="hero-footer-right"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ borderLeft: '2px solid rgba(255,255,255,0.25)', paddingLeft: 18 }}
      >
        <p
          style={{
            fontFamily: 'Satoshi, MiSans, sans-serif',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: 2,
            color: 'rgba(255,255,255,0.50)',
            margin: '0 0 10px',
          }}
        >
          {text.hero.bioEyebrow}
        </p>
        <p
          style={{
            fontFamily: 'Satoshi, MiSans, sans-serif',
            color: '#fff',
            fontSize: 21,
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          <span style={{ fontWeight: 700 }}>{text.hero.bioName}</span>
          {lang !== 'zh' && ' '}
          {text.hero.bio}
        </p>
      </motion.div>
    </section>
  )
}
