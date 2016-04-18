Template.connectActivities.onRendered(function() {
  Session.set('numberOfSlots', 2);

})

Template.slot.onRendered(function() {
  $('.noAdditions.ui.dropdown')
    .dropdown()
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
  },
  'numberOfSlots' : function() {
    var n = Session.get('numberOfSlots');
    var slots = [];
    for(var i = 1; i <= n; ++i) {
      slots.push(i);
    }
    return slots;
  },
  'isDisabled': function() {
    var n = Session.get('numberOfSlots');
    if (n <= 2) {
      return 'disabled';
    }
  }
})

Template.connectActivities.events({
  'click .addNewSlot' : function(event, template) {
    var numSlots = Session.get('numberOfSlots');
    Session.set('numberOfSlots', numSlots + 1);
  },
  'click .removeSlot' : function(event, template) {
    var numSlots = Session.get('numberOfSlots');
    if (numSlots > 2) {
      Session.set('numberOfSlots', numSlots - 1);
    } else {
      alert('Could not remove slot. A curriculum needs to have at least two activity slots.');
    }
  },
  'click .removeAll' : function(event, template) {
    Session.set('numberOfSlots', 0);
  }
})

Template.slot.helpers({
  'isLastSlot' : function(index) {
    var n = Session.get('numberOfSlots');
    return index==n;
  },
})
