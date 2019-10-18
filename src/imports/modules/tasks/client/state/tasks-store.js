import { actions, mutations } from './tasks-actions-multations';

const initialState = {
  // declare state variable here
};

const getters = {
  // define get function
};

const tasksStoreModule = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions
};

export {
  tasksStoreModule
};


