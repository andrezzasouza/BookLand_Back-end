import express from 'express';
import cors from 'cors';
import home from './controllers/home.js';
import signIn from './controllers/sign-in.js';
import signUp from './controllers/sign-up.js';
import { getCartProducts, deleteCartProduct } from './controllers/cart-products.js';
import postDeliveryInfo from './controllers/delivery.js';
import postPaymentInfo from './controllers/payment.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);
app.get('/home', home);
app.get('/cart-products', getCartProducts);
app.post('/cart-products', deleteCartProduct);
app.post('/delivery', postDeliveryInfo);
app.post('/payment', postPaymentInfo);

export default app;
