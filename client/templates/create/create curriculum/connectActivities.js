Template.connectActivities.onRendered(function() {
  $('.ui.fluid.multiple.search')
    .dropdown();
})

Template.registerHelper("allActivities", function () {
  var activities = Activities.find({});
  return activities;
});


Template.connectActivities.helpers({
  'selectedActivities' : function() {
    var activityIds = this.activityIds;
    var activities = [];
    activityIds.forEach(function(activityId) {
      var activity = Activities.findOne(activityId);
      activities.push(activity);
    })

    return activities;
  }
})
