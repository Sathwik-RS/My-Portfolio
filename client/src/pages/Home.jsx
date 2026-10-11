import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import cfg from '../config.js';
import { Typing, Reveal } from '../components.jsx';

export default function Home() {
  return (
    <section className="hero">
      <p className="hi">Hi, I'm</p>
      <h1 className="big" aria-label={cfg.name}>
        {cfg.name.split('').map((c, i) => (
          <motion.span key={i} initial={{ y: '110%', rotate: 8 }} animate={{ y: 0, rotate: 0 }} transition={{ delay: 0.05 * i, type: 'spring', stiffness: 120, damping: 14 }}>{c === ' ' ? '\u00A0' : c}</motion.span>
        ))}
      </h1>
      <p className="lead">{cfg.role}. I <Typing words={cfg.roles} /></p>
      <div className="cta">
        <Link className="btn" to="/projects">See my projects</Link>
        <Link className="btn ghost" to="/about">About me</Link>
      </div>
      <div className="marquee"><div>{[...cfg.skills, ...cfg.skills, ...cfg.skills].map((s, i) => <span key={i}>{s}</span>)}</div></div>
      <Reveal><p className="muted center">Browse the pages above for my work, certificates, and daily coding streaks.</p></Reveal>
    </section>
  );
}
