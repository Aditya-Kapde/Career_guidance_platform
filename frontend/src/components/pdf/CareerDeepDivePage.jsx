import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../pdf/styles';

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>AI Career Guidance Platform</Text>
    <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
  </View>
);

const CareerDeepDivePage = ({ topCareers }) => {
  if (!topCareers || topCareers.length === 0) return null;

  return topCareers.map((career, idx) => (
    <Page key={idx} size="A4" style={styles.page}>
      <Text style={styles.header}>{career.career} - {career.score}% Match</Text>
      
      <View style={styles.highlightBox}>
        <Text style={{ ...styles.title, marginTop: 0 }}>Why This Fits You</Text>
        <Text style={styles.text}>{career.reason}</Text>
      </View>

      <View style={styles.row}>
        <View style={{ ...styles.col, paddingRight: 8 }}>
          <View style={styles.section}>
            <Text style={styles.title}>Daily Responsibilities</Text>
            <Text style={styles.text}>{career.dailyResponsibilities}</Text>
          </View>
        </View>
        <View style={{ ...styles.col, paddingLeft: 8 }}>
          <View style={styles.section}>
            <Text style={styles.title}>Required Personality</Text>
            <Text style={styles.text}>{career.requiredPersonality}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Industry Outlook</Text>
        <Text style={styles.text}>Growth: {career.growthOpportunities}</Text>
        <Text style={styles.text}>Demand: {career.futureDemand}</Text>
        <Text style={styles.text}>AI Impact: {career.aiImpact}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Work Environment & Lifestyle</Text>
        <Text style={styles.text}>Environment: {career.workEnvironment}</Text>
        <Text style={styles.text}>Salary Progression: {career.salaryProgression}</Text>
        <Text style={styles.text}>Work-Life Balance: {career.workLifeBalance}</Text>
      </View>

      <Footer />
    </Page>
  ));
};

export default CareerDeepDivePage;
