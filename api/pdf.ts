import { NextApiRequest, NextApiResponse } from "next";
import { renderToStream } from "@react-pdf/renderer";
import MyDocument from "../src/pdf/MyDocument";
import React from "react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader("Content-Type", "application/pdf");
    const isDownload = req.query.download === "true";
    res.setHeader(
      "Content-Disposition",
      `${isDownload ? "attachment" : "inline"}; filename="document.pdf"`
    );

    const stream = await renderToStream(<MyDocument />);
    stream.pipe(res);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).send("Error generating PDF");
  }
}