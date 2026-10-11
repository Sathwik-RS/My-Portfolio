import { useApi } from '../hooks.js';
import { hobbies as fb } from '../data.js';
import { Title, Reveal, Tilt } from '../components.jsx';

export default function Hobbies() {
  const [items] = useApi('/api/hobbies', fb);
  return (
    <section className="page">
      <Title sub="What I do when the laptop is closed">Hobbies</Title>
      <div className="grid4">
        {items.map((h, i) => <Reveal key={h.title} delay={i * 0.08}><Tilt className="hobby"><div className="icon">{h.icon}</div><h3>{h.title}</h3><p>{h.text}</p></Tilt></Reveal>)}
      </div>
    </section>
  );
}
