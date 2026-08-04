import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../pdf/styles';

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>AI Career Guidance Platform</Text>
    <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
  </View>
);

const CareerComparisonPage = ({ comparison }) => {
  if (!comparison || comparison.length === 0) return null;

  return (
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Text style={styles.header}>Career Comparison Matrix</Text>
      
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCellHeader, flex: 2 }}><Text>Career</Text></View>
          <View style={styles.tableCellHeader}><Text>Salary</Text></View>
          <View style={styles.tableCellHeader}><Text>Difficulty</Text></View>
          <View style={styles.tableCellHeader}><Text>Education</Text></View>
          <View style={styles.tableCellHeader}><Text>Remote</Text></View>
          <View style={styles.tableCellHeader}><Text>Stability</Text></View>
          <View style={styles.tableCellHeader}><Text>Competition</Text></View>
          <View style={styles.tableCellHeader}><Text>AI Resistance</Text></View>
        </View>
        {comparison.map((c, i) => (
          <View key={i} style={styles.tableRow}>
            <View style={{ ...styles.tableCell, flex: 2 }}><Text style={{ fontWeight: 700 }}>{c.career}</Text></View>
            <View style={styles.tableCell}><Text>{c.salary}</Text></View>
            <View style={styles.tableCell}><Text>{c.difficulty}</Text></View>
            <View style={styles.tableCell}><Text>{c.educationLength}</Text></View>
            <View style={styles.tableCell}><Text>{c.remoteWork}</Text></View>
            <View style={styles.tableCell}><Text>{c.jobStability}</Text></View>
            <View style={styles.tableCell}><Text>{c.competition}</Text></View>
            <View style={styles.tableCell}><Text>{c.aiResistance}</Text></View>
          </View>
        ))}
      </View>

      <Footer />
    </Page>
  );
};

export default CareerComparisonPage;
