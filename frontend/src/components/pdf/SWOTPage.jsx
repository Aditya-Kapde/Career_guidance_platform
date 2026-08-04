import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../pdf/styles';

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>AI Career Guidance Platform</Text>
    <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
  </View>
);

const SWOTPage = ({ swot }) => {
  if (!swot) return null;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>SWOT Analysis</Text>
      
      <View style={styles.grid}>
        <View style={{ ...styles.col, paddingRight: 10 }}>
          <View style={{ ...styles.section, borderColor: '#10b981', borderTop: '4pt solid #10b981' }}>
            <Text style={{ ...styles.title, color: '#10b981' }}>Strengths</Text>
            <View style={styles.list}>
              {swot.strengths?.map((s, i) => <Text key={i} style={styles.listItem}>• {s}</Text>)}
            </View>
          </View>
        </View>
        
        <View style={{ ...styles.col, paddingLeft: 10 }}>
          <View style={{ ...styles.section, borderColor: '#ef4444', borderTop: '4pt solid #ef4444' }}>
            <Text style={{ ...styles.title, color: '#ef4444' }}>Weaknesses</Text>
            <View style={styles.list}>
              {swot.weaknesses?.map((w, i) => <Text key={i} style={styles.listItem}>• {w}</Text>)}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={{ ...styles.col, paddingRight: 10 }}>
          <View style={{ ...styles.section, borderColor: '#3b82f6', borderTop: '4pt solid #3b82f6' }}>
            <Text style={{ ...styles.title, color: '#3b82f6' }}>Opportunities</Text>
            <View style={styles.list}>
              {swot.opportunities?.map((o, i) => <Text key={i} style={styles.listItem}>• {o}</Text>)}
            </View>
          </View>
        </View>
        
        <View style={{ ...styles.col, paddingLeft: 10 }}>
          <View style={{ ...styles.section, borderColor: '#f59e0b', borderTop: '4pt solid #f59e0b' }}>
            <Text style={{ ...styles.title, color: '#f59e0b' }}>Threats</Text>
            <View style={styles.list}>
              {swot.threats?.map((t, i) => <Text key={i} style={styles.listItem}>• {t}</Text>)}
            </View>
          </View>
        </View>
      </View>

      <Footer />
    </Page>
  );
};

export default SWOTPage;
