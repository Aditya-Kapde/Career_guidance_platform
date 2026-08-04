import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../pdf/styles';

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>AI Career Guidance Platform</Text>
    <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
  </View>
);

const CoverPage = ({ reportData }) => {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const topMatch = reportData.analytics?.overallProfileSummary?.highestCareerMatch || 'N/A';
  const readiness = reportData.analytics?.careerReadiness?.score || 0;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.coverTitle}>Career Intelligence Report</Text>
      <Text style={styles.coverSubtitle}>Personalized Pathway Analysis</Text>

      <View style={{ marginTop: 100 }}>
        <View style={styles.section}>
          <Text style={styles.title}>Student Profile</Text>
          <Text style={styles.header}>{reportData.student?.name || 'Student'}</Text>
          
          <View style={{ ...styles.row, marginTop: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mutedText}>Education Level</Text>
              <Text style={styles.text}>{reportData.student?.educationLevel || 'N/A'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.mutedText}>Date Generated</Text>
              <Text style={styles.text}>{date}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Primary Assessment Results</Text>
          <View style={{ ...styles.row, marginTop: 8 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mutedText}>Top Career Match</Text>
              <Text style={{ ...styles.header, marginBottom: 0, marginTop: 4 }}>{topMatch}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.mutedText}>Career Readiness</Text>
              <Text style={{ ...styles.header, marginBottom: 0, marginTop: 4 }}>{readiness}/100</Text>
            </View>
          </View>
        </View>
      </View>

      <Footer />
    </Page>
  );
};

export default CoverPage;
