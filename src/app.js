import express from 'express';
import cors from 'cors';
import header from './controllers/header.js';
import home from './controllers/home.js';
import signIn from './controllers/sign-in.js';
import signUp from './controllers/sign-up.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);
app.get('/home', home);
app.delete('/header', header);

export default app;
