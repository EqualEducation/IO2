Meteor.startup(function () {

  var optionTypes = ["audiences", "videoTypes", "keywords", "mainTopics", "materials", "methods", "subTopics"];
  var doc = undefined;

  optionTypes.forEach(function (type) {
    var found = Options.findOne({type : {$exists : false}})
    if (found == undefined) {
      if (doc == undefined){
        doc = new Object();
      }
      var values = JSON.parse(Assets.getText(type + ".json")).items;
      doc[type] =  values;

    }
  })

  if (doc != undefined) {
    Options.insert(doc);
  }



  // if (SubTopics.find().count() === 0) {
  //   JSON.parse(Assets.getText("subTopics.json")).items.forEach(function (doc) {
  //     SubTopics.insert(doc);
  //   });
  // }
  // if (Methods.find().count() === 0) {
  //   JSON.parse(Assets.getText("methods.json")).items.forEach(function (doc) {
  //     Methods.insert(doc);
  //   });
  // }
  // if (Audiences.find().count() === 0) {
  //   JSON.parse(Assets.getText("audiences.json")).items.forEach(function (doc) {
  //     Audiences.insert(doc);
  //   });
  // }
  // if (videoTypes.find().count() === 0) {
  //   JSON.parse(Assets.getText("videoTypes.json")).items.forEach(function (doc) {
  //     videoTypes.insert(doc);
  //   });
  // }
  // if (Materials.find().count() === 0) {
  //   JSON.parse(Assets.getText("materials.json")).items.forEach(function (doc) {
  //     Materials.insert(doc);
  //   });
  // }
});
