import './setup.js';
import app from './app.js';

// eslint-disable-next-line no-console
app.listen(process.env.PORT, () => { console.log(process.env.PORT); });
