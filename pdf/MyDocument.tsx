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

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Hello, this is your PDF document!</Text>
      </View>
      <View style={styles.section}>
        <Text>Generated with react-pdf on the server 📄</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
