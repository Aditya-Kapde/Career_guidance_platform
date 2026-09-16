import api from './api';

export const assessmentApi = {
  checkHealth: async () => {
    return api.get('/api/health');
  },

  analyzeAssessment: async ({ educationLevel, responses, traitScores }) => {
    return api.post('/api/assessment/analyze', {
      educationLevel,
      responses,
      traitScores
    });
  }
};

export default assessmentApi;
