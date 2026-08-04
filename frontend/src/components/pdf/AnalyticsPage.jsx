import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../pdf/styles';

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>AI Career Guidance Platform</Text>
    <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
  </View>
);

const AnalyticsPage = ({ analytics, traitScores }) => {
  if (!analytics) return null;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Profile Analytics</Text>

      {/* Trait Rankings */}
      <View style={styles.section}>
        <Text style={styles.title}>Trait Rankings</Text>
        {analytics.traitRanking?.map((trait, index) => (
          <View key={index} style={{ marginBottom: 12 }}>
            <View style={{ ...styles.row, justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={styles.text}>{trait.trait.toUpperCase()}</Text>
              <Text style={styles.text}>{trait.score}%</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={{ ...styles.barFill, width: `${trait.score}%` }} />
            </View>
          </View>
        ))}
      </View>

      {/* Career Compatibility */}
      <View style={styles.section}>
        <Text style={styles.title}>Career Compatibility</Text>
        {analytics.careerRanking?.map((career, index) => (
          <View key={index} style={{ marginBottom: 12 }}>
            <View style={{ ...styles.row, justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={styles.text}>{career.career}</Text>
              <Text style={styles.text}>{career.score}%</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={{ ...styles.barFill, width: `${career.score}%`, backgroundColor: '#10b981' }} />
            </View>
          </View>
        ))}
      </View>

      <Footer />
    </Page>
  );
};

export default AnalyticsPage;
