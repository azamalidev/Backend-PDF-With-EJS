import React from 'react';
import { renderToStream } from '@react-pdf/renderer';
// If MyDocument is a default export:
import MyDocument from '../pdf/MyDocument';
// If MyDocument is a named export, use:
// import { MyDocument } from '../pdf/MyDocument';

// 👇 Fix is here: tell TS that this is a JSX element
export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/pdf');
  // Ensure MyDocument is a React component, not a type
  const element = React.createElement(MyDocument);
  const stream = await renderToStream(element);

  stream.pipe(res);
}
