Template.storage_location_online.onRendered(function() {
  console.log('setting numberOfItems');
  var items = this.data.online_videos;
  if (items != undefined && items.length >= 2) {
    Session.set('numberOfItems', items.length);
  }
  else {
    Session.set('numberOfItems', 1);
  }
})

Template.storage_location_online.helpers({
  'numberOfItems' : function() {
    var n = Session.get('numberOfItems');
    var items = [];
    for(var i = 1; i <= n; ++i) {
      items.push(i);
    }
    return items;
  },
  'isDisabled': function() {
    var n = Session.get('numberOfItems');
    if (n <= 1) {
      return 'disabled';
    }
  }
})

Template.storage_location_online.events({
  'click .addItem' : function(event, template) {
    var numItems = Session.get('numberOfItems');
    Session.set('numberOfItems', numItems + 1);
  },
  'click .removeItem' : function(event, template) {
    var numItems = Session.get('numberOfItems');
    if (numItems > 1) {
      Session.set('numberOfItems', numItems - 1);
    }
  }
})

Template.video_location_online.onRendered(function() {
  $('#resourceDetailsForm').form({fields : {}});

})
