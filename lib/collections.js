var fileStore = new FS.Store.S3("s3files", {
  accessKeyId: "AKIAIM666WHVC6WF3WMQ", //required if environment variables are not set
  secretAccessKey: "wLkbimcgsXCMjmkpIIP1wH8etrsy3QaAbIfk6sMp", //required if environment variables are not set
  bucket: "benji-ee"
});
YourFileCollection = new FS.Collection("yourFileCollection", {
  stores: [fileStore]
});
fileDetails=new Mongo.Collection('files');
