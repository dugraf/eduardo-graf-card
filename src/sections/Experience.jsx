import { motion } from 'motion/react';
import { Code2, Server, GraduationCap, CheckCircle2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const TIMELINE = [
  {
    id: 'dev',
    period: '2024 — Presente',
    company: 'Desenvolvedor Júnior',
    role: 'Backend & Integração de Sistemas',
    tags: ['.NET Core', 'C#', 'Magic XPA', 'Oracle', 'SQL Server', 'API REST'],
    Icon: Code2,
    accent: 'purple',
    highlight: {
      label: 'Projeto de Destaque',
      text: 'MTR · FEPAM — Automação de Compliance Ambiental',
    },
    bullets: [
      'Arquitetura e desenvolvimento em .NET (C#) + Entity Framework para consumo automatizado da API governamental do MTR/FEPAM, garantindo conformidade no transporte de resíduos.',
      'Customizações críticas em Magic XPA e construção de serviços backend resilientes aplicando Design Patterns (Repository, Strategy) sobre bases Oracle e SQL Server.',
      'Automação de processos operacionais que eliminou etapas manuais em fluxos de compliance regulatório.',
    ],
  },
  {
    id: 'infra',
    period: '2022 — 2024',
    company: 'Analista de Infraestrutura de TI',
    role: '2 Anos em Ambientes Críticos',
    tags: ['Oracle 11g–18c', 'SQL Server', 'IIS', 'Data Pump', 'Cloud Migration'],
    Icon: Server,
    accent: 'violet',
    bullets: [
      'Administração e otimização de performance em ambientes Oracle (11g a 18c) e SQL Server — diagnóstico proativo de locks e deadlocks para garantir alta disponibilidade.',
      'Automação de estratégias de backup com Oracle Data Pump, implantação de ERP, configuração de IIS e liderança de migrações On-premise → Cloud com redução mensurável de latência e custos.',
      'Experiência operacional que hoje fundamenta decisões de arquitetura de código: escrevo software com a mentalidade de quem sabe o que acontece quando ele vai a produção.',
    ],
  },
  {
    id: 'edu',
    period: '2023 — Em andamento',
    company: 'Unisinos',
    role: 'Bacharelado em Ciência da Computação',
    tags: ['Java', 'Spring Boot', 'ReactJS', 'MySQL', 'Machine Learning', 'Python'],
    Icon: GraduationCap,
    accent: 'fuchsia',
    bullets: [
      'Formação em Ciência da Computação escolhida para unir a lógica operacional adquirida na infraestrutura com a base matemática e algorítmica necessária para construir software de qualidade.',
      'Estudos ativos em Java (Spring Boot) e ReactJS para ampliar o domínio fullstack, com foco crescente em Machine Learning com Python.',
      'Uma das principais universidades de tecnologia do Brasil — integrando teoria e prática no mesmo ambiente profissional.',
    ],
  },
];

// ---------------------------------------------------------------------------
// Design tokens per accent colour
// ---------------------------------------------------------------------------

const ACCENT = {
  purple: {
    border:      'border-purple-500/30',
    iconRing:    'border-purple-500/40 bg-purple-500/10',
    iconColor:   'text-purple-400',
    tagBg:       'bg-purple-500/10 text-purple-300 border-purple-500/20',
    glow:        'hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]',
    dot:         'bg-purple-500',
    line:        'from-purple-500/60',
    bullet:      'text-purple-400',
  },
  violet: {
    border:      'border-violet-500/30',
    iconRing:    'border-violet-500/40 bg-violet-500/10',
    iconColor:   'text-violet-400',
    tagBg:       'bg-violet-500/10 text-violet-300 border-violet-500/20',
    glow:        'hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]',
    dot:         'bg-violet-500',
    line:        'from-violet-500/60',
    bullet:      'text-violet-400',
  },
  fuchsia: {
    border:      'border-fuchsia-500/30',
    iconRing:    'border-fuchsia-500/40 bg-fuchsia-500/10',
    iconColor:   'text-fuchsia-400',
    tagBg:       'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20',
    glow:        'hover:shadow-[0_0_40px_rgba(217,70,239,0.12)]',
    dot:         'bg-fuchsia-500',
    line:        'from-fuchsia-500/60',
    bullet:      'text-fuchsia-400',
  },
};

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const sectionVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const headerVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

// Cards slide in from left on mobile, alternating sides on desktop
const cardVariants = (index) => ({
  hidden:  { opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 10 },
  visible: {
    opacity: 1, x: 0, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  },
});

// ---------------------------------------------------------------------------
// TimelineCard
// ---------------------------------------------------------------------------

function TimelineCard({ entry, index }) {
  const a = ACCENT[entry.accent];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={cardVariants(index)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn(
        'md:col-span-1',
        isEven ? 'md:col-start-1' : 'md:col-start-3',
      )}
    >
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className={cn(
          'group relative flex flex-col gap-5 rounded-2xl border p-6',
          'bg-zinc-900/50 backdrop-blur-sm',
          'transition-shadow duration-300',
          a.border,
          a.glow,
        )}
      >
        {/* Top row: icon + period */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
              a.iconRing,
            )}
          >
            <entry.Icon size={20} className={a.iconColor} />
          </div>
          <span className="shrink-0 rounded-full border border-zinc-700/60 bg-zinc-800/60 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-400">
            {entry.period}
          </span>
        </div>

        {/* Company + role */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
            {entry.company}
          </p>
          <h3 className="mt-0.5 text-lg font-bold text-zinc-100 leading-snug">
            {entry.role}
          </h3>
        </div>

        {/* Featured project highlight badge */}
        {entry.highlight && (
          <div
            className={cn(
              'flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5',
              'border-purple-500/25 bg-purple-500/8',
            )}
          >
            <Star size={13} className="mt-0.5 shrink-0 fill-purple-400 text-purple-400" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-purple-400">
                {entry.highlight.label}
              </p>
              <p className="mt-0.5 text-xs font-medium text-purple-200 leading-snug">
                {entry.highlight.text}
              </p>
            </div>
          </div>
        )}

        {/* Bullet points */}
        <ul className="flex flex-col gap-2.5">
          {entry.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle2
                size={14}
                className={cn('mt-0.5 shrink-0', a.bullet)}
              />
              <span className="text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200">
                {b}
              </span>
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
                a.tagBg,
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Corner shine on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,0%), rgba(255,255,255,0.03) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Connector dot (sits on the centre spine, desktop only)
// ---------------------------------------------------------------------------

function SpineDot({ accent, index }) {
  const a = ACCENT[accent];
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: 0.1 * index, duration: 0.4, ease: 'backOut' }}
      className="relative hidden md:flex md:col-start-2 md:items-center md:justify-center"
    >
      {/* Vertical connector line (above, except first) */}
      {index > 0 && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute bottom-1/2 left-1/2 -translate-x-1/2',
            'w-px h-full bg-gradient-to-b from-zinc-700/0 via-zinc-700/60 to-zinc-700/0',
          )}
        />
      )}
      {/* Dot */}
      <span
        className={cn(
          'relative z-10 flex h-4 w-4 items-center justify-center rounded-full',
          a.dot,
          'ring-4 ring-zinc-950',
        )}
      >
        <span className={cn('h-2 w-2 rounded-full bg-white/40')} />
      </span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Experience Section
