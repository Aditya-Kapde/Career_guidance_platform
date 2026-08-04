import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../pdf/styles';

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>AI Career Guidance Platform</Text>
    <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
  </View>
);

const ExecutiveSummaryPage = ({ execData }) => {
  if (!execData) return null;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Executive Summary</Text>
      
      <View style={styles.highlightBox}>
        <Text style={styles.text}>{execData.profileSummary}</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.col}>
          <Text style={styles.title}>Personality & Behaviour</Text>
          <Text style={styles.text}><Text style={{fontWeight: 700}}>Interpretation:</Text> {execData.personalityInterpretation}</Text>
          <Text style={styles.text}><Text style={{fontWeight: 700}}>Dominant Behaviour:</Text> {execData.dominantBehaviour}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.title}>Working Style</Text>
          <Text style={styles.text}><Text style={{fontWeight: 700}}>Learning:</Text> {execData.learningStyle}</Text>
          <Text style={styles.text}><Text style={{fontWeight: 700}}>Communication:</Text> {execData.communicationStyle}</Text>
          <Text style={styles.text}><Text style={{fontWeight: 700}}>Decision Making:</Text> {execData.decisionMaking}</Text>
        </View>
      </View>

      <View style={{ ...styles.section, marginTop: 16 }}>
        <Text style={styles.title}>Key Indicators</Text>
        <Text style={styles.text}><Text style={{fontWeight: 700}}>Biggest Natural Strength:</Text> {execData.biggestStrength}</Text>
        <Text style={styles.text}><Text style={{fontWeight: 700}}>Biggest Development Area:</Text> {execData.biggestDevelopmentOpportunity}</Text>
        <Text style={styles.text}><Text style={{fontWeight: 700}}>Career Readiness:</Text> {execData.readiness}</Text>
        <Text style={styles.text}><Text style={{fontWeight: 700}}>Confidence Level:</Text> {execData.confidenceLevel}</Text>
      </View>

      <Footer />
    </Page>
  );
};

export default ExecutiveSummaryPage;
