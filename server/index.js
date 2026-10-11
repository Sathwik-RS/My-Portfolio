import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Project, Cert, Hobby, Message } from './models.js';

const app = express();
app.use(cors(), express.json());
const ready = () => mongoose.connection.readyState === 1;
const list = (Model) => async (_, res) => res.json(ready() ? await Model.find().sort({ order: 1 }) : []);
app.get('/api/projects', list(Project));
app.get('/api/certifications', list(Cert));
app.get('/api/hobbies', list(Hobby));
app.post('/api/contact', async (req, res) => {
  if (!ready()) return res.status(503).json({ error: 'Database offline' });
  await Message.create({ ...req.body, at: new Date() });
  res.json({ ok: true });
});

// GitHub: active days from the public contribution calendar
app.get('/api/github/:user', async (req, res) => {
  try {
    const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${req.params.user}?y=last`);
    const { contributions = [] } = await r.json();
    const days = contributions.filter((d) => new Date(d.date) <= new Date());
    let best = 0, run = 0;
    days.forEach((d) => { run = d.count > 0 ? run + 1 : 0; best = Math.max(best, run); });
    let current = 0;
    for (let i = days.length - 1; i >= 0; i--) { if (days[i].count > 0) current++; else if (i !== days.length - 1) break; }
    res.json({ days, activeDays: days.filter((d) => d.count > 0).length,
      total: days.reduce((a, d) => a + d.count, 0), longestStreak: best, currentStreak: current });
  } catch { res.status(502).json({ error: 'GitHub unavailable' }); }
});

// LeetCode: solved counts by difficulty
app.get('/api/leetcode/:user', async (req, res) => {
  try {
    const query = 'query($u:String!){matchedUser(username:$u){submitStats{acSubmissionNum{difficulty count}}}}';
    const r = await fetch('https://leetcode.com/graphql', { method: 'POST',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, variables: { u: req.params.user } }) });
    const nums = (await r.json()).data.matchedUser.submitStats.acSubmissionNum;
    const g = (d) => nums.find((n) => n.difficulty === d)?.count ?? 0;
    res.json({ total: g('All'), easy: g('Easy'), medium: g('Medium'), hard: g('Hard') });
  } catch { res.status(502).json({ error: 'LeetCode unavailable' }); }
});

mongoose.connect(process.env.MONGO_URI || '').then(() => console.log('MongoDB connected'))
  .catch(() => console.log('MongoDB offline: API returns empty lists, client uses fallback data'));
app.listen(process.env.PORT || 5000, () => console.log('API on :' + (process.env.PORT || 5000)));
