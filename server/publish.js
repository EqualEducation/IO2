Meteor.publish("fileUploads", function () {
    console.log("publishing fileUploads");
    return YourFileCollection.find();
  });
Meteor.publish("fileMeta", function () {
    console.log("publishing fileMeta");
   return fileDetails.find();
  });