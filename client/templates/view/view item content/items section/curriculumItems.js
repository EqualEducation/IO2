Template.curriculumItems.helpers({
  activity: function(activityID) {
  var activity=Activities.findOne(activityID);
  //linkedFile=YourFileCollection.findOne();
  console.log("ACTIVITY")
  console.log(activity)
  return activity;

  //return itemType.toLowerCase() + ".view";
  },
});
