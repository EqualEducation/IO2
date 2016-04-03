Meteor.publish("resources-searchpage-data", function () {
    console.log("publishing resources-searchpage-data");
   return Resources.find({},{fields: {'itemType' : 1, 'details.title' : 1, 'details.description' : 1, 'type' : 1}});
   //return Resources.find();
  });

Meteor.publish("activities-searchpage-data", function () {
      console.log("publishing activities-searchpage-data");

     return Activities.find({},{fields: {'itemType' : 1, 'details.title' : 1, 'details.description' : 1}});
});

Meteor.publish("curricula-searchpage-data", function () {
      console.log("publishing curricula-searchpage-data");
     return Curricula.find({},{fields: {'itemType' : 1, 'details.title' : 1, 'details.description' : 1}});
});

Meteor.publish("all-resources", function () {
    console.log("publishing resources");
   return Resources.find();
  });

Meteor.publish("all-activities", function () {
    console.log("publishing activities");
   return Activities.find();
  });

Meteor.publish("all-curricula", function () {
    console.log("publishing activities");
   return Curricula.find();
  });

Meteor.publish("fileUploads", function () {
    console.log("publishing fileUploads");
    return YourFileCollection.find();
  });

// Meteor.publish("fileMeta", function () {
//     console.log("publishing fileMeta");
//    return fileDetails.find();
//   });


//DROP DOWN DATA
Meteor.publish("options", function () {
    console.log("publishing options");
   return Options.find();

});

//COUNTS
Meteor.publish("resources-createpage-count", function () {
    console.log("publishing resources-createpage-count");
    return Resources.find({},{fields: {'_id' : 1, 'type' : 1}});
  });

Meteor.publish("activities-createpage-count", function () {
  console.log("publishing activities-createpage-count");
  return Activities.find({},{fields: {'_id' : 1}});
});

Meteor.publish("curricula-createpage-count", function () {
  console.log("publishing curricula-createpage-count");
  return Curricula.find({},{fields: {'_id' : 1}});
});
