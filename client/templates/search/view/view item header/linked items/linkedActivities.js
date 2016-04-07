Template.linkedActivities.onRendered(function() {
  $('.ui.dropdown.linked')
    .dropdown({
      action: 'hide'
    });
})

Template.linkedActivities.helpers({
  associatedActivity: function(activityIds){
    var activity=Activities.findOne(activityIds);
    return activity;
  },
  hasLinkedActivities: function(activityIds) {
    if (activityIds != undefined) {
      return activityIds.length > 0;
    }

    return false;
  },
  numberOfLinkedActivities: function(activityIds) {
    if (activityIds == undefined) {
      return 'Something went wrong';
    }

    if (activityIds.length > 1) {
      return activityIds.length + " activities use this resource"
    } else {
      return activityIds.length + " activity uses this resource"
    }
  }
})
