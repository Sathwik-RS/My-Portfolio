import { useApi } from '../hooks.js';
import cfg from '../config.js';
import { Title, Reveal, Counter, Tilt } from '../components.jsx';

const Ring = ({ label, v, max, color }) => {
  const r = 38, c = 2 * Math.PI * r, p = max ? Math.min(v / max, 1) : 0;
  return (
    <div className="ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r={r} className="track" />
      <circle cx="50" cy="50" r={r} stroke={color} strokeDasharray={c} strokeDashoffset={c * (1 - p)} className="arc" /></svg>
      <b><Counter to={v} /></b><span>{label}</span></div>
  );
};

export default function Activity() {
  const [gh] = useApi(`/api/github/${cfg.github}`, null);
  const [lc] = useApi(`/api/leetcode/${cfg.leetcode}`, null);
  const weeks = [];
  gh?.days?.forEach((d, i) => { if (i % 7 === 0) weeks.push([]); weeks[weeks.length - 1].push(d); });
  return (
    <section className="page">
      <Title sub="Live from GitHub and LeetCode">Daily work</Title>
      <Reveal>
        <Tilt>
          <h3>GitHub: days worked in the last year</h3>
          {gh ? (<>
            <div className="stats">
              <div><b><Counter to={gh.activeDays} /></b><span>active days</span></div>
              <div><b><Counter to={gh.total} /></b><span>contributions</span></div>
              <div><b><Counter to={gh.currentStreak} /></b><span>current streak</span></div>
              <div><b><Counter to={gh.longestStreak} /></b><span>longest streak</span></div>
            </div>
            <div className="heat">{weeks.map((w, i) => <div key={i}>{w.map((d) => <i key={d.date} className={`l${d.level}`} title={`${d.date}: ${d.count}`} />)}</div>)}</div>
          </>) : <p className="muted">Start the server and set your GitHub username in config.js to see your streak.</p>}
        </Tilt>
      </Reveal>
      <Reveal delay={0.1}>
        <Tilt>
          <h3>LeetCode progress</h3>
          {lc ? <div className="rings">
            <Ring label="Easy" v={lc.easy} max={Math.max(lc.total, 1)} color="var(--mint)" />
            <Ring label="Medium" v={lc.medium} max={Math.max(lc.total, 1)} color="var(--sun)" />
            <Ring label="Hard" v={lc.hard} max={Math.max(lc.total, 1)} color="var(--rose)" />
            <div className="stats"><div><b><Counter to={lc.total} /></b><span>problems solved</span></div></div>
          </div> : <p className="muted">Start the server and set your LeetCode username in config.js to see your progress.</p>}
        </Tilt>
      </Reveal>
    </section>
  );
}
