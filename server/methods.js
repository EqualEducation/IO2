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
    resource.itemType='Resource';
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
    activity.itemType='Activity';
    Activities.insert(activity);
  },
  addCurriculum: function (curriculum) {
    console.log('ADDING CURRICULUM');
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    curriculum.createdAt = new Date();
    curriculum.owner = Meteor.userId();
    curriculum.username = Meteor.user().username;
    curriculum.itemType='Curriculum';
    Curricula.insert(curriculum);
  },
  optionsUpsert: function(collection, data){
     Customers.upsert( id, doc );
  },
  deleteResource: function (resourceId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Tasks.remove(resourceId);
  },
});
