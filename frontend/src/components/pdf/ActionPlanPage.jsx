import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../pdf/styles';

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>AI Career Guidance Platform</Text>
    <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
  </View>
);

const ActionPlanPage = ({ actionPlan }) => {
  if (!actionPlan || actionPlan.length === 0) return null;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Strategic Action Plan</Text>
      
      {actionPlan.map((phase, idx) => (
        <View key={idx} style={styles.section}>
          <Text style={styles.title}>{phase.phase}</Text>
          
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.mutedText}>Focus Skills</Text>
              <Text style={styles.text}>{phase.skills}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.mutedText}>Habits to Build</Text>
              <Text style={styles.text}>{phase.habits}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.mutedText}>Books & Courses</Text>
              <Text style={styles.text}>{phase.books} | {phase.courses}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.mutedText}>Projects / Competitions</Text>
              <Text style={styles.text}>{phase.projects} | {phase.competitions}</Text>
            </View>
          </View>
        </View>
      ))}

      <Footer />
    </Page>
  );
};

export default ActionPlanPage;
