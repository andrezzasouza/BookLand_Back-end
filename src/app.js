import express from 'express';
import cors from 'cors';
import home from './controllers/home.js';
import signUp from './controllers/sign-up.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);
app.get('/home', home);

export default app;
