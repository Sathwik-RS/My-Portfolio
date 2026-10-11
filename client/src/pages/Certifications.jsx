import { useApi } from '../hooks.js';
import { certs as fb } from '../data.js';
import { Title, Reveal } from '../components.jsx';

export default function Certifications() {
  const [items] = useApi('/api/certifications', fb);
  return (
    <section className="page">
      <Title sub="Courses, workshops and achievements">Certifications</Title>
      <div className="timeline">
        {items.map((c, i) => (
          <Reveal key={c.title} x={i % 2 ? 40 : -40}>
            <div className="tl"><span className="dot" /><em>{c.year}</em><h3>{c.title}</h3><p>{c.issuer}</p>{c.link && <a href={c.link}>View credential</a>}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
