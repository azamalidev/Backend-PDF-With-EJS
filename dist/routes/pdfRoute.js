import { jsx as _jsx } from "react/jsx-runtime";
import express from 'express';
import { renderToStream } from '@react-pdf/renderer';
import MyDocument from '../pdf/MyDocument';
const router = express.Router();
router.get('/generate-pdf', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/pdf');
        // Check if "download" query param exists (e.g., ?download=true)
        const isDownload = req.query.download === 'true';
        res.setHeader('Content-Disposition', `${isDownload ? 'attachment' : 'inline'}; filename="document.pdf"`);
        const stream = await renderToStream(_jsx(MyDocument, {}));
        stream.pipe(res);
    }
    catch (err) {
        console.error('PDF generation error:', err);
        res.status(500).send('Error generating PDF');
    }
});
export default router;
