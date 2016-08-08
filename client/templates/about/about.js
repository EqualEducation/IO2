Template.about.onRendered(function() {
  if (Session.get('currentAboutPageId') === undefined) {
    Session.set('currentAboutPageId', 'about1');
  }
});

Template.about.helpers({
  aboutPage : function() {
    return Session.get('currentAboutPageId');
  }
});
