import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

const tasksSchema = new SimpleSchema({
    _id: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        autoValue: new Date(),
        optional: true
    },
    updatedAt: {
        type: Date,
        autoValue: new Date(),
        optional: true
    },
    deleted: {
        type: Number,
        autoValue: 0,
        optional: true
    }
});

export {
    tasksSchema
};