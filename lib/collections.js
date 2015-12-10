var fileStore = new FS.Store.S3("s3files", {
  accessKeyId: "AKIAIM666WHVC6WF3WMQ", //required if environment variables are not set
  secretAccessKey: "wLkbimcgsXCMjmkpIIP1wH8etrsy3QaAbIfk6sMp", //required if environment variables are not set
  bucket: "benji-ee"
});

// YourFileCollection = new FS.Collection("yourFileCollection", {
//   stores: [new FS.Store.FileSystem("yourFileCollection", {path: "~/meteor_uploads"})]
// });
YourFileCollection = new FS.Collection("yourFileCollection", {
  stores: [fileStore]
});
fileDetails=new Mongo.Collection('files');

// if (Meteor.isServer) {
// var fileStore = new FS.Store.S3("Files", {
//     /* REQUIRED */
//     accessKeyId: Meteor.settings.AWSAccessKeyId,
//     secretAccessKey: Meteor.settings.AWSSecretAccessKey,
//     bucket: Meteor.settings.AWSBucket
//   });
// YourFileCollection = new FS.Collection("yourFileCollection", {
//   stores: [fileStore]
// });
// }
// if (Meteor.isClient) {
//   var fileStore = new FS.Store.S3("Files");
//   YourFileCollection = new FS.Collection("yourFileCollection", {
//   stores: [fileStore]
// });
// });
// }


// fileDetails=new Mongo.Collection('files');

// // fileIndex = new EasySearch.Index({
// //   collection: fileDetails,
// //    fields: ['keywords','name'],
// //    engine: new EasySearch.MongoDB()
// //  });
