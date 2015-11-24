
YourFileCollection = new FS.Collection("yourFileCollection", {
  stores: [new FS.Store.FileSystem("yourFileCollection", {path: "~/meteor_uploads"})]
});
fileDetails=new Mongo.Collection('files');

fileIndex = new EasySearch.Index({
  collection: fileDetails,
   fields: ['keywords','name'],
   engine: new EasySearch.MongoDB()
 });
