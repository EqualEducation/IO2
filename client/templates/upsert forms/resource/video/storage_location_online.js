Template.storage_location_online.onRendered(function() {
    var items = this.data.online_videos;
    if (items != undefined && items.length >= 2) {
      Session.set('numberOfOnlineItems', items.length);
    }
    else {
      Session.set('numberOfOnlineItems', 1);
    }
})

Template.storage_location_online.helpers({
  'numberOfItems' : function() {
    var n = Session.get('numberOfOnlineItems');
    var items = [];
    for(var i = 1; i <= n; ++i) {
      items.push(i);
    }
    return items;
  },
  'isDisabled': function() {
    var n = Session.get('numberOfOnlineItems');
    if (n <= 1) {
      return 'disabled';
    }
  },
  'videoAtIndex' : function(index) {
    var video = new Object();
    if (Template.instance().data.online_videos != undefined && index < Template.instance().data.online_videos.length)
    {
      video = Template.instance().data.online_videos[index]
      console.log(video)
    }
    return video;
  }
})

Template.storage_location_online.events({
  'click .addItem' : function(event, template) {
    var numItems = Session.get('numberOfOnlineItems');
    Session.set('numberOfOnlineItems', numItems + 1);
  },
  'click .removeItem' : function(event, template) {
    var numItems = Session.get('numberOfOnlineItems');
    if (numItems > 1) {
      Session.set('numberOfOnlineItems', numItems - 1);
    }
  }
})
