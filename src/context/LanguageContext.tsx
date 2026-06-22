import React, { createContext, useContext, useState } from 'react'

export type Lang = 'en' | 'zh'

export interface Translations {
  nav: {
    items: string[]
    contact: string
    cta: string
  }
  hero: {
    title1: string
    title2a: string
    title2b: string
    cta: string
    story: {
      slides: Array<{ line1: string; line2: string; line3: string }>
      pill: string
      commentPrompt: string
      commentCta: string
    }
    marqueeHeading: string
    bioEyebrow: string
    bioName: string
    bio: string
  }
  analytics: {
    eyebrow: string
    title1: string
    title2: string
    sub: string
    card1: {
      header: string
      period: string
      bars: Array<{ label: string; pct: number }>
      heading: string
      desc: string
    }
    card2: {
      tag: string
      caption: string
      btn: string
      heading: string
      desc: string
    }
  }
  projects: {
    eyebrow: string
    title1: string
    title2: string
    sub: string
    card1: {
      questions: Array<{ q: string; a: string }>
      btn: string
      link: string
      title: string
      desc: string
    }
    card2: {
      tag: string
      tip: string
      title: string
      desc: string
    }
    card3: {
      nodes: {
        root: string
        left: string
        right: string
        leftDetail: string
        rightDetail: string
        bottom: string
        bottomDetail: string
      }
      title: string
      desc: string
    }
  }
  experience: {
    eyebrow: string
    title1: string
    title2: string
    sub: string
    timeline: Array<{
      period: string
      institution: string
      role: string
      detail: string
      tag: string
      highlight?: string
      current?: boolean
    }>
    pub: {
      tag: string
      title: string
      subtitle: string
      desc: string
      doi: string
      doiLabel: string
      btn: string
    }
  }
  works: {
    eyebrow: string
    title1: string
    title2: string
    sub: string
    btn: string
    items: Array<{
      title: string
      category: string
      year: string
      desc: string
      link: string
    }>
  }
}

