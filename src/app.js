import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// app.post('/sign-up', signUp);

export default app;
