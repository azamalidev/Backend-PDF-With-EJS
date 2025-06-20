import express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as pdf from 'html-pdf-node';
import PDFDocument from 'pdfkit';
const app = express();

app.get('/', (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Download PDF Example</title></head>
      <body style="text-align: center; padding-top: 50px; font-family: sans-serif;">
        <h1>✅ Hello from Express on Vercel</h1>
             <a href="/download1" style="padding: 12px 20px; background: #0070f3; color: #fff; border-radius: 5px; text-decoration: none;">Download PDF</a>
        </body>
    </html>
  `);
});
app.get('/download1', (_req, res) => {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 72, right: 72 }, // Customize page margins
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');

  doc.pipe(res);

  // ✅ Title with color and custom font size
  doc.fillColor('#0070f3').fontSize(28).text('🚀 Welcome to PDFKit PDF!', {
    align: 'center',
    underline: true,
  });

  doc.moveDown(2); // Add vertical space (2 line breaks)

  // ✅ Body text with smaller font and different color
  doc.fillColor('#333333').fontSize(16).text(
    'Generated from a Vercel Serverless Function.',
    {
      align: 'center',
      lineGap: 10, // Line spacing between lines if multiline text
    }
  );

  doc.moveDown();

  // ✅ Another paragraph, smaller, gray text
  doc.fillColor('#555555').fontSize(12).text(
    'No HTML used here. This layout is fully styled using PDFKit.',
    {
      align: 'center',
    }
  );

  doc.moveDown(2);

  // ✅ Example of positioned text (manual control)
  doc.fillColor('red').fontSize(12).text('Positioned Text Example', 100, 500);

  doc.end();
});

app.get('/download', async (_req, res) => {
  const html = `
   <!DOCTYPE html>
<html lang="en">     <!-- ✅ lang attribute added -->
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My PDF Title</title>    <!-- ✅ non-empty title -->
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 50px;
        text-align: center;
      }
      h1 {
        color: #0070f3;
      }
    </style>
  </head>
  <body>
    <h1>Hello PDF 📄</h1>
    <p>This PDF was generated using html-pdf-node on Vercel.</p>
  </body>
</html>
  `;

  const file = { content: html };
  const options = { format: 'A4' };

  try {
    const pdfBuffer = await pdf.generatePdf(file, options);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('❗ Error generating PDF:', error);
    res.status(500).send('❗ Error generating PDF');
  }
});

export default (req: VercelRequest, res: VercelResponse) => {
  (app as any).handle(req, res);
};
