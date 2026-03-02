import { Home, Briefcase, FolderKanban, Mail, UserRound } from 'lucide-react';

import LightRays from '@/components/react-bits/light-rays/LightRays';
import Dock from '@/components/react-bits/dock/Dock';
import SmoothScroll from '@/components/SmoothScroll';
import Hero from '@/sections/Hero';
import Experience from '@/sections/Experience';
import Projects from '@/sections/Projects';
import TechStack from '@/sections/TechStack';
import About from '@/sections/About';
import Contact from '@/sections/Contact';
import Header from '@/components/Header';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Section IDs — single source of truth for scroll targets
// ---------------------------------------------------------------------------
const SECTIONS = {
  hero:       'hero',
  experience: 'experience',
  projects:   'projects',
  techstack:  'techstack',
  about:      'about',
  contact:    'contact',
};

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

// ---------------------------------------------------------------------------
// Dock items
// ---------------------------------------------------------------------------
const DOCK_ITEMS = [
  {
    icon:    <Home size={20} />,
    label:   'Home',
    onClick: () => scrollTo(SECTIONS.hero),
  },
  {
    icon:    <Briefcase size={20} />,
    label:   'Experience',
    onClick: () => scrollTo(SECTIONS.experience),
  },
  {
    icon:    <FolderKanban size={20} />,
    label:   'Projects',
    onClick: () => scrollTo(SECTIONS.projects),
  },
  {
    icon:    <UserRound size={20} />,
    label:   'Sobre',
    onClick: () => scrollTo(SECTIONS.about),
  },
  {
    icon:    <Mail size={20} />,
    label:   'Contato',
    onClick: () => scrollTo(SECTIONS.contact),
  },
];

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
export default function App() {
  return (
    <SmoothScroll>
      {/*
        Root shell — bg-zinc-950 sets the deep dark canvas.
        overflow-x-hidden prevents horizontal bleed from WebGL canvas.
      */}
      <div className={cn('relative min-h-screen bg-zinc-950 text-white overflow-x-hidden')}>

        {/* ── Layer 0 · Background (WebGL) ─────────────────────────────────
            Fixed, full-viewport, sits below everything.
            pointer-events-none on the wrapper preserves internal mouse
            tracking of the OGL canvas via its own event listeners. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#b658d0"
            raysSpeed={0.4}
            lightSpread={0.6}
            rayLength={2.5}
            fadeDistance={1}
            saturation={1.1}
            followMouse={true}
            mouseInfluence={0.08}
            noiseAmount={0.05}
            distortion={0}
            pulsating
          />
        </div>

        {/* ── Layer 2.5 · Fixed Header ─────────────────────────────────── */}
        <Header />

        {/* ── Layer 1 · Scrollable Content ─────────────────────────────── */}
        <main className="relative z-10 pt-14">
          {/* Hero */}
          <Hero
            id={SECTIONS.hero}
            onVerProjetos={() => scrollTo(SECTIONS.projects)}
          />

          {/* Experience */}
          <Experience id={SECTIONS.experience} />

          {/* Projects */}
          <Projects id={SECTIONS.projects} />

          {/* Tech Stack & Education */}
          <TechStack id={SECTIONS.techstack} />

          {/* Profile Identity & Social Connect */}
          <About
            id={SECTIONS.about}
            onContact={() => scrollTo(SECTIONS.contact)}
          />

          {/* Contact & Footer */}
          <Contact id={SECTIONS.contact} />
        </main>

        {/* ── Layer 2 · Navigation Dock ────────────────────────────────────
            Fixed at the bottom-center, highest z-index. */}
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <Dock
            items={DOCK_ITEMS}
            panelHeight={68}
            baseItemSize={48}
            magnification={64}
          />
        </div>

      </div>
    </SmoothScroll>
  );
}