////////////////
// BeforeHooks
////////////////
// I use an object that contains all before hooks
var IR_BeforeHooks = {
    isLoggedIn: function() {
        if (!(Meteor.loggingIn() || Meteor.user())) {
          this.render('unauthorized');
        }else {
           this.next();
       }
    },
    isAdminUser: function() {
      console.log('is admin user')
      if (Meteor.loggingIn() || !Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin'])) {
        this.render('unauthorized');
      } else {
         this.next();
       }
    },
    isEditorUser: function() {
      console.log('is editor user or admin user')
      if (Meteor.loggingIn() || !Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['editor', 'admin'])) {
        this.render('unauthorized');
      } else {
         this.next();
      }
    }
    // add more before hooks here
}

// // (Global) Before hooks for any route
// Router.onBeforeAction(IR_BeforeHooks.somethingForAnyRoute);
// ...

// Before hooks for specific routes
// Must be equal to the route names of the Iron Router route map
let checkForAdminRoutes = ['admin'];
let checkForEditorRoutes = ['create', 'createItem', 'createResource', 'activity.edit','resource.edit','curriculum.edit'];

Router.onRun(IR_BeforeHooks.isEditorUser, {only: checkForEditorRoutes})
Router.onRerun(IR_BeforeHooks.isEditorUser, {only: checkForEditorRoutes})

Router.onRun(IR_BeforeHooks.isAdminUser, {only: checkForAdminRoutes})
Router.onRerun(IR_BeforeHooks.isAdminUser, {only: checkForAdminRoutes})
