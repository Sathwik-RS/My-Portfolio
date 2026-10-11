import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function Background() {
  const { scrollY } = useScroll();
  const p = useSpring(useTransform(scrollY, [0, 1200], [0, 1]), { stiffness: 60, damping: 20 });
  const hue = useTransform(p, [0, 1], [250, 330]); // change these two numbers to shift the colors
  const bg = useTransform(hue, (h) =>
    `radial-gradient(circle at 20% 20%, hsl(${h} 80% 35% / .55), transparent 55%), radial-gradient(circle at 80% 80%, hsl(${h + 60} 80% 45% / .4), transparent 55%)`);
  const spin = useTransform(p, [0, 1], [0, 360]);
  const spinBack = useTransform(p, [0, 1], [0, -240]);
  const grow = useTransform(p, [0, 1], [1, 1.8]);
  const gridY = useTransform(p, [0, 1], ['0px', '-300px']);
  const drift = useTransform(p, [0, 1], ['0vw', '-50vw']);

  return (
    <div className="bg" aria-hidden="true">
      <motion.div className="bg-grad" style={{ background: bg }} />
      <motion.div className="bg-grid" style={{ y: gridY }} />
      <motion.div className="bg-ring r1" style={{ rotate: spin, scale: grow }} />
      <motion.div className="bg-ring r2" style={{ rotate: spinBack, x: drift }} />
    </div>
  );
}