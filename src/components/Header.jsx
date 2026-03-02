import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  FileDown,
  Instagram,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const EMAIL = 'eduardor.graf@hotmail.com';
// ---------------------------------------------------------------------------
// Links data — swap hrefs with real URLs
// ---------------------------------------------------------------------------
const NAV_LINKS = [
  {
    label: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/eduardo-rodrigues-graf/', // ← troque
    external: true,
    accent: 'hover:text-blue-400 hover:drop-shadow-[0_0_8px_rgb(96_165_250_/_0.7)]',
  },
  {
    label: 'GitHub',
    icon: Github,
    href: 'https://github.com/dugraf',
    external: true,
    accent: 'hover:text-zinc-200 hover:drop-shadow-[0_0_8px_rgb(255_255_255_/_0.3)]',
  },
  {
    label: 'WhatsApp',
    icon: MessageCircle,
    href: 'https://wa.me/5551992640547', // ← troque
    external: true,
    accent: 'hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgb(52_211_153_/_0.7)]',
  },
  {
    label: 'Instagram',
    icon: Instagram,
    href: 'https://www.instagram.com/du.rodriguesg/', // ← troque
    external: true,
    accent: 'hover:text-fuchsia-400 hover:drop-shadow-[0_0_8px_rgb(232_121_249_/_0.7)]',
  },
  {
    label: 'E-mail',
    icon: Mail,
    href: `mailto:${EMAIL}`,
    external: true,
    accent: 'hover:text-blue-400 hover:drop-shadow-[0_0_8px_rgb(96_165_250_/_0.7)]',
  },
  {
    label: 'Currículo',
    icon: FileDown,
    href: '/cv-eduardo-graf.pdf',
    download: true,
    accent: 'hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgb(168_85_247_/_0.7)]',
  },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const headerV = {
  hidden:  { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 },
  },
};

const mobileMenuV = {
  hidden:  { opacity: 0, y: -12, scaleY: 0.95 },
  visible: { opacity: 1, y: 0,  scaleY: 1,    transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, scaleY: 0.96,  transition: { duration: 0.18, ease: 'easeIn' }  },
};

const linkStaggerV = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const linkItemV = {
  hidden:  { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

// ---------------------------------------------------------------------------
// NavLink — desktop pill
// ---------------------------------------------------------------------------
function NavLink({ link }) {
  return (
    <a
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      download={link.download || undefined}
      aria-label={link.label}
      className={cn(
        'group flex items-center gap-1.5 rounded-lg px-3 py-1.5',
        'text-xs font-medium text-zinc-400 transition-all duration-200',
        'border border-transparent hover:border-zinc-700/60 hover:bg-zinc-800/50',
        link.accent,
      )}
    >
      <link.icon size={13} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
      {link.label}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Mobile drawer link
// ---------------------------------------------------------------------------
function MobileLink({ link, onClose }) {
  return (
    <motion.a
      variants={linkItemV}
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      download={link.download || undefined}
      onClick={onClose}
      className={cn(
        'flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/60 px-4 py-3',
        'text-sm font-medium text-zinc-300 transition-colors duration-200',
        link.accent,
      )}
    >
      <link.icon size={16} className="shrink-0" />
      {link.label}
    </motion.a>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        variants={headerV}
        initial="hidden"
        animate="visible"
        className={cn(
          'fixed inset-x-0 top-0 z-40',
          'border-b border-zinc-800/50',
          'bg-zinc-950/60 backdrop-blur-md',
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">

          {/* ── Logo / wordmark ── */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group select-none"
          >
            {/* Badge */}
            <span className={cn(
              'flex h-7 w-7 items-center justify-center rounded-md',
              'bg-purple-600 text-xs font-extrabold text-white',
              'shadow-[0_0_12px_rgba(168,85,247,0.5)] transition-shadow duration-300',
              'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.75)]',
            )}>
              EG
            </span>
            <span className="hidden text-sm font-semibold text-zinc-300 transition-colors duration-200 group-hover:text-zinc-100 sm:block">
              Eduardo Graf
            </span>
          </a>

          {/* ── Desktop links ── */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Links externos">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} link={link} />
            ))}
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg md:hidden',
              'border border-zinc-700/60 bg-zinc-800/50 text-zinc-400',
              'transition-colors duration-200 hover:border-zinc-600 hover:text-zinc-200',
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>

        </div>
      </motion.header>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuV}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed inset-x-0 top-14 z-30 md:hidden',
              'border-b border-zinc-800/50',
              'bg-zinc-950/80 backdrop-blur-md',
            )}
            style={{ transformOrigin: 'top' }}
          >
            <motion.nav
              variants={linkStaggerV}
              initial="hidden"
              animate="visible"
              className="mx-auto flex max-w-7xl flex-col gap-2.5 px-4 py-4"
              aria-label="Menu mobile"
            >
              {NAV_LINKS.map((link) => (
                <MobileLink key={link.label} link={link} onClose={() => setOpen(false)} />
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
