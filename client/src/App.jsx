import { useEffect, useRef } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import cfg from './config.js';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Certifications from './pages/Certifications.jsx';
import Projects from './pages/Projects.jsx';
import Activity from './pages/Activity.jsx';
import Hobbies from './pages/Hobbies.jsx';
import Background from './Background.jsx';

const links = [['/', 'Home'], ['/about', 'About'], ['/projects', 'Projects'], ['/activity', 'Activity'], ['/certifications', 'Certificates'], ['/hobbies', 'Hobbies']];

export default function App() {
  const loc = useLocation();
  const glow = useRef(null);
 const { scrollYProgress } = useScroll();
const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

useEffect(() => {
  window.scrollTo(0, 0);
}, [loc.pathname]);
  useEffect(() => {
    const move = (e) => glow.current && (glow.current.style.transform = `translate(${e.clientX - 200}px,${e.clientY - 200}px)`);
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <>
      <motion.div className="progress" style={{ scaleX: bar }} />
      <div className="glow" ref={glow} />
   <Background />
      <header className="nav">
        <NavLink to="/" className="logo">{cfg.name.split(' ')[0]}<i>.</i></NavLink>
        <nav>{links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}</nav>
      </header>
   <main key={loc.pathname} className="route">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/activity" element={<Activity />} />
    <Route path="/certifications" element={<Certifications />} />
    <Route path="/hobbies" element={<Hobbies />} />
  </Routes>
</main>
      <footer>© {new Date().getFullYear()} {cfg.name} · <a href={`mailto:${cfg.email}`}>{cfg.email}</a> · <a href={`https://github.com/${cfg.github}`}>GitHub</a> · <a href={cfg.linkedin}>LinkedIn</a></footer>
    </>
  );
}
