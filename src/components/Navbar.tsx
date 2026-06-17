import { useState } from 'react'
import { useLang } from '../context/LanguageContext'

const NAV_IDS = ['research', 'projects', 'works', 'about']
const RESUME_EN = 'https://assassin-plus.github.io/portfolio/uploads/resume.pdf'
const RESUME_ZH = 'https://assassin-plus.github.io/portfolio/zh/uploads/resume-zh.pdf'

export default function Navbar() {
  const { text, lang, toggleLang } = useLang()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '16px 32px',
      }}
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: 48 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, fontWeight: 700, color: '#000', letterSpacing: -0.5 }}>
              ZL
            </span>
          </div>
        </div>

        {/* Center pill nav */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(28,28,28,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 9999,
            padding: '6px 8px',
            display: 'flex',
            gap: 4,
          }}
        >
          {text.nav.items.map((item, i) => (
            <a
              key={item}
              href={`#${NAV_IDS[i]}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                fontFamily: 'Satoshi, MiSans, sans-serif',
                fontSize: 14,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.80)',
                padding: '8px 16px',
                borderRadius: 9999,
                textDecoration: 'none',
                background: hovered === i ? 'rgba(255,255,255,0.10)' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={toggleLang}
            style={{
              fontFamily: 'Satoshi, MiSans, sans-serif',
              fontSize: 13,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.70)',
              padding: '6px 12px',
              borderRadius: 9999,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.06)',
              cursor: 'pointer',
              letterSpacing: 0.5,
            }}
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
          <a
            href="mailto:ziqilu152@gmail.com"
            style={{
              fontFamily: 'Satoshi, MiSans, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.80)',
              padding: '8px 16px',
              textDecoration: 'none',
            }}
          >
            {text.nav.contact}
          </a>
          <a
            href={lang === 'zh' ? RESUME_ZH : RESUME_EN}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: 'Satoshi, MiSans, sans-serif',
              background: '#fff',
              color: '#000',
              fontSize: 14,
              fontWeight: 500,
              padding: '10px 20px',
              borderRadius: 9999,
              textDecoration: 'none',
            }}
          >
            {text.nav.cta}
          </a>
        </div>
      </div>
    </nav>
  )
}
