import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  forwardRef,
  useCallback,
} from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

// ── images ──────────────────────────────────────────────────────────────────
const BACK1 = 'https://qclay.design/lovable/synergy/back-3-1.png'
const BACK2 = 'https://qclay.design/lovable/synergy/back-3-2.png'
const BACK3 = 'https://qclay.design/lovable/synergy/back-3-3.png'

// ── small logo mark ──────────────────────────────────────────────────────────
function ZLMark({ size = 22, invert = false }: { size?: number; invert?: boolean }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Satoshi, MiSans, sans-serif',
        fontSize: Math.round(size * 0.5),
        fontWeight: 700,
        color: invert ? '#000' : '#fff',
      }}
    >
      ZL
    </div>
  )
}

// ── Card 1: Game Development ─────────────────────────────────────────────────
function Card1({ isInView }: { isInView: boolean }) {
  const { text } = useLang()
  const questions = text.projects.card1.questions
  const [qIdx, setQIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setQIdx(i => (i + 1) % questions.length), 4000)
    return () => clearInterval(interval)
  }, [questions.length])

  const q = questions[qIdx]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      style={{ flex: 1, minHeight: 560, borderRadius: 24, overflow: 'hidden', position: 'relative' }}
    >
      <img src={BACK1} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.30)' }} />

      {/* Glass card */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 24,
          right: 24,
          zIndex: 2,
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.20)',
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(56px)',
          WebkitBackdropFilter: 'blur(56px)',
          padding: 20,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ZLMark size={20} invert />
          </div>
          <span style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 16, fontWeight: 500, color: '#fff' }}>
            Ziqi Lu
          </span>
        </div>

        <div style={{ width: '100%', borderTop: '1px dashed rgba(255,255,255,0.20)', marginBottom: 16 }} />

        {/* Rotating Q&A */}
        <div style={{ position: 'relative', height: 160 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={qIdx}
              exit={{ opacity: 0, filter: 'blur(8px)', y: -6 }}
              initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 16, fontWeight: 500, color: '#fff', marginBottom: 12, lineHeight: 1.4, margin: '0 0 12px' }}>
                {q.q}
              </p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ZLMark size={12} />
                </div>
                <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 12, fontWeight: 400, lineHeight: 1.6, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                  {q.a}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
          <button
            style={{
              fontFamily: 'Satoshi, MiSans, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#fff',
              color: '#000',
              fontSize: 13,
              fontWeight: 500,
              padding: '6px 6px 6px 16px',
              borderRadius: 9999,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {text.projects.card1.btn}
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUpRight size={12} color="#fff" />
            </div>
          </button>
          <a href="https://assassin-plus.itch.io" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.80)', textDecoration: 'underline', cursor: 'pointer' }}>
            {text.projects.card1.link}
          </a>
        </div>
      </div>

      {/* Bottom title/desc */}
      <div style={{ position: 'absolute', bottom: 28, left: 24, right: 24, zIndex: 2 }}>
        <p style={{ fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontSize: 26, fontWeight: 400, color: '#fff', marginBottom: 8, margin: '0 0 8px' }}>
          {text.projects.card1.title}
        </p>
        <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0 }}>
          {text.projects.card1.desc}
        </p>
      </div>
    </motion.div>
  )
}

