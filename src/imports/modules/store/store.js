import { Store } from 'vuex';
import createLogger from 'vuex/dist/logger';

import { tasksStoreModule } from '/src/imports/modules/tasks/client/state/tasks-store';

const plugins = [];
let store;

if (['production', 'test'].indexOf(process.env.NODE_ENV) === -1) {
  plugins.push(createLogger());
}

const createStore = () => {
  const newStore = new Store({
    plugins,
    modules: {
      tasks: tasksStoreModule
    }
  });
  store = newStore;
  return newStore;
};
  
export {
  createStore,
  store
};
