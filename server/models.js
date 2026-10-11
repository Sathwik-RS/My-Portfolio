import mongoose from 'mongoose';
const m = (n) => mongoose.model(n, new mongoose.Schema({}, { strict: false }));
export const Project = m('Project'), Cert = m('Cert'), Hobby = m('Hobby'), Message = m('Message');
