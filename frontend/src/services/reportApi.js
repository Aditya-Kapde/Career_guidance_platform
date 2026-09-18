import api from './api';

export const reportApi = {
  getReportById: async (reportId) => {
    const res = await api.get(`/api/report/${reportId}`);
    return res.data;
  },

  getUserReports: async () => {
    const res = await api.get('/api/report/user/me');
    return res.data;
  },

  downloadPdfBlob: async (reportId) => {
    const res = await api.get(`/api/report/pdf/${reportId}`, {
      responseType: 'blob'
    });
    return res.data;
  },

  downloadPdfUrl: (reportId) => {
    const base = import.meta.env.VITE_API_URL || '';
    return `${base}/api/report/pdf/${reportId}`;
  }
};

export default reportApi;
