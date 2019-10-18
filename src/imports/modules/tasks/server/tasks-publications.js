import { Meteor} from 'meteor/meteor'
import { check } from 'meteor/check'
import {Tasks} from '/src/imports/modules/tasks/shared/collections/tasks-collections'

Meteor.publish('tasks_public', function () {
  // check(myCartCourseIds, [String]);
  if (Meteor.isServer) {
    // if (!Meteor.userId()) {
    //   throw new Meteor.Error(403, 'Permission is not allowed.')
    // }
    return Tasks.find({
      deleted: 0
    }, {
      fields: {
        _id: 1,
        task: 1,
        deadline: 1,
        createdAt: 1,
        updateddAt: 1
      }
    })
  }

});
  