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
  deleteResource: function (resourceId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Tasks.remove(resourceId);
  },
});