// ── Card 2: Graphics Research ────────────────────────────────────────────────
function Card2({ isInView }: { isInView: boolean }) {
  const { text } = useLang()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
      style={{ flex: 1, minHeight: 560, borderRadius: 24, overflow: 'hidden', position: 'relative' }}
    >
      <img src={BACK2} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.20)' }} />

      {/* Tag */}
      <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 2, fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: 1.5, color: 'rgba(255,255,255,0.70)', textDecoration: 'underline' }}>
        {text.projects.card2.tag}
      </div>

      {/* White info block — hugs the image, sized to its content */}
      <div
        style={{
          position: 'absolute', top: 32, left: 24, right: 24, zIndex: 2,
          borderRadius: 20, background: 'rgba(255,255,255,0.92)', padding: '14px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}
      >
        <motion.img
          src={`${import.meta.env.BASE_URL}graphical-models.jpg`}
          alt="Graphical Models journal"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          style={{ width: '78%', maxWidth: 200, display: 'block', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}
        />

        {/* Tip pill */}
        <div
          style={{
            borderRadius: 9999,
            border: '1px solid rgba(0,0,0,0.12)',
            background: 'rgba(255,255,255,0.80)',
            backdropFilter: 'blur(8px)',
            padding: '8px 16px',
            fontFamily: 'Satoshi, MiSans, sans-serif',
            fontSize: 11,
            color: 'rgba(0,0,0,0.60)',
            textAlign: 'center',
          }}
        >
          {text.projects.card2.tip}
        </div>
      </div>

      {/* Bottom title/desc */}
      <div style={{ position: 'absolute', bottom: 28, left: 24, right: 24, zIndex: 2 }}>
        <p style={{ fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontSize: 26, fontWeight: 400, color: '#fff', marginBottom: 8, margin: '0 0 8px' }}>
          {text.projects.card2.title}
        </p>
        <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0 }}>
          {text.projects.card2.desc}
        </p>
      </div>
    </motion.div>
  )
}

// ── Card 3 tree nodes ────────────────────────────────────────────────────────
type NodeAProps = { children: React.ReactNode; delay: number; isInView: boolean }
const NodeA = forwardRef<HTMLDivElement, NodeAProps>(function NodeA({ children, delay, isInView }, ref) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      style={{
        borderRadius: 9999,
        border: '1px solid rgba(255,255,255,0.25)',
        background: 'rgba(255,255,255,0.10)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '10px 20px',
        fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif',
        fontStyle: 'italic',
        fontSize: 16,
        color: '#fff',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </motion.div>
  )
})

type NodeBProps = { children: React.ReactNode; delay: number; isInView: boolean }
const NodeB = forwardRef<HTMLDivElement, NodeBProps>(function NodeB({ children, delay, isInView }, ref) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      style={{
        borderRadius: 12,
        background: 'rgba(255,255,255,0.92)',
        padding: '10px 16px',
        fontFamily: 'Satoshi, MiSans, sans-serif',
        fontSize: 12,
        fontWeight: 400,
        color: 'rgba(0,0,0,0.75)',
        lineHeight: 1.5,
        display: 'inline-block',
        maxWidth: 160,
      }}
    >
      {children}
    </motion.div>
  )
})

// ── Connector SVG ────────────────────────────────────────────────────────────
type Connector = { from: string; to: string; delay: number }

