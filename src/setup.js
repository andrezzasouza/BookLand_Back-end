import dotenv from 'dotenv';

let envFile;

if (process.env.NODE_ENV === 'dev') {
  envFile = '.env.dev';
} else {
  envFile = '.env.test';
}

dotenv.config({
  path: envFile,
});
