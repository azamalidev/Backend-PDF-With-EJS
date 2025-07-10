import express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { renderToBuffer } from '@react-pdf/renderer';
import { Document as PDFDocument, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const app = express();
const MyDocument = () => (
  <PDFDocument>
    <Page size="A4" >
      <View >
        <Text >Welcome to React PDF</Text>
      </View>
      <View >
        <Text>This PDF was generated with @react-pdf/renderer on Vercel 🎉</Text>
      </View>
    </Page>
  </PDFDocument>
);

// ✅ Home route
app.get('/', (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Download PDF Example</title></head>
      <body style="text-align: center; padding-top: 50px; font-family: sans-serif;">
        <h1>✅ Hello from Express + React PDF on Vercel</h1>
        <a href="/download" style="padding: 12px 20px; background: #0070f3; color: #fff; border-radius: 5px; text-decoration: none;">Download PDF</a>
      </body>
    </html>
  `);
});

// ✅ Download route using @react-pdf/renderer
app.get('/download', async (_req, res) => {
  try {
    const pdfBuffer = await renderToBuffer(<MyDocument />);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="react-pdf-document.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('❗ Error generating PDF:', error);
    res.status(500).send('❗ Error generating PDF');
  }
});

// ✅ Export for Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  (app as any).handle(req, res);
};
