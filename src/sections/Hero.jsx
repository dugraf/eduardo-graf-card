import { motion } from 'motion/react';
import { ArrowDown, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

/** Container that staggers its children on mount. */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.2,
    },
  },
};

/** Each child slides up and fades in. */
const itemVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/** Subtle float on hover / snap on tap for CTA buttons. */
const buttonHover = { y: -3, scale: 1.03 };
const buttonTap   = { scale: 0.97 };
const buttonSpring = { type: 'spring', stiffness: 400, damping: 20 };

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function OverlineBadge({ children }) {
  return (
    <motion.div variants={itemVariants}>
      <span
        className={cn(
          'inline-flex items-center gap-2',
          'rounded-full border border-purple-500/30 bg-purple-500/10',
          'px-4 py-1.5 text-xs font-semibold uppercase tracking-widest',
          'text-purple-300 backdrop-blur-sm',
        )}
      >
        {/* Pulsing dot */}
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />
        </span>
        {children}
      </span>
    </motion.div>
  );
}

function Headline() {
  return (
    <motion.h1
      variants={itemVariants}
      className={cn(
        'text-5xl font-extrabold leading-tight tracking-tight text-zinc-50',
        'md:text-6xl lg:text-7xl',
      )}
    >
      Desenvolvedor Fullstack{' '}
      <br className="hidden sm:block" />
      com{' '}
      <span
        className={cn(
          'relative inline-block',
          // Gradient text
          'bg-gradient-to-r from-purple-400 via-violet-400 to-purple-300',
          'bg-clip-text text-transparent',
        )}
      >
        DNA de Infraestrutura.
        {/* Underline accent */}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-purple-500/80 to-transparent"
        />
      </span>
    </motion.h1>
  );
}

function Subheadline() {
  return (
    <motion.p
      variants={itemVariants}
      className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg"
    >
      Estudante de{' '}
      <span className="font-medium text-zinc-200">Ciência da Computação na Unisinos</span>{' '}
      e Desenvolvedor Junior com{' '}
      <span className="font-medium text-zinc-200">2 anos de experiência em infraestrutura crítica</span>.{' '}
      Hoje traduzo essa resiliência operacional em soluções sólidas e escaláveis
      usando{' '}
      <span className="font-medium text-purple-300">.NET</span>,{' '}
      <span className="font-medium text-purple-300">Java</span> e{' '}
      <span className="font-medium text-purple-300">Magic XPA</span>.
    </motion.p>
  );
}

function CTAButtons({ onVerProjetos }) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
    >
      {/* Primary — glassmorphism */}
      <motion.button
        whileHover={buttonHover}
        whileTap={buttonTap}
        transition={buttonSpring}
        onClick={onVerProjetos}
        className={cn(
          'flex items-center gap-2 rounded-xl px-7 py-3.5',
          'border border-purple-500/40 bg-purple-600/20 backdrop-blur-md',
          'text-sm font-semibold text-purple-100',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_24px_rgba(168,85,247,0.18)]',
          'hover:bg-purple-600/30 hover:shadow-[0_0_32px_rgba(168,85,247,0.32)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
          'transition-colors duration-200',
        )}
      >
        Ver Projetos
        <ArrowDown size={15} className="opacity-80" />
      </motion.button>

      {/* Secondary — outline */}
      <motion.a
        whileHover={buttonHover}
        whileTap={buttonTap}
        transition={buttonSpring}
        href="/cv-eduardo-graf.pdf"
        download
        className={cn(
          'flex items-center gap-2 rounded-xl px-7 py-3.5',
          'border border-zinc-700 bg-transparent',
          'text-sm font-semibold text-zinc-300',
          'hover:border-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500',
          'transition-colors duration-200',
        )}
      >
        Baixar CV
        <Download size={15} className="opacity-80" />
      </motion.a>
    </motion.div>
  );
}

/** Animated arrow that bounces to hint at scrollability. */
function ScrollHint() {
  return (
    <motion.div
      variants={itemVariants}
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
      className="flex flex-col items-center gap-1.5 text-zinc-600"
    >
      <span className="text-[10px] uppercase tracking-widest">scroll</span>
      <ArrowDown size={14} />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------

/**
 * @param {object}   props
 * @param {string}   props.id              - Section ID for scroll targeting.
 * @param {function} props.onVerProjetos   - Callback to scroll to Projects section.
 */
export default function Hero({ id, onVerProjetos }) {
  return (
    <section
      id={id}
      className={cn(
        'relative flex min-h-screen flex-col items-center justify-center',
        'px-6 pb-24 pt-20',
      )}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex w-full max-w-4xl flex-col items-center gap-8 text-center"
      >
        {/* 1. Badge */}
        <OverlineBadge>Disponível para oportunidades</OverlineBadge>

        {/* 2. Headline */}
        <Headline />

        {/* 3. Subheadline */}
        <Subheadline />

        {/* 4. CTAs */}
        <CTAButtons onVerProjetos={onVerProjetos} />

        {/* 5. Scroll hint */}
        <ScrollHint />
      </motion.div>
    </section>
  );
}