const en: Translations = {
  nav: {
    items: ['Experience', 'Projects', 'Works', 'About'],
    contact: 'Contact',
    cta: 'View resume',
  },
  hero: {
    title1: 'Bridging code and',
    title2a: 'creative ',
    title2b: 'artistry',
    cta: 'Explore my work',
    story: {
      slides: [
        { line1: 'Crafting', line2: 'immersive', line3: 'game worlds' },
        { line1: 'Researching', line2: 'procedural', line3: 'generation' },
      ],
      pill: 'Technical Artist',
      commentPrompt: 'Like what you see?',
      commentCta: 'Get in touch',
    },
    marqueeHeading: 'Studied & Researched at',
    bioEyebrow: 'ABOUT ME',
    bioName: 'Ziqi Lu',
    bio: 'is a Technical Art graduate student at University of Utah, building at the intersection of computer graphics, AI, and interactive media.',
  },
  analytics: {
    eyebrow: 'BACKGROUND',
    title1: 'Multidisciplinary',
    title2: 'journey',
    sub: 'From theoretical physics to real-time rendering, spanning science and creative technology',
    card1: {
      header: 'SKILLS OVERVIEW',
      period: 'SELF-RATED',
      bars: [
        { label: 'C / C++', pct: 100 },
        { label: 'Unreal Engine', pct: 95 },
        { label: 'Houdini', pct: 90 },
        { label: 'Substance Designer', pct: 80 },
        { label: 'Python', pct: 100 },
      ],
      heading: 'See the full picture of my background.',
      desc: "From Tsinghua's rigorous math-physics curriculum to Utah's cutting-edge game tech — every step builds toward the intersection of science and creative expression.",
    },
    card2: {
      tag: 'RECENT',
      caption: 'Projects completed',
      btn: 'View projects',
      heading: 'Skills across disciplines',
      desc: 'Proficient in rendering pipelines, procedural generation, real-time VFX, and AI-driven creative tools.',
    },
  },
  projects: {
    eyebrow: 'SELECTED WORKS',
    title1: 'Selected creative',
    title2: 'portfolio',
    sub: 'Game development, graphics research, and technical art — built with passion',
    card1: {
      questions: [
        {
          q: 'What makes Off Balance unique?',
          a: 'A physics-based roly-poly ball mechanic creates emergent gameplay. Custom Substance Designer materials and stylized VFX push the visual identity beyond typical student projects.',
        },
        {
          q: 'Tell me about Offbeat Reprise',
          a: 'A Unity side-scroller with bullet-time mechanics. Full combat systems, particle VFX, and responsive controls deliver a tight, kinetic shooter experience.',
        },
        {
          q: "What's Living Strokes about?",
          a: 'A VR puzzle game teaching Chinese characters through spatial interaction. Players trace strokes in 3D space, blending cultural education with immersive tech.',
        },
      ],
      btn: 'View projects',
      link: 'SEE ALL',
      title: 'Game Development',
      desc: 'Multiple shipped games across game jams, academic projects, and personal experiments.',
    },
    card2: {
      tag: 'PUBLISHED',
      tip: 'TerraCraft: City-scale procedural modeling via natural language (2025)',
      title: 'Graphics Research',
      desc: "Co-authored peer-reviewed research on AI-assisted procedural generation at Tsinghua's Graphics Lab.",
    },
    card3: {
      nodes: {
        root: 'Technical Art',
        left: 'Rendering',
        right: 'Effects',
        leftDetail: 'GLSL shaders, ray tracing, PBR pipelines',
        rightDetail: 'Houdini VFX, Niagara particles, stylized art',
        bottom: 'Procedural',
        bottomDetail: 'Terrain generation, city modeling, UE5 workflows',
      },
      title: 'Technical Art',
      desc: 'Bridging art and engineering — procedural workflows in Houdini and real-time VFX in Unreal Engine 5.',
    },
  },
  experience: {
    eyebrow: 'RESEARCH & EDUCATION',
    title1: 'Where curiosity',
    title2: 'meets discipline',
    sub: 'From theoretical physics to procedural generation — a journey through science, art, and code',
    timeline: [
      {
        period: '2021 — 2025',
        institution: 'Tsinghua University',
        role: 'B.Sc. Mathematics & Physics + Civil Engineering',
        detail: 'GPA 3.57 / 4.0  ·  Computer Graphics, AI, HPC, Digital Design',
        tag: 'EDUCATION',
      },
      {
        period: '2023 — 2024',
        institution: 'Tsinghua Graphics Lab',
        role: 'Research Assistant',
        detail: 'Advisors: Shi-Min Hu & Tai-Jiang Mu  ·  Graphics & Geometric Computing Group, Dept. of CS&T',
        tag: 'RESEARCH',
        highlight: 'Published: TerraCraft — City-scale generative procedural modeling (2025)',
      },
      {
        period: 'Jul — Sep 2024',
        institution: 'University of Utah',
        role: 'Research Intern',
        detail: 'Advisor: Yin Yang  ·  FlameGS: photo-realistic facial reconstruction via Gaussian Splatting + FLAME model, a combination of Deep Learning with Graphics techniques',
        tag: 'RESEARCH',
      },
      {
        period: 'May - Aug 2026',
        institution: 'Tencent IEG - Lightspeed Studio',
        role: 'AI Agent Developer Intern',
        detail: 'Interactive Entertainment Group · Lightspeed Studio · AI Agent pipeline development for game production workflows with PCG plugins',
        tag: 'INDUSTRY',
      },
      {
        period: '2025 — 2027',
        institution: 'University of Utah',
        role: 'M.S. Entertainment Art & Engineering',
        detail: 'Technical Art track  ·  Currently enrolled',
        tag: 'EDUCATION',
        current: true,
      },
    ],
    pub: {
      tag: 'PUBLISHED · Graphical Models 2025',
      title: 'TerraCraft',
      subtitle: 'City-scale Generative Procedural Modeling with Natural Languages',
      desc: 'A novel framework using Large Language Models to generate geometrically high-quality 3D city-scale scenes from natural text descriptions — validated through user studies and extensive experiments.',
      doi: 'https://doi.org/10.1016/j.gmod.2025.101285',
      doiLabel: 'DOI: 10.1016/j.gmod.2025.101285',
      btn: 'Read paper',
    },
  },
  works: {
    eyebrow: 'PROJECTS',
    title1: 'A collection of',
    title2: 'creative work',
    sub: 'Games, graphics research, technical art, and digital media',
    btn: 'View project',
    items: [
      {
        title: 'Off Balance',
        category: 'GAME DEV',
        year: '2025',
        desc: 'Physics-based roly-poly ball mechanic with procedural Substance Designer materials and stylized Niagara VFX.',
        link: '',
      },
      {
        title: 'Project Titan',
        category: 'TECHNICAL ART',
        year: '2025',
        desc: 'Houdini procedural pipeline — signage, building gen, VAT characters, cloth sim — integrated with UE5.',
        link: 'https://youtu.be/3nMkRwYM3fc',
      },
      {
        title: 'Offbeat Reprise',
        category: 'GAME DEV',
        year: '2025',
        desc: 'Unity side-scroller bullet-time shooter with full combat systems, particle VFX, and kinetic controls.',
        link: 'https://assassin-plus.itch.io',
      },
      {
        title: 'Living Strokes',
        category: 'GAME DEV · VR',
        year: '2025',
        desc: 'VR puzzle game teaching Chinese characters through immersive 3D spatial stroke tracing.',
        link: '',
      },
      {
        title: 'FlameGS',
        category: 'GRAPHICS RESEARCH',
        year: '2024',
        desc: 'Gaussian Splatting + FLAME parametric face model for photo-realistic facial reconstruction from monocular video.',
        link: '',
      },
      {
        title: 'MicroPT',
        category: 'GRAPHICS',
        year: '2022',
        desc: 'C++ path tracer with Stochastic Progressive Photon Mapping, BVH acceleration, and modern microfacet materials.',
        link: 'https://github.com/Assassin-plus/micropt',
      },
    ],
  },
}

