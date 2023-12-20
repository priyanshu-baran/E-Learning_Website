import express from 'express';
import cors from 'cors';

import usersRouter from './routes/users.js';
import courseRouter from './routes/coursesList.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/userdetails', usersRouter);
app.use('/coursedetails', courseRouter);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;
