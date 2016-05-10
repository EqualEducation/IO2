Template.admin.helpers({
  'users' : function() {
    var users = Meteor.users.find().fetch();
    return users;
  },
  'hasRole' : function(roleToFind, userRoles) {
    if (userRoles == undefined) {
      return '';
    }
    var index = userRoles.indexOf(roleToFind)
    if (index > -1)
    {
      return 'checked'
    } else {
      return '';
    }
  }
})

Template.admin.events({
  'click .save' : function(e, t) {
    $('.page.dimmer:first')
    .dimmer('toggle')
    ;
    var users = Meteor.users.find().fetch();
    var count = 0;
    var adminUserIds = [];
    var editorUserIds = [];
    var defaultUserIds = [];
    users.forEach(function(user) {
      var isAdmin = t.find("#admin_" + count).checked;
      var isEditor = t.find("#editor_" + count).checked;

      if (isAdmin) {
        adminUserIds.push(user._id)
      } else if (isEditor) {
        editorUserIds.push(user._id)
      } else {
        defaultUserIds.push(user._id)
      }
      count++;
    })
    Meteor.call('addUserRoles', ['admin'], adminUserIds, function(error, result) {
      if (!error) {
        Meteor.call('addUserRoles', ['editor'], editorUserIds, function(error, result){
          if (!error) {
            Meteor.call('addUserRoles', [], defaultUserIds, function(error, result){
              if (!error) {
                  $('.page.dimmer:first')
                  .dimmer('toggle')
                  ;
              }
            });
          }
        });
      }
    });

  },
  'click .cancel' : function(e, t) {

  }
})
