import api from './api';

export const flowTreeApi = {
  getFlowTreeByCareerId: async (careerId) => {
    return api.get(`/api/flow-tree/${careerId}`);
  }
};

export default flowTreeApi;