function CategorizationTree({ isInView }: { isInView: boolean }) {
  const { text } = useLang()
  const nodes = text.projects.card3.nodes

  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({})

  type Point = { botX: number; botY: number; topX: number; topY: number }
  const [pts, setPts] = useState<Record<string, Point>>({})
  const [size, setSize] = useState({ w: 0, h: 0 })

  const measure = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const cRect = container.getBoundingClientRect()
    setSize({ w: cRect.width, h: cRect.height })
    const next: Record<string, Point> = {}
    for (const [id, el] of Object.entries(nodeRefs.current)) {
      if (!el) continue
      const r = el.getBoundingClientRect()
      next[id] = {
        botX: r.left - cRect.left + r.width / 2,
        botY: r.bottom - cRect.top,
        topX: r.left - cRect.left + r.width / 2,
        topY: r.top - cRect.top,
      }
    }
    setPts(next)
  }, [])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure, nodes])

  const connectors: Connector[] = [
    { from: 'root', to: 'left', delay: 0.25 },
    { from: 'root', to: 'right', delay: 0.4 },
    { from: 'left', to: 'leftDetail', delay: 0.6 },
    { from: 'right', to: 'rightDetail', delay: 0.78 },
    { from: 'root', to: 'bottom', delay: 0.95 },
    { from: 'bottom', to: 'bottomDetail', delay: 1.15 },
  ]

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, zIndex: 2 }}>
      {/* Row 1 */}
      <NodeA ref={el => { nodeRefs.current['root'] = el }} delay={0} isInView={isInView}>{nodes.root}</NodeA>

      {/* Row 2 */}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ transform: 'translateX(-12px)' }}>
          <NodeA ref={el => { nodeRefs.current['left'] = el }} delay={0.18} isInView={isInView}>{nodes.left}</NodeA>
        </div>
        <NodeA ref={el => { nodeRefs.current['right'] = el }} delay={0.36} isInView={isInView}>{nodes.right}</NodeA>
      </div>

      {/* Row 3 */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <NodeB ref={el => { nodeRefs.current['leftDetail'] = el }} delay={0.54} isInView={isInView}>{nodes.leftDetail}</NodeB>
        <NodeB ref={el => { nodeRefs.current['rightDetail'] = el }} delay={0.72} isInView={isInView}>{nodes.rightDetail}</NodeB>
      </div>

      {/* Row 4 */}
      <NodeA ref={el => { nodeRefs.current['bottom'] = el }} delay={0.9} isInView={isInView}>{nodes.bottom}</NodeA>

      {/* Row 5 */}
      <NodeB ref={el => { nodeRefs.current['bottomDetail'] = el }} delay={1.08} isInView={isInView}>{nodes.bottomDetail}</NodeB>

      {/* SVG connector overlay */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}
        width={size.w}
        height={size.h}
      >
        {connectors.map((c, i) => {
          const from = pts[c.from]
          const to = pts[c.to]
          if (!from || !to) return null
          const x1 = from.botX, y1 = from.botY, x2 = to.topX, y2 = to.topY
          const midY = (y1 + y2) / 2
          const pathId = `tree-path-${i}`
          const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`
          return (
            <g key={i}>
              <motion.path
                id={pathId}
                d={d}
                stroke="rgba(255,255,255,0.35)"
                strokeWidth={1}
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, ease: 'easeOut', delay: c.delay }}
              />
              <motion.circle
                cx={x2} cy={y2} r={2.5} fill="rgba(255,255,255,0.9)"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: c.delay + 0.5 }}
              />
              {/* Traveling glow dot */}
              <motion.circle
                r={3}
                fill="#fff"
                style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: [0, 1, 1, 0] } : {}}
                transition={{ duration: 2.4, delay: c.delay + 0.6, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut', times: [0, 0.1, 0.9, 1] }}
              >
                <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${c.delay + 0.6}s`}>
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </motion.circle>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── Card 3: Technical Art ────────────────────────────────────────────────────
function Card3({ isInView }: { isInView: boolean }) {
  const { text } = useLang()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
      style={{ flex: 1, minHeight: 560, borderRadius: 24, overflow: 'hidden', position: 'relative' }}
    >
      <img src={BACK3} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.30)' }} />

      <div style={{ position: 'absolute', top: 32, left: 16, right: 16, bottom: 110, zIndex: 2 }}>
        <CategorizationTree isInView={isInView} />
      </div>

      {/* Bottom title/desc */}
      <div style={{ position: 'absolute', bottom: 28, left: 24, right: 24, zIndex: 2 }}>
        <p style={{ fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontSize: 26, fontWeight: 400, color: '#fff', marginBottom: 8, margin: '0 0 8px' }}>
          {text.projects.card3.title}
        </p>
        <p style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0 }}>
          {text.projects.card3.desc}
        </p>
      </div>
    </motion.div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────
export default function Projects() {
  const { text } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="works" className="section-padded" style={{ background: '#000' }}>
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
          {text.projects.eyebrow}
        </p>
        <motion.h2
          initial={{ opacity: 0, filter: 'blur(12px)', y: 30 }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ margin: 0, color: '#fff' }}
        >
          <span className="section-title-span" style={{ fontFamily: 'Satoshi, MiSans, sans-serif', fontWeight: 400, lineHeight: 1, letterSpacing: -1.02, display: 'inline' }}>
            {text.projects.title1}{' '}
          </span>
          <span className="section-title-span" style={{ fontFamily: '"Bigola Display", AlimamaShuHeiTi, serif', fontStyle: 'italic', fontWeight: 400, lineHeight: 1, letterSpacing: -1.02, display: 'inline' }}>
            {text.projects.title2}
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
            lineHeight: 1.6,
            textAlign: 'center',
            marginTop: 16,
          }}
        >
          {text.projects.sub}
        </motion.p>
      </div>

      {/* Cards */}
      <div className="cards-row">
        <Card1 isInView={isInView} />
        <Card2 isInView={isInView} />
        <Card3 isInView={isInView} />
      </div>
    </section>
  )
}
