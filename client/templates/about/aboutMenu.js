Template.aboutMenu.events({
  'click .item' : function(event, template) {
    var aboutPageToRender = event.target.id;
    Session.set('currentAboutPageId', aboutPageToRender);
  }
})

Template.aboutMenu.helpers({
  'isActive' : function(aboutPageId) {
      var aboutPageToRender = Session.get('currentAboutPageId')
      if (aboutPageId == aboutPageToRender)  {
        return 'active';
      }
  }
})
