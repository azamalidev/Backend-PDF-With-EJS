import express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import MyDocument from '../pdf/MyDocument';

const app = express();

app.get('/', (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Welcome</title></head>
      <body>
        <h1>✅ Hello World from Express on Vercel!</h1>
        <a href="/download">Download PDF</a>
      </body>
    </html>
  `);
});

app.get('/download', async (_req, res) => {
  try {
    const pdfElement = React.createElement(MyDocument);
    const pdfBuffer = await renderToBuffer(pdfElement);  // ✅ Use Buffer

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('❗ Error generating PDF');
  }
});

export default (req: VercelRequest, res: VercelResponse) => {
  (app as any).handle(req, res);
};
