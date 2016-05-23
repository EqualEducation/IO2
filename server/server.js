Meteor.startup(function () {
  if (Meteor.isServer) {
    smtp = {
       username: Meteor.settings.smtp.email,   // eg: server@gentlenode.com
       password: Meteor.settings.smtp.password,   // eg: 3eeP1gtizk5eziohfervU
       server:   'smtp.gmail.com',  // eg: mail.gandi.net
       port: 465
     }
    var url = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    process.env.MAIL_URL = url
  }

  Activities._ensureIndex({"details.title":"text", "details.keywords" : "text", "details.description":"text"})
  Resources._ensureIndex({"details.title":"text", "details.keywords" : "text", "details.description":"text"})
  Curricula._ensureIndex({"details.title":"text", "details.keywords" : "text", "details.description":"text"})

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
