import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../pdf/styles';

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>AI Career Guidance Platform</Text>
    <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
  </View>
);

const LearningStrategyPage = ({ strategy }) => {
  if (!strategy) return null;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Learning Strategy</Text>
      
      <View style={styles.section}>
        <Text style={styles.title}>How The Student Learns Best</Text>
        <Text style={styles.text}>{strategy.howTheyLearnBest}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Recommended Formats</Text>
        <View style={styles.grid}>
          {strategy.recommendations?.map((rec, i) => (
            <Text key={i} style={styles.badge}>{rec.toUpperCase()}</Text>
          ))}
        </View>
      </View>

      <Footer />
    </Page>
  );
};

export default LearningStrategyPage;
