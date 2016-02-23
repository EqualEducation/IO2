var fileStore = new FS.Store.S3("s3files", {
  accessKeyId: "AKIAI5P3IF3ILSL6UQXA", //required if environment variables are not set
  secretAccessKey: "UVi3LngmUsrQDVT3QZqYUyh6sO2xix6YzkfiTkCX", //required if environment variables are not set
  bucket: "ietu-resources"
});
YourFileCollection = new FS.Collection("yourFileCollection", {
  stores: [fileStore]
});

fileDetails=new Mongo.Collection('files');
Resources = new Mongo.Collection('resources');
Activities = new Mongo.Collection('activities');
Curricula = new Mongo.Collection('curricula');
