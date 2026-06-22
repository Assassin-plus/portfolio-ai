import { useLayoutEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import Navbar from './Navbar'
import Footer from './Footer'
import { WORKS_IMAGES, WORKS_VIDEOS, WORKS_SLUGS, CATEGORY_COLORS, slugToIndex } from '../data/works'

// Hero media: shows the image immediately, crossfades to the video once it can play.
function HeroMedia({ img, video, title }: { img: string; video?: string; title: string }) {
  const [ready, setReady] = useState(false)
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      {video && (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setReady(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />
      )}
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const { text } = useLang()
  const i = slugToIndex(slug)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (i < 0) return <Navigate to="/" replace />

  const item = text.works.items[i]
  const d = item.detail
  const labels = text.works.detail
  const accent = CATEGORY_COLORS[item.category] ?? '#fff'
  const MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', 'Cascadia Mono', Consolas, monospace"
  const allLinks = d.links

  return (
    <div style={{ background: '#0c0906', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section
        className="section-padded"
        style={{
          position: 'relative',
          paddingTop: 'clamp(120px, 14vh, 180px)',
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accent}22 0%, rgba(12,9,6,0) 70%)`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Back link */}
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              textDecoration: 'none',
              marginBottom: 32,
            }}
          >
            <ArrowLeft size={14} /> {labels.back}
          </Link>

          {/* Eyebrow */}
          <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 12, fontWeight: 500, letterSpacing: 2, color: accent, margin: '0 0 16px' }}>
            {labels.eyebrow} · {item.category}
          </p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, filter: 'blur(12px)', y: 24 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ margin: 0, color: '#fff' }}
          >
            <span className="section-title-span" style={{ fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.02, letterSpacing: -1.02 }}>
              {item.title}
            </span>
          </motion.h1>

          {/* Tagline */}
          <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 'clamp(15px, 1.6vw, 19px)', color: 'rgba(255,255,255,0.62)', lineHeight: 1.6, margin: '18px 0 0', maxWidth: 720 }}>
            {d.tagline}
          </p>

          {/* Hero media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            style={{
              marginTop: 40,
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <HeroMedia img={WORKS_IMAGES[i]} video={WORKS_VIDEOS[i]} title={item.title} />
          </motion.div>
        </div>
      </section>

      {/* Body: about + details sidebar */}
      <section className="section-padded" style={{ paddingTop: 0 }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(220px, 300px)',
            gap: 'clamp(32px, 5vw, 72px)',
            alignItems: 'start',
          }}
          className="detail-grid"
        >
          {/* About */}
          <div>
            <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 12, fontWeight: 500, letterSpacing: 2, color: 'rgba(255,255,255,0.40)', margin: '0 0 20px' }}>
              {labels.about.toUpperCase()}
            </p>
            {d.paragraphs.map((p, idx) => (
              <p key={idx} style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 'clamp(15px, 1.5vw, 17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.8, margin: '0 0 20px' }}>
                {p}
              </p>
            ))}

            {/* Link buttons */}
            {allLinks.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
                {allLinks.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      fontFamily: 'Satoshi, MiSans, sans-serif',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#000',
                      background: '#fff',
                      padding: '10px 10px 10px 18px',
                      borderRadius: 9999,
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                    <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowUpRight size={13} color="#fff" />
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Details sidebar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 20 }}>
            <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 12, fontWeight: 500, letterSpacing: 2, color: 'rgba(255,255,255,0.40)', margin: '0 0 20px' }}>
              {labels.details.toUpperCase()}
            </p>
            <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {d.meta.map(m => (
                <div key={m.label}>
                  <dt style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 4 }}>
                    {m.label}
                  </dt>
                  <dd style={{ margin: 0, fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
