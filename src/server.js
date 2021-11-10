import './setup.js';
import app from './app.js';

// eslint-disable-next-line no-console
console.log(process.env.NODE_ENV);
app.listen(process.env.PORT);
