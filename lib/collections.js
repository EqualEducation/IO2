var fileStore = new FS.Store.S3("s3files", {
  accessKeyId: "AKIAI7SZFS4H7RWGB5WA", //required if environment variables are not set
  secretAccessKey: "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", //required if environment variables are not set
  bucket: "ietu-resources-live"
});

Files = new FS.Collection("files", {
  stores: [fileStore]
});

fileDetails = new Mongo.Collection('files');
Resources = new Mongo.Collection('resources');
Activities = new Mongo.Collection('activities');
Curricula = new Mongo.Collection('curricula');
Options = new Mongo.Collection('options');
