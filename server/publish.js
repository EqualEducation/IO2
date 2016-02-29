
Meteor.publish("resources", function () {
    console.log("publishing resources");
   return Resources.find();
  });

Meteor.publish("activities", function () {
    console.log("publishing activities");
   return Activities.find();
  });

Meteor.publish("curricula", function () {
    console.log("publishing activities");
   return Curricula.find();
  });

Meteor.publish("fileUploads", function () {
    console.log("publishing fileUploads");
    return YourFileCollection.find();
  });

Meteor.publish("fileMeta", function () {
    console.log("publishing fileMeta");
   return fileDetails.find();
  });


//DROP DOWN DATA
Meteor.publish("mainTopics", function () {
    console.log("publishing mainTopics");
   return MainTopics.find();
});
Meteor.publish("subTopics", function () {
    console.log("publishing subTopics");
   return SubTopics.find();
});
Meteor.publish("keywords", function () {
    console.log("publishing keywords");
   return Keywords.find();
});
Meteor.publish("methods", function () {
    console.log("publishing methods");
   return Methods.find();
});
Meteor.publish("audiences", function () {
    console.log("publishing audiences");
   return Audiences.find();
});
Meteor.publish("materials", function () {
    console.log("publishing materials");
   return Materials.find();
});
Meteor.publish("filmTypes", function () {
    console.log("publishing filmTypes");
   return FilmTypes.find();
});
