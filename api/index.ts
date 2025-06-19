import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello from Express & TypeScript deployed on Vercel!</h1>');
});

export default app;
