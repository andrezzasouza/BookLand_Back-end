import express from 'express';
import cors from 'cors';
import signUp from './controllers/sign-up.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);

export default app;
