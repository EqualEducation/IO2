Template.linkedActivities.onRendered(function() {
  $('.ui.dropdown.linked')
    .dropdown({
      action: 'hide'
    });
})

Template.linkedActivities.helpers({
  associatedActivities: function(resourceID){
    var activities=Activities.find({"resourceIds":resourceID}).fetch();
    return activities;
  },
  hasLinkedActivities: function(activities) {
    if (activities != undefined) {
      return activities.length > 0;
    }

    return false;
  },
  numberOfLinkedActivities: function(activities) {
    if (activities == undefined) {
      return 'Something went wrong';
    }

    if (activities.length > 1) {
      return activities.length + " activities use this resource"
    } else {
      return activities.length + " activity uses this resource"
    }
  }
})
