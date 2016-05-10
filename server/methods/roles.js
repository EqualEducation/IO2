Meteor.methods({
  addUserRoles: function(roles, userIds) {
    var loggedInUser = Meteor.user()

        if (!loggedInUser ||
            !Roles.userIsInRole(loggedInUser,
                                ['admin'])) {
          throw new Meteor.Error(403, "Access denied")
        }
        
        userIds.forEach(function(userId) {
          Roles.setUserRoles(userId, roles)
        })
  }
})
