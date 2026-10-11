import cfg from '../config.js';
import { Title, Reveal, Tilt } from '../components.jsx';

export default function About() {
  return (
    <section className="page">
      <Title sub={cfg.college}>About me</Title>
      <div className="grid2">
        <Reveal>{cfg.about.map((p, i) => <p className="body" key={i}>{p}</p>)}
          <h3>Education</h3>
          {cfg.education.map((e) => <div className="edu" key={e.t}><b>{e.t}</b><span>{e.s}</span><em>{e.y}</em></div>)}
        </Reveal>
        <Reveal delay={0.15} x={40}><Tilt><h3>Skills</h3><div className="chips">{cfg.skills.map((s) => <span key={s}>{s}</span>)}</div></Tilt></Reveal>
      </div>
    </section>
  );
}
