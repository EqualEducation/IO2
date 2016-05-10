Meteor.startup(function () {
  var archiver = require('archiver');
  var archive = archiver.create('zip', {}); // or archiver('zip', {});

  var optionTypes = ["mainTopics", "methods", "videoTypes",];
  var doc = Options.findOne();
  if (doc == undefined){
    doc = new Object();
  }

  optionTypes.forEach(function (type) {
    var items = JSON.parse(Assets.getText(type + ".json")).items;
    var names = [];
    items.forEach(function(item) {
      names.push(item.name);
      if (item.subItems != undefined) {
        doc[item.name] = item.subItems;
      }
    })
    doc[type] = names;
  });

  console.log(doc);
  Options.upsert(doc._id, doc);

  var userId;
  if ( Meteor.users.find().count() === 0 ) {
     userId = Accounts.createUser({
        email: Meteor.settings.defaultUserEmail,
        password: Meteor.settings.defaultPassword
    });
  } else {
    userId = Meteor.users.findOne({'emails.address' : Meteor.settings.defaultUserEmail})._id;
  };
  Roles.addUsersToRoles(userId, ['editor','admin'])


});
