Meteor.methods({
  addItem: function(itemType, item) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (itemType == undefined || itemType == null) {
      throw new Meteor.Error("Item type is required");
    }

    item.createdAt = new Date();
    item.owner = Meteor.userId();
    item.username = Meteor.user().username;

    var newItemId;
    if (itemType == ItemTypeEnum.RESOURCE) {
      console.log("ADDING RESOURCE");
      item.itemType='Resource';
      newItemId = Resources.insert(item);
    } else if (itemType == ItemTypeEnum.ACTIVITY) {
      console.log("ADDING ACTIVITY");
      item.itemType='Activity';
      newItemId = Activities.insert(item);
    } else if (itemType == ItemTypeEnum.CURRICULUM) {
      console.log("ADDING CURRICULUM");
      item.itemType='Curriculum';
      newItemId = Curricula.insert(item)
    } else {
      throw new Meteor.Error("Item type not recognized");
    }

    return newItemId;
  },
  // optionsUpsert: function(collection, data){
  //    Customers.upsert( id, doc );
  // },
  deleteResource: function (resourceId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Resources.remove(resourceId);
  },
  deleteActivity: function (activityId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Activities.remove(activityId);
  },
  deleteCurriculum: function (curriculumId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Curricula.remove(curriculumId);
  }
});
