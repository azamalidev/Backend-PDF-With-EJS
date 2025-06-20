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
    margins: { top: 50, bottom: 50, left: 50, right: 50 }, // Clean, symmetric margins
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="custom-document.pdf"');

  doc.pipe(res);

  // ✅ Title
  doc
    .fillColor('#0A84FF')
    .fontSize(30)
    .text(' Welcome to PDF Project!', {
      align: 'center',
      underline: true,
    });

  doc.moveDown(2);

  // ✅ Intro Paragraph
  doc
    .fillColor('#333')
    .fontSize(16)
    .text(
      'This PDF document is dynamically generated from a Node.js Express server deployed on Vercel.',
      {
        align: 'center',
        lineGap: 6,
      }
    );

  doc.moveDown();

  // ✅ Feature List
  doc.fillColor('#555').fontSize(14).text('Features Demonstrated:', { underline: true });

  const features = [
    '• Dynamic PDF generation',
    '• Styled text with colors and alignment',
    '• Deployed using Vercel Serverless Functions',
    '• Generated entirely without HTML',
  ];

  features.forEach((line) => {
    doc.moveDown(0.5).text(line, { indent: 20 });
  });

  doc.moveDown(2);

  // ✅ Footer Section
  doc
    .fillColor('#999')
    .fontSize(12)
    .text('Generated with ❤️ using PDFKit.', {
      align: 'center',
    });

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
