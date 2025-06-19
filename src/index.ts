import express from 'express';
import pdfRoute from './routes/pdfRoute';

const app = express();

app.use('/api', pdfRoute);

app.get('/', (req, res) => {
  const pdfUrl = `/api/generate-pdf`;
  res.send(`
    <h1>📄 PDF API is running 🚀</h1>
    <a href="${pdfUrl}?download=true">Download PDF</a>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));


export default app;
