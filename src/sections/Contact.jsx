import { useState, useRef, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import {
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Personal data — swap placeholders with real values
// ---------------------------------------------------------------------------
const EMAIL = 'eduardor.graf@hotmail.com';

const CONTACT_CARDS = [
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    sub: 'Perfil Profissional',
    href: 'https://linkedin.com/in/seu-perfil', // ← troque
    hasCopy: false,
    borderClass: 'border-blue-500/25 hover:border-blue-400/55',
    gradientClass: 'from-blue-500/15 to-blue-700/5',
    iconClass: 'text-blue-400',
    glowColor: '59 130 246', // RGB for drop-shadow
  },
  {
    id: 'github',
    icon: Github,
    label: 'GitHub',
    sub: 'dugraf',
    href: 'https://github.com/dugraf',
    hasCopy: false,
    borderClass: 'border-zinc-600/30 hover:border-zinc-400/55',
    gradientClass: 'from-zinc-600/15 to-zinc-800/5',
    iconClass: 'text-zinc-300',
    glowColor: '161 161 170',
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'WhatsApp',
    sub: 'Mensagem Direta',
    href: 'https://wa.me/5551XXXXXXXXX', // ← troque
    hasCopy: false,
    borderClass: 'border-emerald-500/25 hover:border-emerald-400/55',
    gradientClass: 'from-emerald-500/15 to-emerald-700/5',
    iconClass: 'text-emerald-400',
    glowColor: '52 211 153',
  },
  {
    id: 'email',
    icon: Mail,
    label: 'E-mail',
    sub: EMAIL,
    href: `mailto:${EMAIL}`,
    hasCopy: true,          // shows copy-to-clipboard toggle
    borderClass: 'border-purple-500/25 hover:border-purple-400/55',
    gradientClass: 'from-purple-500/15 to-fuchsia-700/5',
    iconClass: 'text-purple-400',
    glowColor: '168 85 247',
  },
];

// ---------------------------------------------------------------------------
// Magnetic wrapper — spring-animate card toward cursor
// ---------------------------------------------------------------------------
function MagneticCard({ children, strength = 0.25 }) {
  const ref = useRef(null);

  const x = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleMove = useCallback(
    (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    },
    [x, y, strength],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Single contact card
// ---------------------------------------------------------------------------
function ContactCard({ card }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <MagneticCard strength={0.2}>
      <motion.a
        href={card.href}
        target={card.id !== 'email' ? '_blank' : undefined}
        rel="noopener noreferrer"
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className={cn(
          'group relative flex items-center gap-5 overflow-hidden rounded-2xl border p-6',
          'bg-gradient-to-br backdrop-blur-sm',
          'transition-shadow duration-300',
          'hover:shadow-[0_0_32px_0_rgb(var(--glow)_/_0.22)]',
          card.borderClass,
          card.gradientClass,
        )}
        // CSS custom prop for dynamic glow color
        style={{ '--glow': card.glowColor }}
      >
        {/* Icon circle */}
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
            'border border-white/10 bg-zinc-900/60',
          )}
        >
          <card.icon size={22} className={card.iconClass} />
        </div>

        {/* Label / sub */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-zinc-100">{card.label}</p>
          <p className="mt-0.5 truncate text-xs text-zinc-500">{card.sub}</p>
        </div>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-2">
          {card.hasCopy && (
            <button
              onClick={handleCopy}
              aria-label="Copiar e-mail"
              className={cn(
                'rounded-lg border border-zinc-700/60 bg-zinc-800/60 p-2',
                'text-zinc-400 transition-colors hover:border-purple-500/50 hover:text-purple-300',
              )}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          )}
          <ArrowUpRight
            size={16}
            className="text-zinc-600 transition-colors group-hover:text-zinc-300"
          />
        </div>
      </motion.a>
    </MagneticCard>
  );
}

// ---------------------------------------------------------------------------
// Animation variants — consistent with all other sections
// ---------------------------------------------------------------------------
const containerV = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemV = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export default function Contact({ id }) {
  return (
    <section
      id={id}
      className="relative flex flex-col items-center px-6 py-28"
    >
      {/* Ambient glow behind section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-px max-w-2xl bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-28 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-600/10 blur-3xl"
      />

      {/* ── Header ── */}
      <motion.div
        variants={containerV}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-16 flex max-w-2xl flex-col items-center gap-4 text-center"
      >
        <motion.span
          variants={itemV}
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-300"
        >
          <Mail size={12} />
          Contato
        </motion.span>

        <motion.h2
          variants={itemV}
          className="text-4xl font-extrabold tracking-tight text-zinc-50 md:text-5xl"
        >
          Vamos{' '}
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            conversar?
          </span>
        </motion.h2>

        <motion.p
          variants={itemV}
          className="text-base leading-relaxed text-zinc-400 md:text-lg"
        >
          Estou sempre aberto a novos desafios e colaborações em projetos de
          desenvolvimento <span className="font-medium text-zinc-300">.NET</span>,{' '}
          <span className="font-medium text-zinc-300">Java</span> ou{' '}
          <span className="font-medium text-zinc-300">arquitetura de sistemas</span>.
          Se você tem uma ideia ou uma vaga, manda mensagem.
        </motion.p>

        {/* Location badge */}
        <motion.div
          variants={itemV}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/50 bg-zinc-800/50 px-3.5 py-1.5 text-xs text-zinc-400"
        >
          <MapPin size={11} className="text-purple-400" />
          São Leopoldo, RS — Brasil
        </motion.div>
      </motion.div>

      {/* ── Contact cards grid ── */}
      <motion.div
        variants={containerV}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="w-full max-w-2xl"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CONTACT_CARDS.map((card) => (
            <motion.div key={card.id} variants={itemV}>
              <ContactCard card={card} />
            </motion.div>
          ))}
        </div>

        {/* Availability status pill */}
        <motion.div
          variants={itemV}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-5 py-2.5 text-sm text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Disponível para oportunidades · Início imediato
          </div>
        </motion.div>
      </motion.div>

      {/* ── Footer strip ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-24 flex flex-col items-center gap-2 text-center"
      >
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        <p className="mt-4 text-xs text-zinc-600">
          © {new Date().getFullYear()} Eduardo Rodrigues Graf · Feito com React, Vite &amp; Tailwind CSS
        </p>
        <p className="text-xs text-zinc-700">
          São Leopoldo, RS — Brasil
        </p>
      </motion.footer>
    </section>
  );
}
