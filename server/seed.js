import 'dotenv/config';
import mongoose from 'mongoose';
import { Project, Cert, Hobby } from './models.js';
import { projects, certs, hobbies } from '../client/src/data.js';

await mongoose.connect(process.env.MONGO_URI);
await Promise.all([Project.deleteMany(), Cert.deleteMany(), Hobby.deleteMany()]);
await Project.insertMany(projects.map((p, order) => ({ ...p, order })));
await Cert.insertMany(certs.map((p, order) => ({ ...p, order })));
await Hobby.insertMany(hobbies.map((p, order) => ({ ...p, order })));
console.log('Seeded'); process.exit(0);
