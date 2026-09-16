import api from './api';

export const roadmapApi = {
  getRoadmapByCareerId: async (careerId) => {
    return api.get(`/api/roadmaps/${careerId}`);
  }
};

export default roadmapApi;
