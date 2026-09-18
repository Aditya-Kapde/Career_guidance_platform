import api from './api';

export const flowTreeApi = {
  getFlowTreeByCareerId: async (careerId) => {
    const res = await api.get(`/api/flow-tree/${careerId}`);
    return res.data;
  }
};

export default flowTreeApi;
