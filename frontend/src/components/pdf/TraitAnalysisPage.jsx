import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../pdf/styles';

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>AI Career Guidance Platform</Text>
    <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
  </View>
);

const TraitAnalysisPage = ({ traits }) => {
  if (!traits || traits.length === 0) return null;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Deep Trait Analysis</Text>
      
      {traits.map((trait, i) => (
        <View key={i} style={styles.section}>
          <Text style={{ ...styles.header, fontSize: 16, marginBottom: 8 }}>{trait.trait}</Text>
          
          <Text style={{ ...styles.title, marginTop: 4 }}>Interpretation</Text>
          <Text style={styles.text}>{trait.interpretation}</Text>

          <View style={styles.row}>
            <View style={{ ...styles.col, paddingRight: 8 }}>
              <Text style={styles.title}>Advantages</Text>
              <Text style={styles.text}>{trait.advantages}</Text>
            </View>
            <View style={{ ...styles.col, paddingLeft: 8 }}>
              <Text style={styles.title}>Limitations</Text>
              <Text style={styles.text}>{trait.limitations}</Text>
            </View>
          </View>

          <Text style={styles.title}>Career Relevance</Text>
          <Text style={styles.text}>{trait.careerRelevance}</Text>
        </View>
      ))}

      <Footer />
    </Page>
  );
};

export default TraitAnalysisPage;
