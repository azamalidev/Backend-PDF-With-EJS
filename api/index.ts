import express from 'express';

const app = express();

app.get('/', (req: any, res: any) => {
  res.send('<h1>Hello World from Express & TypeScript on Vercel!</h1>');
});

// // ✅ Listen on a port locally, skip it on Vercel
// if (process.env.NODE_ENV !== 'production') {
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`Running locally → http://localhost:${PORT}`);
//   });
// }

export default app;
