import { useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Code2,
  Layers,
  Database,
  Server,
  BookOpen,
  Cpu,
  Globe,
  GitBranch,
  BrainCircuit,
  Sparkles,
  FlaskConical,
} from 'lucide-react';
import { SiDotnet, SiSpring, SiReact, SiOracle, SiMysql, SiPython, SiTailwindcss } from 'react-icons/si';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Tech item pill
// ---------------------------------------------------------------------------

function TechPill({ icon: Icon, label, learning = false, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1',
        'text-[11px] font-medium',
        learning
          ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
          : 'border-zinc-700/60 bg-zinc-800/60 text-zinc-300',
        className,
      )}
    >
      {Icon && <Icon size={11} className="shrink-0" />}
      {label}
      {learning && (
        <span className="ml-0.5 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-400">
          aprendendo
        </span>
      )}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Spotlight card — tracks mouse for a CSS radial-gradient glow
// ---------------------------------------------------------------------------

function SpotlightCard({ children, className, glowColor = '168,85,247', ...rest }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--gx', `${x}%`);
    el.style.setProperty('--gy', `${y}%`);
    el.style.setProperty('--gi', '1');
  }, []);

  const handleMouseLeave = useCallback(() => {
    cardRef.current?.style.setProperty('--gi', '0');
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border',
        'bg-zinc-900/50 backdrop-blur-sm',
        'transition-shadow duration-300',
        // CSS-var spotlight overlay
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl',
        'before:opacity-[var(--gi,0)] before:transition-opacity before:duration-300',
        className,
      )}
      style={{
        '--glow': `rgba(${glowColor},0.12)`,
      }}
      {...rest}
    >
      {/* Spotlight layer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(400px circle at var(--gx,50%) var(--gy,50%), var(--glow), transparent 70%)',
          opacity: 'var(--gi, 0)',
        }}
      />
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section variant
// ---------------------------------------------------------------------------

const containerV = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const headerV = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const cardV = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

// ---------------------------------------------------------------------------
// Individual bento cards
// ---------------------------------------------------------------------------

function EducationCard() {
  return (
    <SpotlightCard
      glowColor="168,85,247"
      className={cn(
        'col-span-1 md:col-span-3 row-span-1 md:row-span-2',
        'flex flex-col justify-between gap-6 p-7',
        'border-purple-500/25',
        'hover:shadow-[0_0_56px_rgba(168,85,247,0.14)]',
      )}
    >
      {/* Watermark icon */}
      <GraduationCap
        size={72}
        strokeWidth={1}
        className="absolute -right-4 -top-4 rotate-12 text-purple-500/8 select-none"
      />

      {/* Header */}
      <div className="flex flex-col gap-3">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-purple-300">
          <GraduationCap size={11} />
          Formação Acadêmica
        </span>
        <h3 className="text-2xl font-extrabold leading-tight text-zinc-50">
          Ciência da{' '}
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Computação
          </span>
        </h3>
        <p className="text-sm font-semibold text-zinc-400">
          Unisinos — Universidade do Vale dos Sinos
        </p>
      </div>

      {/* Body */}
      <p className="text-sm leading-relaxed text-zinc-400">
        Formação escolhida para unir a visão operacional da infraestrutura com
        a{' '}
        <span className="font-medium text-zinc-200">lógica matemática</span>,{' '}
        <span className="font-medium text-zinc-200">algoritmos avançados</span>{' '}
        e os fundamentos de arquitetura computacional necessários para construir
        software de qualidade.
      </p>

      {/* Focus areas */}
      <div className="flex flex-wrap gap-2">
        {[
          { icon: Cpu,        label: 'Algoritmos & Estruturas' },
          { icon: BookOpen,   label: 'Eng. de Software' },
          { icon: Layers,     label: 'Arquitetura Computacional' },
          { icon: FlaskConical, label: 'Matemática Discreta' },
        ].map(({ icon: Icon, label }) => (
          <TechPill key={label} icon={Icon} label={label} />
        ))}
      </div>

      {/* Current stack */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
          Stack em estudo ativo
        </p>
        <div className="flex flex-wrap gap-2">
          <TechPill icon={SiSpring}   label="Java · Spring Boot" />
          <TechPill icon={SiReact}    label="ReactJS" />
          <TechPill icon={SiMysql}    label="MySQL" />
          <TechPill icon={SiPython}   label="Python · ML" learning />
        </div>
      </div>
    </SpotlightCard>
  );
}

function BackendCard() {
  return (
    <SpotlightCard
      glowColor="139,92,246"
      className={cn(
        'col-span-1 md:col-span-3',
        'flex flex-col gap-5 p-7',
        'border-violet-500/25',
        'hover:shadow-[0_0_48px_rgba(139,92,246,0.13)]',
      )}
    >
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-violet-300">
          <Code2 size={11} />
          Backend & Integração
        </span>
        <h3 className="mt-3 text-lg font-bold text-zinc-100">
          Desenvolvimento de Sistemas Robustos
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-zinc-400">
          Stack principal para construção de APIs, serviços de integração e
          soluções empresariais com foco em manutenibilidade e performance.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <TechPill icon={SiDotnet}  label=".NET Core · C#" />
        <TechPill icon={Code2}     label="Entity Framework" />
        <TechPill icon={Layers}    label="Magic XPA" />
        <TechPill icon={Globe}     label="API REST" />
        <TechPill icon={GitBranch} label="Design Patterns" />
      </div>
    </SpotlightCard>
  );
}

