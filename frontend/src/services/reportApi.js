import api from './api';

export const reportApi = {
  getReportById: async (reportId) => {
    return api.get(`/api/report/${reportId}`);
  },

  downloadPdfUrl: (reportId) => {
    const base = import.meta.env.VITE_API_URL || '';
    return `${base}/api/report/pdf/${reportId}`;
  }
};

export default reportApi;
