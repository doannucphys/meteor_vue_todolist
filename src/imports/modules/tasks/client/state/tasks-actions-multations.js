import {addTask, deleteTask, updateTask} from '/src/imports/modules/tasks/shared/methods/update-tasks'

const MUTATION_TYPES = {
  // multation Type for tasks
};

const actions = {
  // action add task
  async actionAddTask({ commit, state }, { taskObj }) {
    try {
      let added  = await addTask.callPromise({taskObj: taskObj});
      return added;
    } catch (e) {
      throw new Error('failed to add task: ' + e)
    }
  },
  // action edit task
  async actionUpdateTask({ commit, state }, { taskObj }) {
    try {
      let updated  = await updateTask.callPromise({taskObj: taskObj});
      return updated;
    } catch (e) {
      throw new Error('failed to add task: ' + e)
    }
  },
  // delete
  async actionDeleteTask({ commit, state }, { taskId }) {
    try {
      let added  = await deleteTask.callPromise({taskId: taskId});
      return added;
    } catch (e) {
      throw new Error('failed to add task: ' + e)
    }
  }
};

const mutations = { 
  // multation for tasks
};

export {
  actions,
  mutations,
  MUTATION_TYPES
};
