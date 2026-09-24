import bcrypt from 'bcrypt';
import { User } from '../types';

export const users: User[] = [
{ id: '1', email: 'admin@service.com', role: 'LEAD', passwordHash: bcrypt.hashSync('password123', 10) },
];