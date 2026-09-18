import api from './api';

export const roadmapApi = {
  getRoadmapByCareerId: async (careerId) => {
    const res = await api.get(`/api/roadmaps/${careerId}`);
    return res.data;
  }
};

export default roadmapApi;
