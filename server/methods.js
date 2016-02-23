Meteor.methods({
  addResource: function (resource) {
		console.log('ADDING RESOURCE');
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
		resource.createdAt = new Date();
		resource.owner = Meteor.userId();
		resource.username = Meteor.user().username;

    Resources.insert(resource);
  },
  addActivity: function (activity) {
    console.log('ADDING ACTIVITY');
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    activity.createdAt = new Date();
    activity.owner = Meteor.userId();
    activity.username = Meteor.user().username;

    Activities.insert(activity);
  },
  deleteResource: function (resourceId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Tasks.remove(resourceId);
  },
});
