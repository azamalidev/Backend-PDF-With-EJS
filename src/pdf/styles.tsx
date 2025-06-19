// src/pdf/styles.ts
import { StyleSheet } from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.5,
    color: '#333',
  },
  header: {
    fontSize: 26,
    marginBottom: 16,
    textAlign: 'center',
    color: '#1D4ED8', // Blue-600
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 18,
    padding: 12,
    border: '1pt solid #e5e7eb', // Gray-200
    borderRadius: 6,
    backgroundColor: '#f9fafb', // Gray-50
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#1E40AF', // Blue-800
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 6,
    color: '#374151', // Gray-700
  },
  highlight: {
    backgroundColor: '#FEF3C7', // Amber-100
    padding: 2,
    borderRadius: 2,
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    textAlign: 'center',
    color: '#9CA3AF', // Gray-400
  },
});

export default pdfStyles;
