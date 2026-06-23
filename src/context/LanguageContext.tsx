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
    // ── 每个项目的文案 ────────────────────────────────────────────────
    // 改详情页文字就改这里的 `detail`。注意：下面的 en / zh 两份都要同步
    // 改，且数组长度/顺序保持一致，否则 TypeScript 会报错。
    items: Array<{
      title: string        // 详情页大标题 + Works 卡片名
      category: string     // 顶部 eyebrow 里的分类
      year: string
      desc: string         // Works 卡片上的描述（不显示在详情页）
      link: string         // 主要外链（保留字段，详情页按钮取自下方 detail.links）
      detail: {
        tagline: string                              // 标题下方的一句副标题
        paragraphs: string[]                         // “关于 / About” 正文，每个元素是一段
        meta: { label: string; value: string }[]     // 右侧“信息 / Details”栏，每行一个 标签:值
        links: { label: string; url: string }[]      // 正文下方的外链按钮（itch / GitHub / YouTube）
      }
    }>
    // 详情页的通用文案（不分项目）
    detail: {
      eyebrow: string      // 顶部小标签
      back: string         // 返回链接文字
      about: string        // 正文区标题
      details: string      // 右侧信息栏标题
      links: string
    }
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
          a: 'A small game built around a human-sized roly-poly toppling input. Custom Substance Designer materials, stylized VFX, and a procedurally generated chocolate waterfall push the visual identity beyond typical student projects.',
        },
        {
          q: 'Tell me about Offbeat Reprise',
          a: 'A Unity side-scroller with bullet-time mechanics. Full combat systems, particle VFX, and responsive controls deliver a tight, kinetic shooter experience.',
        },
        {
          q: "What's Living Strokes about?",
          a: 'A VR puzzle game teaching Chinese characters through spatial interaction. Players trace strokes in 3D space to cast abilities, blending cultural education with immersive tech.',
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
        detail: 'Interactive Entertainment Group · Lightspeed Studio · AI Agent pipeline development for procedural game production workflows with PCG plugins',
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
      desc: 'A novel framework using Large Language Models to generate geometrically high-quality 3D city-scale scenes from natural text descriptions.',
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
    detail: {
      eyebrow: 'PROJECT',
      back: 'Back to projects',
      about: 'About',
      details: 'Details',
      links: 'Links',
    },
    items: [
      {
        title: 'Off Balance',
        category: 'GAME DEV',
        year: '2025',
        desc: 'Physics-based roly-poly ball mechanic with procedural Substance Designer materials and stylized Niagara VFX.',
        link: '',
        detail: {
          tagline: 'Stylized environment art and real-time VFX for a physics-driven game world.',
          paragraphs: [
            'Off Balance focused on building stylized visual assets for a game environment. The core of the work was a set of procedural stylized textures authored in Substance Designer — metal grates, concrete, wood, and coated metal rust — with close attention to memory optimization through texture compression.',
            'Beyond surfacing, the project extended into real-time VFX built in Niagara, including stylized smoke and fire effects, alongside ocean materials crafted to elevate the environmental presentation of the scene.',
            'The project also includes a Houdini-based procedural pipeline for generating environment assets, including a flowmap-driven chocolate material and procedural geometry for the chocolate waterfall, lava, and lakes.',
          ],
          meta: [
            { label: 'Role', value: 'Environment / Technical Artist' },
            { label: 'Year', value: '2025' },
            { label: 'Category', value: 'Video Games' },
            { label: 'Tools', value: 'Substance Designer, Niagara, Houdini' },
          ],
          links: [],
        },
      },
      {
        title: 'Project Titan',
        category: 'TECHNICAL ART',
        year: '2025',
        desc: 'Houdini procedural pipeline — signage, building gen, VAT characters, cloth sim — integrated with UE5.',
        link: 'https://youtu.be/3nMkRwYM3fc',
        detail: {
          tagline: 'A technical study of Houdini procedural workflows, integrated into Unreal Engine 5.',
          paragraphs: [
            'Project Titan is a tutorial-based technical study and validation of Houdini’s procedural workflows, focused on recreating a 3D environment inside Unreal Engine 5.',
            'The work spans a wide range of procedural asset creation: signage, building generation, rail systems, train destruction effects, VAT characters, trees with wind effects, fences, platforms, shrubs, ivy, trains, cloth simulation, stacking mechanics, and cables.',
            'Replicating functionality from tutorials, the project built hands-on experience across procedural generation, material creation, VFX development, simulation optimization, and engine integration for complex game-environment production.',
          ],
          meta: [
            { label: 'Role', value: 'Technical Artist' },
            { label: 'Year', value: '2025' },
            { label: 'Category', value: 'Video Games' },
            { label: 'Tools', value: 'Houdini, Unreal Engine 5' },
          ],
          links: [
            { label: 'Watch on YouTube', url: 'https://youtu.be/3nMkRwYM3fc' },
          ],
        },
      },
      {
        title: 'Substrate Carpaint',
        category: 'TECHNICAL ART',
        year: '2025',
        desc: 'Layered car-paint material study — mean-free-path-based SSS, metallic flake, clearcoat, and thin-film interference, all authored procedurally and rendered in real time.',
        link: '',
        detail: {
          tagline: 'A physically based, real-time layered car-paint material.',
          paragraphs: [
            'Substrate Carpaint is a material study reproducing automotive paint as a layered surface: a metallic-flake base coat, a glossy clearcoat layer on top, wavelength-dependent thin-film interference, and a highlight and tint that shift across viewing angles.',
            'The shader is authored procedurally so its flake density, coat roughness, and color can be tuned freely, and it is built to render in real time — captured here as the rotating turntable on this page.',
          ],
          meta: [
            { label: 'Role', value: 'Technical Artist' },
            { label: 'Year', value: '2025' },
            { label: 'Category', value: 'Technical Art' },
            { label: 'Focus', value: 'Layered materials, real-time shading' },
          ],
          links: [],
        },
      },
      {
        title: 'Offbeat Reprise',
        category: 'GAME DEV',
        year: '2025',
        desc: 'Unity side-scroller bullet-time shooter with full combat systems, particle VFX, and kinetic controls.',
        link: 'https://assassin-plus.itch.io/offbeat-reprise',
        detail: {
          tagline: 'A low-poly side-scrolling rhythm shooter, built for the miHoYo Game Design Contest.',
          paragraphs: [
            'Offbeat Reprise is a Unity side-scroller that fuses bullet-time shooting with rhythm, wrapping full combat systems, particle VFX, and kinetic controls into a fast, music-led experience.',
            'The game was created for the miHoYo Game Design Contest and is released free to play in the browser. Its background music was generated with SunoAI (the project is AI-assisted, with AI audio).',
          ],
          meta: [
            { label: 'Role', value: 'Developer' },
            { label: 'Year', value: '2025' },
            { label: 'Engine', value: 'Unity (HTML5)' },
            { label: 'Genres', value: 'Shooter, Rhythm' },
          ],
          links: [
            { label: 'Play on itch.io', url: 'https://assassin-plus.itch.io/offbeat-reprise' },
          ],
        },
      },
      {
        title: 'Living Strokes',
        category: 'GAME DEV · VR',
        year: '2025',
        desc: 'VR puzzle game teaching Chinese characters through immersive 3D spatial stroke tracing.',
        link: 'https://xinyanwang.itch.io/living-strokes',
        detail: {
          tagline: 'Learning Chinese characters as interactive street art, in VR.',
          paragraphs: [
            'Living Strokes presents Chinese characters as interactive street art. Players spray characters onto a canvas — writing 火 ignites candles, 门 opens doors, and 木 causes logs to fall.',
            'Each character serves a dual purpose: environmental modification and puzzle resolution. The approach turns language learning from rote memorization into experiential, interactive problem-solving with lasting retention.',
          ],
          meta: [
            { label: 'Team', value: 'XinyanWang, Assassin-plus, eldoggo4200, Licor_Chang, Suii Li' },
            { label: 'Year', value: '2025' },
            { label: 'Platform', value: 'Windows (VR)' },
            { label: 'Genre', value: 'Puzzle' },
          ],
          links: [
            { label: 'Get it on itch.io', url: 'https://xinyanwang.itch.io/living-strokes' },
          ],
        },
      },
      {
        title: 'FlameGS',
        category: 'GRAPHICS RESEARCH',
        year: '2024',
        desc: 'Gaussian Splatting + FLAME parametric face model for photo-realistic facial reconstruction from monocular video.',
        link: '',
        detail: {
          tagline: 'Photo-realistic facial reconstruction from a single monocular video.',
          paragraphs: [
            'FlameGS combines 3D Gaussian Splatting with the FLAME parametric face model to reconstruct photo-realistic, animatable faces from ordinary monocular video.',
            'The FLAME model provides a controllable geometric prior for head shape and expression, while the Gaussian Splatting representation captures fine appearance detail and renders efficiently — bridging parametric control with high-fidelity, real-time-friendly rendering.',
          ],
          meta: [
            { label: 'Role', value: 'Graphics Researcher' },
            { label: 'Year', value: '2024' },
            { label: 'Category', value: 'Graphics Research' },
            { label: 'Topics', value: 'Gaussian Splatting, FLAME, face reconstruction' },
          ],
          links: [],
        },
      },
      {
        title: 'MicroPT',
        category: 'GRAPHICS',
        year: '2022',
        desc: 'C++ path tracer with Stochastic Progressive Photon Mapping, BVH acceleration, and modern microfacet materials.',
        link: 'https://github.com/Assassin-plus/micropt',
        detail: {
          tagline: 'A from-scratch C++ physically based renderer.',
          paragraphs: [
            'MicroPT is a C++ path tracer written from the ground up. It implements Stochastic Progressive Photon Mapping for robust handling of caustics and difficult light transport, BVH acceleration for fast ray–scene intersection, and a modern microfacet material model for physically plausible surfaces.',
            'The project is an exercise in the core of physically based rendering — sampling, acceleration structures, and energy-conserving BSDFs.',
          ],
          meta: [
            { label: 'Role', value: 'Author' },
            { label: 'Year', value: '2022' },
            { label: 'Category', value: 'Graphics' },
            { label: 'Tech', value: 'C++, SPPM, BVH, microfacet BSDFs' },
          ],
          links: [
            { label: 'Source on GitHub', url: 'https://github.com/Assassin-plus/micropt' },
          ],
        },
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
          a: '基于人型大小不倒翁输入的小游戏。定制的 Substance Designer 材质和风格化特效以及程序化生成巧克力瀑布让视觉表现超越一般学生项目。',
        },
        {
          q: 'Offbeat Reprise 是什么？',
          a: '一款 Unity 横版射击游戏，具备子弹时间机制、完整战斗系统、粒子特效和流畅操控，提供紧张刺激的射击体验。',
        },
        {
          q: 'Living Strokes 是关于什么的？',
          a: '一款通过空间交互教授中文汉字的 VR 益智游戏。玩家在三维空间中描绘笔画以释放技能，将文化教育与沉浸技术融为一体。',
        },
      ],
      btn: '查看项目',
      link: '查看全部',
      title: '游戏开发',
      desc: '在游戏黑客松、学术项目和个人实验中完成多款游戏作品。',
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
        detail: '导师：杨垠  ·  FlameGS：基于高斯泼溅 与 FLAME 模型的照片级真实人脸重建',
        tag: '研究',
      },
      {
        period: '2025 年',
        institution: '腾讯 IEG · 光子工作室',
        role: '技术实习生 — AI Agent 开发',
        detail: '互动娱乐事业群 · 光子工作室 · 面向游戏程序化制作工作流的 AI Agent 流程开发',
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
      desc: '一种利用大语言模型从自然语言描述生成几何高质量城市级三维场景的新框架。',
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
    detail: {
      eyebrow: '项目',
      back: '返回项目',
      about: '关于',
      details: '信息',
      links: '链接',
    },
    items: [
      {
        title: 'Off Balance',
        category: '游戏开发',
        year: '2025',
        desc: '以人体尺度不倒翁球为操控核心的物理游戏，配以程序化 Substance Designer 材质与 Niagara 风格化特效。',
        link: '',
        detail: {
          tagline: '为物理驱动的游戏世界打造风格化环境美术与实时特效。',
          paragraphs: [
            'Off Balance 聚焦于为游戏环境制作风格化的视觉资产。核心工作是一组在 Substance Designer 中制作的程序化风格化材质——金属格栅、混凝土、木材以及带涂层的金属锈蚀——并通过纹理压缩对内存占用进行了细致优化。',
            '在表面材质之外，项目还延伸到在 Niagara 中制作的实时特效，包括风格化的烟雾与火焰，以及为提升场景环境表现而制作的海洋材质。',
            '项目还包含一个基于 Houdini 的程序化流水线，用于生成环境资产，包括基于Flowmap的巧克力材质、巧克力瀑布岩浆湖泊几何生成',
          ],
          meta: [
            { label: '角色', value: '环境 / 技术美术' },
            { label: '年份', value: '2025' },
            { label: '类别', value: '电子游戏' },
            { label: '工具', value: 'Substance Designer、Niagara、Houdini' },
          ],
          links: [],
        },
      },
      {
        title: 'Project Titan',
        category: '技术美术',
        year: '2025',
        desc: 'Houdini 程序化流水线——标牌生成、建筑生成、VAT 角色、布料模拟——完整集成至 UE5。',
        link: 'https://youtu.be/3nMkRwYM3fc',
        detail: {
          tagline: '对 Houdini 程序化流程的技术研究，并集成进 Unreal Engine 5。',
          paragraphs: [
            'Project Titan 是一项基于教程的技术研究与验证，围绕 Houdini 的程序化工作流展开，目标是在 Unreal Engine 5 中重建一个 3D 环境。',
            '工作覆盖了大量程序化资产的制作：标牌、建筑生成、轨道系统、列车破坏效果、VAT 角色、带风力效果的树木、栅栏、平台、灌木、藤蔓、列车、布料模拟、堆叠机制以及线缆。',
            '在复刻教程功能的过程中，项目积累了程序化生成、材质制作、特效开发、模拟优化以及引擎集成等方面的实战经验，面向复杂游戏环境的生产流程。',
          ],
          meta: [
            { label: '角色', value: '技术美术' },
            { label: '年份', value: '2025' },
            { label: '类别', value: '电子游戏' },
            { label: '工具', value: 'Houdini、Unreal Engine 5' },
          ],
          links: [
            { label: '在 YouTube 观看', url: 'https://youtu.be/3nMkRwYM3fc' },
          ],
        },
      },
      {
        title: 'Substrate Carpaint',
        category: '技术美术',
        year: '2025',
        desc: '分层汽车漆材质研究——基于平均自由程的SSS、金属闪片、清漆层与薄膜干涉材质全程序化制作，实时渲染呈现。',
        link: '',
        detail: {
          tagline: '一套基于物理、实时渲染的分层汽车漆材质。',
          paragraphs: [
            'Substrate Carpaint 是一项材质研究，将汽车漆还原为分层的表面：带金属闪片的底色层、其上的高光清漆层、基于波长的薄膜干涉，以及随视角变化的高光与色调衰减。',
            '着色器以程序化方式制作，闪片密度、清漆粗糙度与颜色都可自由调节，并面向实时渲染——本页中以旋转转盘的形式呈现。',
          ],
          meta: [
            { label: '角色', value: '技术美术' },
            { label: '年份', value: '2025' },
            { label: '类别', value: '技术美术' },
            { label: '重点', value: '分层材质、实时着色' },
          ],
          links: [],
        },
      },
      {
        title: 'Offbeat Reprise',
        category: '游戏开发',
        year: '2025',
        desc: 'Unity 横版子弹时间射击游戏，完整战斗系统、粒子特效、流畅操控，提供紧张刺激的射击体验。',
        link: 'https://assassin-plus.itch.io/offbeat-reprise',
        detail: {
          tagline: '为米哈游游戏设计大赛打造的低多边形横版节奏射击游戏。',
          paragraphs: [
            'Offbeat Reprise 是一款将子弹时间射击与节奏玩法融合的 Unity 横版游戏，把完整的战斗系统、粒子特效与流畅操控整合进一场快节奏、以音乐为主导的体验。',
            '本作为米哈游游戏设计大赛而作，已发布并可在浏览器中免费游玩。背景音乐由 SunoAI 生成（项目为 AI 辅助，含 AI 音频）。',
          ],
          meta: [
            { label: '角色', value: '开发者' },
            { label: '年份', value: '2025' },
            { label: '引擎', value: 'Unity（HTML5）' },
            { label: '类型', value: '射击、节奏' },
          ],
          links: [
            { label: '在 itch.io 游玩', url: 'https://assassin-plus.itch.io/offbeat-reprise' },
          ],
        },
      },
      {
        title: 'Living Strokes',
        category: '游戏开发 · VR',
        year: '2025',
        desc: '通过沉浸式三维空间笔画描绘教授中文汉字的 VR 益智游戏。',
        link: 'https://xinyanwang.itch.io/living-strokes',
        detail: {
          tagline: '在 VR 中，把学习汉字变成可交互的街头艺术。',
          paragraphs: [
            'Living Strokes 将中文汉字呈现为可交互的街头艺术。玩家把汉字喷涂到画布上——写「火」点燃蜡烛，写「门」打开门扉，写「木」让原木落下。',
            '每个汉字都承担双重作用：改变环境与解开谜题。这种方式把语言学习从死记硬背转变为可体验、可交互的解谜过程，记忆更加持久。',
          ],
          meta: [
            { label: '团队', value: 'XinyanWang、Assassin-plus、eldoggo4200、Licor_Chang、Suii Li' },
            { label: '年份', value: '2025' },
            { label: '平台', value: 'Windows（VR）' },
            { label: '类型', value: '益智' },
          ],
          links: [
            { label: '在 itch.io 获取', url: 'https://xinyanwang.itch.io/living-strokes' },
          ],
        },
      },
      {
        title: 'FlameGS',
        category: '图形学研究',
        year: '2024',
        desc: '高斯散点 + FLAME 参数化人脸模型，实现从单目视频进行照片级真实人脸重建。',
        link: '',
        detail: {
          tagline: '从单段单目视频实现照片级真实的人脸重建。',
          paragraphs: [
            'FlameGS 将 3D 高斯散点与 FLAME 参数化人脸模型相结合，从普通的单目视频中重建出照片级真实、可驱动的人脸。',
            'FLAME 模型为头部形状与表情提供了可控的几何先验，而高斯散点表示则捕捉精细的外观细节并能高效渲染——在参数化控制与高保真、利于实时的渲染之间架起桥梁。',
          ],
          meta: [
            { label: '角色', value: '图形学研究' },
            { label: '年份', value: '2024' },
            { label: '类别', value: '图形学研究' },
            { label: '方向', value: '高斯散点、FLAME、人脸重建' },
          ],
          links: [],
        },
      },
      {
        title: 'Micro-PT',
        category: '图形学',
        year: '2022',
        desc: 'C++ 路径追踪器，支持随机渐进光子映射、BVH 加速和现代微表面材质。',
        link: 'https://github.com/Assassin-plus/micropt',
        detail: {
          tagline: '从零实现的 C++ 基于物理的渲染器。',
          paragraphs: [
            'MicroPT 是一个从零编写的 C++ 路径追踪器。它实现了随机渐进光子映射（SPPM）以稳健处理焦散与困难光路，使用 BVH 加速实现快速的光线—场景求交，并采用现代微表面材质模型以获得符合物理的表面表现。',
            '该项目是对基于物理渲染核心的练习——采样、加速结构与能量守恒的 BSDF。',
          ],
          meta: [
            { label: '角色', value: '作者' },
            { label: '年份', value: '2022' },
            { label: '类别', value: '图形学' },
            { label: '技术', value: 'C++、SPPM、BVH、微表面 BSDF' },
          ],
          links: [
            { label: '在 GitHub 查看源码', url: 'https://github.com/Assassin-plus/micropt' },
          ],
        },
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
