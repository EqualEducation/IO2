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
    console.log('number of slots: ' + n)
    var slots = [];
    for(var i = 1; i <= n; ++i) {
      console.log('add slot: ' + i)
      slots.push(i);
    }
    console.log(slots)

    return slots;
  },
  'isLastSlot' : function(index) {
    var n = Session.get('numberOfSlots');
    return index==n;
  }
})

Template.connectActivities.events({
  'click .addNewSlot' : function(event, template) {
    var numSlots = Session.get('numberOfSlots');
    Session.set('numberOfSlots', numSlots + 1);
  },
  'click .removeSlot' : function(event, template) {
    var numSlots = Session.get('numberOfSlots');
    Session.set('numberOfSlots', numSlots - 1);
  },
  'click .removeAll' : function(event, template) {
    Session.set('numberOfSlots', 0);
  }
})

Template.slot.helpers({
  'isLastSlot' : function(index) {
    var n = Session.get('numberOfSlots');
    return index==n;
  }
})

//
// Handlebars.registerHelper('times', function(n, block) {
//     var accum = '';
//     for(var i = 0; i < n; ++i)
//         accum += block.fn(i);
//     return accum;
// });
