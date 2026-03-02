import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  GitBranch,
  ExternalLink,
  Database,
  Globe,
  BarChart2,
  FileCheck2,
  Layers,
  BrainCircuit,
  Webhook,
  CalendarCheck,
  CreditCard,
  LineChart,
  ImageOff,
} from 'lucide-react';
import Carousel from '@/components/react-bits/carousel/Carousel';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Project data
// ---------------------------------------------------------------------------

const PROJECTS = [
  {
    id: 'mtr',
    number: '01',
    title: 'Automação MTR · FEPAM',
    tagline: 'Compliance ambiental governamental em escala',
    description:
      'Arquitetura robusta em .NET (C#) e Entity Framework para automação do manifesto de transporte de resíduos, integrando APIs governamentais e eliminando gargalos operacionais no faturamento.',
    accent: 'purple',
    tags: ['.NET Core', 'C#', 'Entity Framework', 'Oracle', 'SQL Server', 'API REST', 'Magic XPA'],
    githubUrl: '#',
    placeholder: {
      label: 'Diagrama de Arquitetura / Fluxo de Processo',
      gradient: 'from-purple-900/60 via-zinc-900 to-zinc-900',
      pattern: 'purple',
    },
    slides: [
      {
        id: 1,
        icon: <FileCheck2 className="carousel-icon" />,
        title: 'Integração Governamental',
        description: 'Consumo automatizado da API do MTR/FEPAM com retry, circuit-breaker e logging estruturado.',
      },
      {
        id: 2,
        icon: <Database className="carousel-icon" />,
        title: 'Persistência & Performance',
        description: 'Mapeamento ORM via Entity Framework sobre Oracle e SQL Server com queries otimizadas.',
      },
      {
        id: 3,
        icon: <Layers className="carousel-icon" />,
        title: 'Design Patterns',
        description: 'Repository, Strategy e Unit of Work garantindo código testável e de fácil manutenção.',
      },
    ],
  },
  {
    id: 'nutri',
    number: '02',
    title: 'App Nutri',
    tagline: 'Gestão fullstack de saúde e bem-estar',
    description:
      'Sistema completo de agendamento e acompanhamento para clínicas de nutrição e treinamento, com módulos de pagamento via PIX, notificações automatizadas e gestão de prontuários de pacientes.',
    accent: 'violet',
    tags: ['Java', 'Spring Boot', 'React', 'MySQL', 'PIX API', 'REST'],
    githubUrl: '#',
    placeholder: {
      label: 'Dashboard · Agendamento · Pagamento',
      gradient: 'from-violet-900/60 via-zinc-900 to-zinc-900',
      pattern: 'violet',
    },
    slides: [
      {
        id: 1,
        icon: <CalendarCheck className="carousel-icon" />,
        title: 'Agendamento Online',
        description: 'Fluxo de booking com confirmação em tempo real, conflito de horários e cancelamento inteligente.',
      },
      {
        id: 2,
        icon: <CreditCard className="carousel-icon" />,
        title: 'Pagamento via PIX',
        description: 'Integração direta com API PIX — geração de QR Code, webhook de confirmação e reconciliação.',
      },
      {
        id: 3,
        icon: <Globe className="carousel-icon" />,
        title: 'Portal do Paciente',
        description: 'Dashboard React com histórico de consultas, prontuário e métricas de evolução.',
      },
    ],
  },
  {
    id: 'ml',
    number: '03',
    title: 'Inteligência de Dados & ML',
    tagline: 'Explorações acadêmicas com impacto prático',
    description:
      'Aplicação de algoritmos de Machine Learning supervisionado e não supervisionado para análise de grandes volumes de dados, unindo a base matemática da Unisinos com soluções práticas em Python.',
    accent: 'fuchsia',
    tags: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
    githubUrl: '#',
    placeholder: {
      label: 'Gráficos de Dados · Mapas de Correlação',
      gradient: 'from-fuchsia-900/60 via-zinc-900 to-zinc-900',
      pattern: 'fuchsia',
    },
    slides: [
      {
        id: 1,
        icon: <BrainCircuit className="carousel-icon" />,
        title: 'Aprendizado Supervisionado',
        description: 'Classificação e regressão com Random Forest, SVM e validação cruzada k-fold.',
      },
      {
        id: 2,
        icon: <LineChart className="carousel-icon" />,
        title: 'Visualização de Dados',
        description: 'Pipelines de análise exploratória com Pandas, Matplotlib e Seaborn para insights acionáveis.',
      },
      {
        id: 3,
        icon: <BarChart2 className="carousel-icon" />,
        title: 'Clusterização',
        description: 'K-Means e DBSCAN para segmentação não supervisionada com avaliação por silhueta.',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Accent tokens
// ---------------------------------------------------------------------------

const ACCENT = {
  purple: {
    border:    'border-purple-500/25',
    tag:       'bg-purple-500/10 text-purple-300 border-purple-500/20',
    glow:      'hover:shadow-[0_0_48px_rgba(168,85,247,0.13)]',
    number:    'text-purple-500/30',
    badge:     'text-purple-400',
    btnBorder: 'border-purple-500/40 hover:border-purple-400/70 hover:bg-purple-500/10',
    dot:       'bg-purple-500',
    gridLine:  'rgba(168,85,247,0.08)',
  },
  violet: {
    border:    'border-violet-500/25',
    tag:       'bg-violet-500/10 text-violet-300 border-violet-500/20',
    glow:      'hover:shadow-[0_0_48px_rgba(139,92,246,0.13)]',
    number:    'text-violet-500/30',
    badge:     'text-violet-400',
    btnBorder: 'border-violet-500/40 hover:border-violet-400/70 hover:bg-violet-500/10',
    dot:       'bg-violet-500',
    gridLine:  'rgba(139,92,246,0.08)',
  },
  fuchsia: {
    border:    'border-fuchsia-500/25',
    tag:       'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20',
    glow:      'hover:shadow-[0_0_48px_rgba(217,70,239,0.13)]',
    number:    'text-fuchsia-500/30',
    badge:     'text-fuchsia-400',
    btnBorder: 'border-fuchsia-500/40 hover:border-fuchsia-400/70 hover:bg-fuchsia-500/10',
    dot:       'bg-fuchsia-500',
    gridLine:  'rgba(217,70,239,0.08)',
  },
};

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.16 } },
};

const headerVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};

