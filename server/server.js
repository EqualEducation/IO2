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

});


S3.config = {
    key: 'AKIAI7SZFS4H7RWGB5WA',
    secret: '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',
    bucket: 'ietu-resources-live'
    // region: 'eu-west-1' // Only needed if not "us-east-1" or "us-standard"
};
