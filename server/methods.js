Meteor.methods({
  addItem: function(itemType, item) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    item.createdAt = new Date();
    item.owner = Meteor.userId();
    item.username = Meteor.user().username;

    var newItemId;
    if (itemType.toLowerCase() == "resource") {
      item.itemType='Resource';
      newItemId = Resources.insert(activity);
    } else if (itemType.toLowerCase() == "activity") {
      item.itemType='Activity';
      newItemId = Activities.insert(activity);

    } else if (itemType.toLowerCase() == "curriculum") {
      item.itemType='Curriculum';
      newItemId = Curricula.insert(activity);
    }

    return newItemId;
  },
  optionsUpsert: function(collection, data){
     Customers.upsert( id, doc );
  },

  deleteCurriculum: function (curriculumId) {
   if (! Meteor.userId()) {
     throw new Meteor.Error("not-authorized");
   }
   Curricula.remove(curriculumId);
 }

});