// ---------------------------------------------------------------------------
// ImagePlaceholder — swap src for real screenshots later
// ---------------------------------------------------------------------------

function ImagePlaceholder({ project }) {
  const a = ACCENT[project.accent];
  return (
    <div
      className={cn(
        'relative flex h-60 w-full items-center justify-center overflow-hidden rounded-xl',
        'border border-zinc-800/60 bg-gradient-to-br',
        project.placeholder.gradient,
      )}
      style={{
        backgroundImage: `radial-gradient(circle at 30% 50%, ${a.gridLine} 0%, transparent 60%)`,
      }}
    >
      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(${a.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${a.gridLine} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      {/* Placeholder label */}
      <div className="relative flex flex-col items-center gap-2 text-center px-4">
        <ImageOff size={22} className="text-zinc-600" />
        <p className="text-[11px] font-medium text-zinc-600 leading-snug max-w-[160px]">
          {project.placeholder.label}
        </p>
      </div>
      {/* Number watermark */}
      <span
        className={cn(
          'absolute right-4 top-3 font-black text-5xl leading-none select-none',
          a.number,
        )}
      >
        {project.number}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// GitHub button
// ---------------------------------------------------------------------------

function GithubButton({ url, accent }) {
  const a = ACCENT[accent];
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className={cn(
        'flex items-center gap-2 rounded-xl border px-4 py-2.5',
        'text-xs font-semibold text-zinc-300',
        'bg-transparent transition-colors duration-200',
        a.btnBorder,
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500',
      )}
    >
      <GitBranch size={14} className="opacity-70" />
      Ver no GitHub
      <ExternalLink size={12} className="opacity-50" />
    </motion.a>
  );
}

// ---------------------------------------------------------------------------
// ProjectCard
// ---------------------------------------------------------------------------

function ProjectCard({ project }) {
  const a = ACCENT[project.accent];
  // Measure card content width to feed into Carousel's baseWidth
  const cardRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(480);

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      // card padding is p-8 (32px each side = 64px total)
      const contentWidth = entry.contentRect.width - 64;
      if (contentWidth > 0) setCarouselWidth(Math.floor(contentWidth));
    });
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.article
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className={cn(
          'group flex flex-col gap-6 rounded-2xl border p-8',
          'bg-zinc-900/50 backdrop-blur-sm',
          'transition-shadow duration-300',
          a.border,
          a.glow,
        )}
      >
        {/* Image / screenshot area */}
        <ImagePlaceholder project={project} />

        {/* Title + tagline */}
        <div>
          <p className={cn('text-[11px] font-semibold uppercase tracking-widest', a.badge)}>
            {project.tagline}
          </p>
          <h3 className="mt-1 text-2xl font-bold text-zinc-100 leading-snug">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200">
          {project.description}
        </p>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                'rounded-full border px-3 py-1 text-[11px] font-medium',
                a.tag,
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── Carousel — feature highlight slides ── */}
        <div className="w-full overflow-hidden rounded-xl">
          <Carousel
            items={project.slides}
            baseWidth={carouselWidth}
            autoplay
            autoplayDelay={3200}
            pauseOnHover
            loop
            round={false}
          />
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-1">
          <GithubButton url={project.githubUrl} accent={project.accent} />
          <span className={cn('text-xs font-medium', a.badge)}>
            Caso de Estudo
          </span>
        </div>
      </motion.article>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Projects Section
// ---------------------------------------------------------------------------

export default function Projects({ id }) {
  return (
    <section
      id={id}
      className={cn('relative px-6 py-28 flex flex-col items-center')}
    >
      {/* Section header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-16 flex max-w-2xl flex-col items-center gap-4 text-center"
      >
        <motion.span
          variants={headerVariants}
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-300"
        >
          <Webhook size={12} />
          Projetos em Destaque
        </motion.span>

        <motion.h2
          variants={headerVariants}
          className="text-4xl font-extrabold tracking-tight text-zinc-50 md:text-5xl"
        >
          Casos de{' '}
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Estudo.
          </span>
        </motion.h2>

        <motion.p
          variants={headerVariants}
          className="text-base leading-relaxed text-zinc-400 md:text-lg"
        >
          Soluções construídas com intenção — da arquitetura ao deploy,
          cada decisão técnica tem um porquê.
        </motion.p>
      </motion.div>

      {/* Cards grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 gap-8 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