const zh: Translations = {
  nav: {
    items: ['经历', '项目', '作品', '关于'],
    contact: '联系',
    cta: '查看简历',
  },
  hero: {
    title1: '技术与艺术',
    title2a: '创意的 ',
    title2b: '交汇点',
    cta: '探索我的作品',
    story: {
      slides: [
        { line1: '构建', line2: '沉浸式', line3: '游戏世界' },
        { line1: '研究', line2: '程序化', line3: '生成技术' },
      ],
      pill: '技术美术',
      commentPrompt: '喜欢这些作品吗？',
      commentCta: '联系我',
    },
    marqueeHeading: '就读与研究于',
    bioEyebrow: '关于我',
    bioName: '卢子期',
    bio: '是犹他大学娱乐艺术与工程专业研究生，专注于计算机图形学、AI 与交互媒体的交叉领域。',
  },
  analytics: {
    eyebrow: '背景',
    title1: '跨学科',
    title2: '探索之旅',
    sub: '从理论物理到实时渲染，横跨科学与创意技术',
    card1: {
      header: '技能概览',
      period: '自评',
      bars: [
        { label: 'C / C++', pct: 100 },
        { label: 'Unreal Engine', pct: 95 },
        { label: 'Houdini', pct: 90 },
        { label: 'Substance Designer', pct: 80 },
        { label: 'Python', pct: 100 },
      ],
      heading: '全面了解我的学习历程。',
      desc: '从清华大学严谨的数理课程到犹他大学前沿的游戏技术项目——每一步都指向科学与创意表达的交汇点。',
    },
    card2: {
      tag: '最新',
      caption: '已完成项目数',
      btn: '查看项目',
      heading: '跨领域技能',
      desc: '精通渲染管线、程序化生成、实时特效及 AI 驱动的创意工具。',
    },
  },
  projects: {
    eyebrow: '精选作品',
    title1: '精选创意',
    title2: '作品集',
    sub: '游戏开发、图形学研究与技术美术——以热情打造',
    card1: {
      questions: [
        {
          q: 'Off Balance 有什么独特之处？',
          a: '基于物理的不倒翁球力学创造涌现式玩法。定制的 Substance Designer 材质和风格化特效让视觉表现超越一般学生项目。',
        },
        {
          q: 'Offbeat Reprise 是什么？',
          a: '一款 Unity 横版射击游戏，具备子弹时间机制、完整战斗系统、粒子特效和流畅操控，提供紧张刺激的射击体验。',
        },
        {
          q: 'Living Strokes 是关于什么的？',
          a: '一款通过空间交互教授中文汉字的 VR 益智游戏。玩家在三维空间中描绘笔画，将文化教育与沉浸技术融为一体。',
        },
      ],
      btn: '查看项目',
      link: '查看全部',
      title: '游戏开发',
      desc: '在游戏创作节、学术项目和个人实验中完成多款游戏作品。',
    },
    card2: {
      tag: '已发表',
      tip: 'TerraCraft：基于自然语言的城市规模程序化建模（2025）',
      title: '图形学研究',
      desc: '在清华大学图形与几何计算研究组共同发表了关于 AI 辅助程序化生成的同行评审研究。',
    },
    card3: {
      nodes: {
        root: '技术美术',
        left: '渲染',
        right: '特效',
        leftDetail: 'GLSL 着色器，光追，PBR 管线',
        rightDetail: 'Houdini VFX，Niagara 粒子，风格化',
        bottom: '程序化',
        bottomDetail: '地形生成，城市建模，UE5 工作流',
      },
      title: '技术美术',
      desc: '连接艺术与工程——Houdini 程序化工作流与虚幻引擎 5 实时特效。',
    },
  },
  experience: {
    eyebrow: '研究与教育',
    title1: '好奇心与',
    title2: '严谨并行',
    sub: '从理论物理到程序化生成——一段穿越科学、艺术与代码的旅程',
    timeline: [
      {
        period: '2021 — 2025',
        institution: '清华大学',
        role: '数学与物理学 + 土木工程与系统 本科',
        detail: '绩点 3.57 / 4.0  ·  计算机图形学、人工智能、高性能计算、数字设计',
        tag: '教育',
      },
      {
        period: '2023 — 2024',
        institution: '清华大学图形与几何计算组',
        role: '科研助理',
        detail: '导师：胡事民 & 穆太江  ·  计算机系图形与几何计算组',
        tag: '研究',
        highlight: '已发表：TerraCraft——基于自然语言的城市规模程序化建模（2025）',
      },
      {
        period: '2024 年 7—9 月',
        institution: '犹他大学',
        role: '科研实习生',
        detail: '导师：杨忻  ·  FlameGS：基于高斯散点与 FLAME 模型的照片级真实人脸重建',
        tag: '研究',
      },
      {
        period: '2025 年',
        institution: '腾讯 IEG · 光子工作室',
        role: '技术实习生 — AI Agent 开发',
        detail: '互动娱乐事业群 · 光子工作室 · 面向游戏制作工作流的 AI Agent 流程开发',
        tag: '行业',
      },
      {
        period: '2025 — 2027',
        institution: '犹他大学',
        role: '娱乐艺术与工程 硕士',
        detail: '技术美术方向  ·  在读',
        tag: '教育',
        current: true,
      },
    ],
    pub: {
      tag: '已发表 · Graphical Models 2025',
      title: 'TerraCraft',
      subtitle: '基于自然语言的城市规模生成式程序化建模',
      desc: '一种利用大语言模型从自然语言描述生成几何高质量城市级三维场景的新框架——通过用户研究和大量实验验证其有效性。',
      doi: 'https://doi.org/10.1016/j.gmod.2025.101285',
      doiLabel: 'DOI: 10.1016/j.gmod.2025.101285',
      btn: '阅读论文',
    },
  },
  works: {
    eyebrow: '作品',
    title1: '一份跨媒介的',
    title2: '创作合集',
    sub: '游戏、图形学研究、技术美术与数字媒体',
    btn: '查看详情',
    items: [
      {
        title: 'Off Balance',
        category: '游戏开发',
        year: '2025',
        desc: '以人体尺度不倒翁球为操控核心的物理游戏，配以程序化 Substance Designer 材质与 Niagara 风格化特效。',
        link: '',
      },
      {
        title: 'Project Titan',
        category: '技术美术',
        year: '2025',
        desc: 'Houdini 程序化流水线——标牌生成、建筑生成、VAT 角色、布料模拟——完整集成至 UE5。',
        link: 'https://youtu.be/3nMkRwYM3fc',
      },
      {
        title: 'Offbeat Reprise',
        category: '游戏开发',
        year: '2025',
        desc: 'Unity 横版子弹时间射击游戏，完整战斗系统、粒子特效、流畅操控，提供紧张刺激的射击体验。',
        link: 'https://assassin-plus.itch.io',
      },
      {
        title: 'Living Strokes',
        category: '游戏开发 · VR',
        year: '2025',
        desc: '通过沉浸式三维空间笔画描绘教授中文汉字的 VR 益智游戏。',
        link: '',
      },
      {
        title: 'FlameGS',
        category: '图形学研究',
        year: '2024',
        desc: '高斯散点 + FLAME 参数化人脸模型，实现从单目视频进行照片级真实人脸重建。',
        link: '',
      },
      {
        title: 'Micro-PT',
        category: '图形学',
        year: '2022',
        desc: 'C++ 路径追踪器，支持随机渐进光子映射、BVH 加速和现代微表面材质。',
        link: 'https://github.com/Assassin-plus/micropt',
      },
    ],
  },
}

export const translations: Record<Lang, Translations> = { en, zh }

interface LanguageContextType {
  lang: Lang
  toggleLang: () => void
  text: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLang: () => {},
  text: en,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => (l === 'en' ? 'zh' : 'en'))
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, text: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
