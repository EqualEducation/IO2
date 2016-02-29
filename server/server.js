Meteor.startup(function () {
  console.log('INSERTING DEFAULT DATA');
  // Insert sample data if the keywords collection is empty
  if (Keywords.find().count() === 0) {
    JSON.parse(Assets.getText("keywords.json")).items.forEach(function (doc) {
      Keywords.insert(doc);
    });
  }
  if (MainTopics.find().count() === 0) {
    JSON.parse(Assets.getText("mainTopics.json")).items.forEach(function (doc) {
      MainTopics.insert(doc);
    });
  }
  if (SubTopics.find().count() === 0) {
    JSON.parse(Assets.getText("subTopics.json")).items.forEach(function (doc) {
      SubTopics.insert(doc);
    });
  }
  if (Methods.find().count() === 0) {
    JSON.parse(Assets.getText("methods.json")).items.forEach(function (doc) {
      Methods.insert(doc);
    });
  }
  if (Audiences.find().count() === 0) {
    JSON.parse(Assets.getText("audiences.json")).items.forEach(function (doc) {
      Audiences.insert(doc);
    });
  }
  if (FilmTypes.find().count() === 0) {
    JSON.parse(Assets.getText("filmTypes.json")).items.forEach(function (doc) {
      FilmTypes.insert(doc);
    });
  }
  if (Materials.find().count() === 0) {
    JSON.parse(Assets.getText("materials.json")).items.forEach(function (doc) {
      Materials.insert(doc);
    });
  }
});
