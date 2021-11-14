import express from 'express';
import cors from 'cors';
import home from './controllers/home.js';
import signIn from './controllers/sign-in.js';
import signUp from './controllers/sign-up.js';
import { getCartProducts, deleteCartProduct } from './controllers/cart-products.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);
app.get('/home', home);
app.get('/cart-products', getCartProducts);
app.post('/cart-products', deleteCartProduct);

export default app;
