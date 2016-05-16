Template.about.onRendered(function() {
 Session.set('currentAboutPageId', 'about1');
})

Template.about.helpers({
  aboutPage : function() {
    return Session.get('currentAboutPageId');
  }
})