// ---------------------------------------------------------------------------

export default function Experience({ id }) {
  return (
    <section
      id={id}
      className={cn(
        'relative px-6 py-28',
        'flex flex-col items-center',
      )}
    >
      {/* ── Section header ── */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-20 flex max-w-2xl flex-col items-center gap-4 text-center"
      >
        <motion.span
          variants={headerVariants}
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-300"
        >
          Jornada Profissional
        </motion.span>

        <motion.h2
          variants={headerVariants}
          className="text-4xl font-extrabold tracking-tight text-zinc-50 md:text-5xl"
        >
          Da Infraestrutura{' '}
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            ao Código.
          </span>
        </motion.h2>

        <motion.p
          variants={headerVariants}
          className="text-base leading-relaxed text-zinc-400 md:text-lg"
        >
          Cada etapa da minha carreira foi construída sobre a anterior — da
          confiabilidade operacional à escrita de software robusto.
        </motion.p>
      </motion.div>

      {/* ── Timeline grid ── */}
      {/*
        Layout:
          Mobile  — single column, cards stacked
          Desktop — 3-col grid: [card col] [spine col] [card col]
                    Even-index cards → col 1 | Odd-index → col 3
                    Spine dots centre on col 2
      */}
      <div className="w-full max-w-5xl">
        {/* Mobile: simple stack */}
        <div className="flex flex-col gap-6 md:hidden">
          {TIMELINE.map((entry, index) => (
            <TimelineCard key={entry.id} entry={entry} index={index} />
          ))}
        </div>

        {/* Desktop: 3-column alternating grid */}
        <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:gap-x-6 md:gap-y-10 md:items-center">
          {TIMELINE.map((entry, index) => (
            <div
              key={entry.id}
              className="contents"
            >
              {/* Left column — even entries */}
              {index % 2 === 0 ? (
                <TimelineCard entry={entry} index={index} />
              ) : (
                <div /> /* spacer */
              )}

              {/* Centre spine dot */}
              <SpineDot accent={entry.accent} index={index} />

              {/* Right column — odd entries */}
              {index % 2 !== 0 ? (
                <TimelineCard entry={entry} index={index} />
              ) : (
                <div /> /* spacer */
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
