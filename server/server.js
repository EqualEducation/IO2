Meteor.startup(function () {
  var archiver = require('archiver');
  var archive = archiver.create('zip', {}); // or archiver('zip', {});
  var optionTypes = ["audiences", "mainTopics", "materials", "methods", "subTopics", "videoTypes",];
  var doc = Options.findOne();
  if (doc == undefined){
    doc = new Object();
  }

  optionTypes.forEach(function (type) {
    var values = JSON.parse(Assets.getText(type + ".json")).items;
    doc[type] = values;
  });

  console.log(doc);
  Options.upsert(doc._id, doc);

});
