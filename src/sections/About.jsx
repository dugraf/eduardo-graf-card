import { motion } from 'motion/react';
import { Linkedin, Github, UserRound } from 'lucide-react';

import ProfileCard from '@/components/react-bits/profile-card/ProfileCardComponent';
import { cn } from '@/lib/utils';

import ProfilePhoto from '../assets/yo.png'

// ---------------------------------------------------------------------------
// Assets / config
// ---------------------------------------------------------------------------

// Avatar — real photo imported from assets
const AVATAR_URL = ProfilePhoto;

// ---------------------------------------------------------------------------
// Bio highlights (right column quick-stats)
// ---------------------------------------------------------------------------

const HIGHLIGHTS = [
  { icon: UserRound,   value: '2+',    label: 'Anos em Infraestrutura' },
  { icon: Github,      value: 'dugraf', label: 'GitHub' },
  { icon: Linkedin,    value: 'Eduardo Graf', label: 'LinkedIn' },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerV = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemV = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

// ---------------------------------------------------------------------------
// About Section
// ---------------------------------------------------------------------------

export default function About({ id, onContact }) {
  return (
    <section
      id={id}
      className={cn('relative flex flex-col items-center px-6 py-28')}
    >
      {/* ── Section header ── */}
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
          <UserRound size={12} />
          Perfil & Contato
        </motion.span>

        <motion.h2
          variants={itemV}
          className="text-4xl font-extrabold tracking-tight text-zinc-50 md:text-5xl"
        >
          Quem sou{' '}
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            eu.
          </span>
        </motion.h2>

        <motion.p
          variants={itemV}
          className="text-base leading-relaxed text-zinc-400 md:text-lg"
        >
          Tecnologia como ferramenta para resolver problemas reais —
          da sala de servidores ao editor de código.
        </motion.p>
      </motion.div>

      {/* ── Main layout: ProfileCard + right column ── */}
      <motion.div
        variants={containerV}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className={cn(
          'w-full max-w-5xl',
          'grid grid-cols-1 gap-6',
          'lg:grid-cols-[auto_1fr] lg:items-start',
        )}
      >
        {/* ── Left: ProfileCard ── */}
        <motion.div variants={itemV} className="flex justify-center">
          <ProfileCard
            name="Eduardo Rodrigues Graf"
            title="Desenvolvedor Full-stack | Ciência da Computação"
            handle="dugraf"
            status="Disponível"
            contactText="Contato"
            avatarUrl={AVATAR_URL}
            showUserInfo
            enableTilt
            enableMobileTilt={false}
            onContactClick={onContact}
            behindGlowColor="rgba(125, 190, 255, 0.67)"
            iconUrl="/assets/demo/iconpattern.png"
            behindGlowEnabled
            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
            />
        </motion.div>

        {/* ── Right: bio card + CardNav ── */}
        <div className="flex flex-col gap-6">

          {/* Bio glass card */}
          <motion.div
            variants={itemV}
            className={cn(
              'relative overflow-hidden rounded-2xl border border-purple-500/20',
              'bg-zinc-900/50 backdrop-blur-sm p-7',
            )}
          >
            {/* Corner watermark */}
            <UserRound
              size={96}
              strokeWidth={0.75}
              className="absolute -right-4 -top-4 rotate-12 text-purple-500/6 select-none pointer-events-none"
            />

            {/* Bio text */}
            <p className="relative text-sm leading-relaxed text-zinc-400 md:text-base">
              Entusiasta de tecnologia focado em resolver problemas reais através de{' '}
              <span className="font-semibold text-zinc-200">código limpo</span> e{' '}
              <span className="font-semibold text-zinc-200">infraestrutura sólida</span>.{' '}
              Unindo 2 anos de experiência operacional com a lógica matemática da{' '}
              <span className="font-semibold text-purple-300">Ciência da Computação (Unisinos)</span>{' '}
              para construir soluções que funcionam de verdade — em produção.
            </p>

            {/* Quick highlights */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {HIGHLIGHTS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-800/30 px-4 py-3"
                >
                  <Icon size={16} className="shrink-0 text-purple-400" />
                  <div>
                    <p className="text-xs font-bold text-zinc-100">{value}</p>
                    <p className="text-[11px] text-zinc-500">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
