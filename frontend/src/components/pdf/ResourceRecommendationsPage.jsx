import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../pdf/styles';

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>AI Career Guidance Platform</Text>
    <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
  </View>
);

const ResourceRecommendationsPage = ({ resources }) => {
  if (!resources || resources.length === 0) return null;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Resource Recommendations</Text>
      
      {resources.map((res, i) => (
        <View key={i} style={styles.section}>
          <View style={styles.row}>
            <Text style={{ ...styles.badge, marginRight: 8 }}>{res.type}</Text>
            <Text style={{ fontSize: 12, fontWeight: 700 }}>{res.name}</Text>
          </View>
          <Text style={{ ...styles.text, marginTop: 8 }}>{res.explanation}</Text>
        </View>
      ))}

      <Footer />
    </Page>
  );
};

export default ResourceRecommendationsPage;
