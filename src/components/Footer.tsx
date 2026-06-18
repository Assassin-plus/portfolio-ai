import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/assassin-plus' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ziqi-lu-b53064218/' },
  { label: 'itch.io', href: 'https://assassin-plus.itch.io' },
  { label: 'Portfolio (Hugo)', href: 'https://assassin-plus.github.io/portfolio/' },
]

const NAV_EN = ['Experience', 'Projects', 'Works', 'About']
const NAV_ZH = ['经历', '项目', '作品', '关于']
const NAV_IDS = ['research', 'projects', 'works', 'about']

export default function Footer() {
  const { lang } = useLang()
  const navItems = lang === 'zh' ? NAV_ZH : NAV_EN

  const emailText = lang === 'zh' ? '邮件联系' : 'Get in touch'
  const copy = lang === 'zh'
    ? '© 2025 卢子期 · 犹他大学娱乐艺术与工程'
    : '© 2025 Ziqi Lu · University of Utah EAE'

  return (
    <footer id="contact" style={{ background: `linear-gradient(180deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.86) 45%, rgba(0,0,0,0.92) 100%), url(${import.meta.env.BASE_URL}bg-footer.jpg) center / cover no-repeat #0a0a0a`, borderTop: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,48px) clamp(32px,4vw,48px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 40, marginBottom: 64 }}>

          {/* Left: name + email CTA */}
          <div>
            <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 12, fontWeight: 500, letterSpacing: 2, color: 'rgba(255,255,255,0.40)', marginBottom: 16, margin: '0 0 16px' }}>
              {lang === 'zh' ? '联系方式' : 'CONTACT'}
            </p>
            <h2 style={{ fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 400, color: '#fff', margin: '0 0 24px', lineHeight: 1.1 }}>
              {lang === 'zh' ? '期待合作' : "Let's work\ntogether"}
            </h2>
            <a
              href="mailto:1071973361az@gmail.com"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 15, fontWeight: 500,
                color: '#000', background: '#fff',
                padding: '10px 10px 10px 22px', borderRadius: 9999, textDecoration: 'none',
              }}
            >
              {emailText}
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowUpRight size={15} color="#fff" strokeWidth={2.5} />
              </div>
            </a>
          </div>

          {/* Right: nav links + social links */}
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: 2, color: 'rgba(255,255,255,0.35)', marginBottom: 16, margin: '0 0 16px' }}>
                {lang === 'zh' ? '导航' : 'NAVIGATION'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {navItems.map((item, i) => (
                  <a
                    key={item}
                    href={`#${NAV_IDS[i]}`}
                    style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: 2, color: 'rgba(255,255,255,0.35)', marginBottom: 16, margin: '0 0 16px' }}>
                {lang === 'zh' ? '社交' : 'LINKS'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {LINKS.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                  >
                    {link.label}
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.30)' }}>
            {copy}
          </span>
          <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.30)' }}>
            1071973361az@gmail.com
          </span>
        </div>

      </div>
    </footer>
  )
}
