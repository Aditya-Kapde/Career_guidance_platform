import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../pdf/styles';

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>AI Career Guidance Platform</Text>
    <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
  </View>
);

const ParentGuidancePage = ({ guidance }) => {
  if (!guidance) return null;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Parental Guidance</Text>
      
      <View style={styles.highlightBox}>
        <Text style={{ ...styles.title, marginTop: 0 }}>How to Support</Text>
        <Text style={styles.text}>{guidance.howToSupport}</Text>
      </View>

      <View style={{ ...styles.highlightBox, backgroundColor: '#fef2f2', borderLeft: '4pt solid #ef4444' }}>
        <Text style={{ ...styles.title, marginTop: 0, color: '#ef4444' }}>What NOT to Force</Text>
        <Text style={styles.text}>{guidance.whatNotToForce}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Extracurriculars</Text>
        <Text style={styles.text}>{guidance.extracurriculars}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Motivation & Burnout</Text>
        <Text style={styles.text}>{guidance.howToMotivate}</Text>
        <Text style={{ ...styles.text, marginTop: 8 }}>{guidance.avoidBurnout}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Evaluating Progress</Text>
        <Text style={styles.text}>{guidance.evaluateProgress}</Text>
      </View>

      <Footer />
    </Page>
  );
};

export default ParentGuidancePage;
