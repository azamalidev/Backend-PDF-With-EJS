import express from 'express';
import pdfRoute from './pdf/MyDocument';

const app = express();

app.use('/api', pdfRoute);
app.get('/', (req, res) => {
  const pdfUrl = `/api/generate-pdf`;

  res.send(`
    <html>
      <head>
        <title>PDF API</title>
        <style>
          body { font-family: sans-serif; text-align: center; margin-top: 50px; }
          a {
            display: inline-block;
            padding: 10px 20px;
            background: #4F46E5;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px;
          }
          a:hover { background: #3730A3; }
          .url-box {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }
          input {
            width: 300px;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          button {
            padding: 8px 12px;
            background-color: #4F46E5;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          button:hover {
            background-color: #3730A3;
          }
        </style>
      </head>
      <body>
        <h1>📄 PDF API is running 🚀</h1>

        <div class="url-box">
          <input id="pdf-url" type="text" value="${pdfUrl}" readonly />
          <button onclick="copyUrl()">Copy URL</button>
        </div>

        <div>
          <a href="${pdfUrl}?download=true">Download PDF</a>
        </div>
        <script>
          function copyUrl() {
            const input = document.getElementById('pdf-url');
            input.select();
            input.setSelectionRange(0, 99999); // For mobile
            navigator.clipboard.writeText(window.location.origin + input.value);
            alert('URL copied to clipboard!');
          }
        </script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
export default app;
