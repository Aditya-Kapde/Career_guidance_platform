import api from './api';

export const assessmentApi = {
  checkHealth: async () => {
    const res = await api.get('/api/health');
    return res.data;
  },

  getQuestions: async () => {
    const res = await api.get('/api/assessment/questions');
    return res.data;
  },

  analyzeAssessment: async ({ educationLevel, responses }) => {
    const res = await api.post('/api/assessment/analyze', {
      educationLevel,
      responses
    });
    return res.data;
  }
};

export default assessmentApi;
