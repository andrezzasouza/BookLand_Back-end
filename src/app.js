import express from 'express';
import cors from 'cors';
import header from './controllers/header.js';
import home from './controllers/home.js';
import signIn from './controllers/sign-in.js';
import signUp from './controllers/sign-up.js';
import product from './controllers/product.js';
import { getCartProducts, deleteCartProduct } from './controllers/cart-products.js';
import { postDeliveryInfo, getDeliveryInfo } from './controllers/delivery.js';
import { postPaymentInfo, getPaymentInfo } from './controllers/payment.js';
import { cartQuantity, clearCart } from './controllers/cart-quantity.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);
app.get('/home', home);
app.get('/product/:id', product);
app.get('/cart-products', getCartProducts);
app.post('/cart-products', deleteCartProduct);
app.post('/delivery', postDeliveryInfo);
app.post('/payment', postPaymentInfo);
app.post('/cart-quantity', cartQuantity);
app.delete('/cart-quantity', clearCart);
app.get('/delivery', getDeliveryInfo);
app.get('/payment', getPaymentInfo);
app.delete('/header', header);

export default app;
