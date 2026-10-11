import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export const Reveal = ({ children, delay = 0, x = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 40, x }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay }}>{children}</motion.div>
);

export const Title = ({ children, sub }) => (
  <div className="title"><motion.h1 initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 0.8 }}>{children}</motion.h1>{sub && <p>{sub}</p>}</div>
);

export function Tilt({ children, className = '' }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(700px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-4px)`;
  };
  return <div ref={ref} className={`card ${className}`} onPointerMove={move} onPointerLeave={() => (ref.current.style.transform = '')}>{children}</div>;
}

export function Counter({ to = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let t0;
    const step = (t) => { t0 ??= t; const p = Math.min((t - t0) / 1200, 1); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{n}</span>;
}

export function Typing({ words }) {
  const [i, setI] = useState(0), [txt, setTxt] = useState(''), [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const t = setTimeout(() => {
      if (!del) { setTxt(w.slice(0, txt.length + 1)); if (txt.length + 1 === w.length) setTimeout(() => setDel(true), 1100); }
      else { setTxt(w.slice(0, txt.length - 1)); if (txt.length <= 1) { setDel(false); setI(i + 1); } }
    }, del ? 35 : 75);
    return () => clearTimeout(t);
  }, [txt, del, i, words]);
  return <span className="type">{txt}<b>|</b></span>;
}
