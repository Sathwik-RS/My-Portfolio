import { useApi } from '../hooks.js';
import { projects as fb } from '../data.js';
import { Title, Reveal, Tilt } from '../components.jsx';

export default function Projects() {
  const [items] = useApi('/api/projects', fb);
  return (
    <section className="page">
      <Title sub="Things I have built and shipped">Projects</Title>
      <div className="grid3">
        {items.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <Tilt><h3>{p.title}</h3><p>{p.desc}</p>
              <div className="chips">{p.tags?.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="links">{p.github && <a href={p.github}>Code</a>}{p.live && <a href={p.live}>Live demo</a>}</div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
