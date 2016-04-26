Template.storage_location_offline.onRendered(function() {
    var items = this.data.offline_videos;
    if (items != undefined && items.length >= 2) {
      Session.set('numberOfOfflineItems', items.length);
    }
    else {
      Session.set('numberOfOfflineItems', 1);
    }
})

Template.storage_location_offline.helpers({
  'numberOfItems' : function() {
    console.log('number of OFFLINE items');
    var n = Session.get('numberOfOfflineItems');
    var items = [];
    for(var i = 1; i <= n; ++i) {
      items.push(i);
    }
    return items;
  },
  'isDisabled': function() {
    var n = Session.get('numberOfOfflineItems');
    if (n <= 1) {
      return 'disabled';
    }
  },
  'videoAtIndex' : function(index) {
    var video = new Object();
    console.log('video at index: ' + index)
    if (Template.instance().data.offline_videos != undefined && index < Template.instance().data.offline_videos.length)
    {
      video = Template.instance().data.offline_videos[index]
      console.log(video);
    }
    return video;
  }
})

Template.storage_location_offline.events({
  'click .addItem' : function(event, template) {
    var numItems = Session.get('numberOfOfflineItems');
    Session.set('numberOfOfflineItems', numItems + 1);
  },
  'click .removeItem' : function(event, template) {
    var numItems = Session.get('numberOfOfflineItems');
    if (numItems > 1) {
      Session.set('numberOfOfflineItems', numItems - 1);
    }
  }
})
