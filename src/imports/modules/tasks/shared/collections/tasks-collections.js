import { Mongo } from 'meteor/mongo'
import { tasksSchema } from '../schema/tasks-schema'

const Tasks = new Mongo.Collection('tasks');

Tasks.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Tasks.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Tasks.attachSchema(tasksSchema);

export {
  Tasks
};
