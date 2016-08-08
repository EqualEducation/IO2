Template.adminMenu.events({
  'click .item' : function(event, template) {
    var pageToRender = event.target.id;
    Session.set('currentAdminPageId', pageToRender);
  }
})

Template.adminMenu.helpers({
  'isActive' : function(pageToRenderId) {
      var pageToRender = Session.get('currentAdminPageId')
      if (pageToRenderId == pageToRender)  {
        return 'active';
      }
  }
})
