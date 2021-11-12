import express from 'express';
import cors from 'cors';
import signUp from './controllers/signUp.js';
import home from './controllers/home.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);
app.get('/home', home);

export default app;
