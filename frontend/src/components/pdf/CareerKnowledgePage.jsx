import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../pdf/styles';

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>AI Career Guidance Platform</Text>
    <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
  </View>
);

const CareerKnowledgePage = ({ careerRoadmaps }) => {
  if (!careerRoadmaps || careerRoadmaps.length === 0) return null;

  return careerRoadmaps.map((roadmap, idx) => (
        <Page key={idx} size="A4" style={styles.page}>
          <Text style={styles.header}>Pathway: {roadmap.title || roadmap.career}</Text>
          <Text style={styles.subHeader}>{roadmap.description || 'Career Overview'}</Text>

          <View style={styles.section}>
            <Text style={styles.title}>Education Path</Text>
            {roadmap.degreeOptions?.map((degree, i) => (
              <Text key={i} style={styles.listItem}>• {degree}</Text>
            ))}
            {roadmap.entranceExams && roadmap.entranceExams.length > 0 && (
              <>
                <Text style={{ ...styles.title, marginTop: 12 }}>Entrance Exams</Text>
                <Text style={styles.text}>{roadmap.entranceExams.join(', ')}</Text>
              </>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Core Skills & Tools</Text>
            <Text style={styles.text}>Skills: {roadmap.coreSkills?.join(', ')}</Text>
            <Text style={styles.text}>Tools: {roadmap.toolsAndTechnologies?.join(', ')}</Text>
          </View>

          {roadmap.timeline && (
            <View style={styles.section}>
              <Text style={styles.title}>Timeline</Text>
              {roadmap.timeline.map((step, i) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 11, fontWeight: 700 }}>{step.year}</Text>
                  <Text style={styles.text}>{step.focus}</Text>
                </View>
              ))}
            </View>
          )}

      </Page>
    ));
};

export default CareerKnowledgePage;
