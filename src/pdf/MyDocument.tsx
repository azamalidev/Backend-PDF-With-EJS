import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import pdfStyles from './styles';
import pdfData from './data';

const MyDocument = () => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      {/* Header */}
      <Text style={pdfStyles.header}>{pdfData.title}</Text>

      {/* ✅ Image */}
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <Image
          src={pdfData.image}
          style={{ width: 120, height: 120 }}
        />
      </View>

      {/* ✅ Introduction */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Introduction</Text>
        <Text style={pdfStyles.text}>{pdfData.introduction}</Text>
      </View>

      {/* ✅ Dynamic Sections with optional bullets */}
      {pdfData.sections.map((section, index) => (
        <View key={index} style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>{section.title}</Text>
          <Text style={pdfStyles.text}>{section.content}</Text>

          {/* Render bullets if they exist */}
          {section.bullets && (
            <View style={{ marginTop: 6, marginLeft: 12 }}>
              {section.bullets.map((item, i) => (
                <Text key={i} style={pdfStyles.text}>
                  • {item}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}

      {/* ✅ Conclusion */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Conclusion</Text>
        <Text style={pdfStyles.text}>{pdfData.conclusion}</Text>
      </View>

      {/* ✅ Footer */}
      <Text style={pdfStyles.footer}>{pdfData.footer}</Text>
    </Page>
  </Document>
);

export default MyDocument;
