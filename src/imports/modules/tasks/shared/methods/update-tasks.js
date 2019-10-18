import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin'
import SimpleSchema from 'simpl-schema'

import { Tasks } from '../collections/tasks-collections'

const addTask = new ValidatedMethod({
  name: 'Tasks.methods.addTask',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    taskObj: { type: Object},
    "taskObj.task": { type: String},
    "taskObj.deadline": { type: Date}
  }).validator(),
  run({ taskObj }) {
    
    if (Meteor.isServer) {
      
      // if (!Meteor.userId()) {
      //   throw new Meteor.Error(403, 'Permission is not allowed.')
      // }

      let obj = {
        status: "ACTIVE",
        task: taskObj.task,
        deadline: taskObj.deadline,
        createdAt: new Date(),
        deleted: 0
      }

      return Tasks.insert(obj);
    }
  }
});

const deleteTask = new ValidatedMethod({
  name: 'Tasks.methods.deleteTask',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    taskId: { type: String}
  }).validator(),
  run({ taskId}) {
    
    if (Meteor.isServer) {
      
      // if (!Meteor.userId()) {
      //   throw new Meteor.Error(403, 'Permission is not allowed.')
      // }

      let updated = Tasks.update({_id: taskId}, {$set: {deleted: 1}});
      return updated;

    }
  }
});

const updateTask = new ValidatedMethod({
  name: 'Tasks.methods.updateTask',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    taskObj: { type: Object},
    "taskObj.taskId": { type: String},
    "taskObj.task": { type: String},
    "taskObj.deadline": { type: Date}
  }).validator(),
  run({taskObj}) {
    
    if (Meteor.isServer) {
      
      // if (!Meteor.userId()) {
      //   throw new Meteor.Error(403, 'Permission is not allowed.')
      // }

      let updated = Tasks.update({
        _id: taskObj.taskId
      }, {
        $set: {
          task: taskObj.task,
          deadline: taskObj.deadline
        }
      });
      return updated;

    }
  }
});

export { addTask, updateTask, deleteTask }
