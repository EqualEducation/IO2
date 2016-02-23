
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
