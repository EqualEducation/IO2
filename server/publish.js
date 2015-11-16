Meteor.publish("fileUploads", function () {
    console.log("publishing fileUploads");
    return YourFileCollection.find();
  });