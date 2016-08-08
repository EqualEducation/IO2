Template.admin.onRendered(function() {
 Session.set('currentAdminPageId', 'users');
})

Template.admin.helpers({
  adminPage : function() {
    return Session.get('currentAdminPageId');
  }
})
