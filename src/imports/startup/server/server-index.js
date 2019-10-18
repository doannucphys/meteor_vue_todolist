import { Meteor } from 'meteor/meteor';

import '/src/imports/modules/tasks/server/tasks-publications';
import '/src/imports/modules/tasks/shared/methods/update-tasks';

Meteor.startup(() => {
    // api, email template builder, set DDP rate limit, etc. here !!
});