function FrontendCard() {
  return (
    <SpotlightCard
      glowColor="217,70,239"
      className={cn(
        'col-span-1 md:col-span-2',
        'flex flex-col gap-5 p-6',
        'border-fuchsia-500/25',
        'hover:shadow-[0_0_40px_rgba(217,70,239,0.12)]',
      )}
    >
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-fuchsia-300">
        <Globe size={11} />
        Frontend
      </span>
      <div>
        <h3 className="text-base font-bold text-zinc-100">Interfaces Modernas</h3>
        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
          Componentes performáticos com animações fluidas e design system escalável.
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <TechPill icon={SiReact}        label="ReactJS" />
        <TechPill icon={SiTailwindcss}  label="Tailwind CSS v4" />
        <TechPill icon={Sparkles}       label="Framer Motion" />
      </div>
    </SpotlightCard>
  );
}

function DatabaseCard() {
  return (
    <SpotlightCard
      glowColor="56,189,248"
      className={cn(
        'col-span-1 md:col-span-2',
        'flex flex-col gap-5 p-6',
        'border-sky-500/25',
        'hover:shadow-[0_0_40px_rgba(56,189,248,0.10)]',
      )}
    >
      {/* Watermark */}
      <Database
        size={56}
        strokeWidth={1}
        className="absolute right-4 bottom-4 text-sky-500/8 select-none"
      />

      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-sky-300">
        <Database size={11} />
        Bancos de Dados
      </span>
      <div>
        <h3 className="text-base font-bold text-zinc-100">Administração Avançada</h3>
        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
          2 anos administrando ambientes críticos — diagnóstico de locks,
          deadlocks e otimização de queries em produção.
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <TechPill icon={SiOracle} label="Oracle 11g – 18c" />
        <TechPill icon={Database} label="SQL Server" />
        <TechPill icon={SiMysql}  label="MySQL" />
      </div>
    </SpotlightCard>
  );
}

function InfraCard() {
  return (
    <SpotlightCard
      glowColor="52,211,153"
      className={cn(
        'col-span-1 md:col-span-2',
        'flex flex-col gap-5 p-6',
        'border-emerald-500/25',
        'hover:shadow-[0_0_40px_rgba(52,211,153,0.10)]',
      )}
    >
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
        <Server size={11} />
        Infra & Ferramentas
      </span>
      <div>
        <h3 className="text-base font-bold text-zinc-100">Fundação Operacional</h3>
        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
          Da configuração de servidores a migrações para nuvem — a base que
          diferencia um dev que entende de sistemas.
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <TechPill icon={Server}      label="Windows Server · IIS" />
        <TechPill icon={GitBranch}   label="Git" />
        <TechPill icon={Globe}       label="Cloud Migration" />
        <TechPill icon={BrainCircuit} label="Python · ML" learning />
      </div>
    </SpotlightCard>
  );
}

// ---------------------------------------------------------------------------
// TechStack Section
// ---------------------------------------------------------------------------

export default function TechStack({ id }) {
  return (
    <section
      id={id}
      className={cn('relative flex flex-col items-center px-6 py-28')}
    >
      {/* Section header */}
      <motion.div
        variants={containerV}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-16 flex max-w-2xl flex-col items-center gap-4 text-center"
      >
        <motion.span
          variants={headerV}
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-300"
        >
          <Cpu size={12} />
          Habilidades Técnicas
        </motion.span>

        <motion.h2
          variants={headerV}
          className="text-4xl font-extrabold tracking-tight text-zinc-50 md:text-5xl"
        >
          Stack &{' '}
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Formação.
          </span>
        </motion.h2>

        <motion.p
          variants={headerV}
          className="text-base leading-relaxed text-zinc-400 md:text-lg"
        >
          Tecnologias dominadas em produção, complementadas por uma{' '}
          base acadêmica sólida e aprendizado contínuo.
        </motion.p>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        variants={containerV}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className={cn(
          'w-full max-w-5xl',
          'grid grid-cols-1 gap-4',
          'md:grid-cols-6 md:grid-rows-[auto_auto]',
        )}
      >
        {/* Large: Education — md col 1-3, rows 1-2 */}
        <motion.div variants={cardV} className="md:col-span-3 md:row-span-2">
          <EducationCard />
        </motion.div>

        {/* Medium: Backend — md col 4-6, row 1 */}
        <motion.div variants={cardV} className="md:col-span-3">
          <BackendCard />
        </motion.div>

        {/* Small: Frontend — md col 4-5, row 2 */}
        <motion.div variants={cardV} className="md:col-span-2">
          <FrontendCard />
        </motion.div>

        {/* Small: Databases — md col 5-6 … reflow as 2-wide */}
        <motion.div variants={cardV} className="md:col-span-2">
          <DatabaseCard />
        </motion.div>

        {/* Small: Infra — md col … 2-wide remainder */}
        <motion.div variants={cardV} className="md:col-span-2">
          <InfraCard />
        </motion.div>
      </motion.div>
    </section>
  );
}
