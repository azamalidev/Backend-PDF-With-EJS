import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 14,
  },
});

// ✅ Create Document Component using createElement instead of JSX
const MyDocument = () =>
  React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: 'A4', style: styles.page },
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, null, 'Hello, this is your PDF document!')
      ),
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, null, 'Generated with react-pdf on the server 📄')
      )
    )
  );

export default MyDocument;
