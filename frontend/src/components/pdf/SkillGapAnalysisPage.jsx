import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../pdf/styles';

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>AI Career Guidance Platform</Text>
    <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
  </View>
);

const SkillGapAnalysisPage = ({ skillGapAnalysis }) => {
  if (!skillGapAnalysis || skillGapAnalysis.length === 0) return null;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Skill Gap Analysis</Text>
      
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCellHeader}><Text>Skill</Text></View>
          <View style={styles.tableCellHeader}><Text>Priority</Text></View>
          <View style={styles.tableCellHeader}><Text>Difficulty</Text></View>
          <View style={styles.tableCellHeader}><Text>Est. Time</Text></View>
        </View>
        {skillGapAnalysis.map((gap, i) => (
          <React.Fragment key={i}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text style={{ fontWeight: 700 }}>{gap.skill}</Text></View>
              <View style={styles.tableCell}><Text>{gap.priority}</Text></View>
              <View style={styles.tableCell}><Text>{gap.difficulty}</Text></View>
              <View style={styles.tableCell}><Text>{gap.estimatedTime}</Text></View>
            </View>
            <View style={{ ...styles.tableRow, backgroundColor: '#f9fafb' }}>
              <View style={{ ...styles.tableCell, flex: 1, borderRight: 'none' }}>
                <Text style={styles.mutedText}>Target: {gap.targetLevel}</Text>
                <Text style={{ marginTop: 4 }}>Resources: {gap.recommendedResources}</Text>
              </View>
            </View>
          </React.Fragment>
        ))}
      </View>

      <Footer />
    </Page>
  );
};

export default SkillGapAnalysisPage;
