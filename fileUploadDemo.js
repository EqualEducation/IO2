//For another way to do the same thing, see my other demo: https://github.com/wesyah234/fileUploadDemo2 which uses https://github.com/tomitrescak/meteor-uploads
YourFileCollection = new FS.Collection("yourFileCollection", {
  stores: [new FS.Store.FileSystem("yourFileCollection", {path: "~/meteor_uploads"})]
});
YourFileCollection.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
  download: function (userId, doc) {
    return true;
  }
});

if (Meteor.isClient) {
  Meteor.subscribe("fileUploads");
  Template.fileList.helpers({
    theFiles: function () {
      return YourFileCollection.find();
    }
  });

  Template.fileList.events({
    'click #deleteFileButton ': function (event) {
      console.log("deleteFile button ", this);
      YourFileCollection.remove({_id: this._id});
    },
    'change .your-upload-class': function (event, template) {
      console.log("uploading...")
      FS.Utility.eachFile(event, function (file) {
        console.log("each file...");
        var yourFile = new FS.File(file);
        YourFileCollection.insert(yourFile, function (err, fileObj) {
          console.log("callback for the insert, err: ", err);
          if (!err) {
            console.log("inserted without error");
          }
          else {
            console.log("there was an error", err);
          }
        });
      });
    },
     'submit form': function(event,template){
        event.preventDefault();
        var docNameVar;
        docNameVar=event.target.docName.value;
        //PlayersList.insert({name: playerNameVar,score:playerScoreVar});
        template.find("form").reset();
    }
  });
  Template.dropzone.events({
  'dropped #dropzone': function(e) {
    console.log('dropped a file');
    FS.Utility.eachFile(event, function (file) {
    var yourFile = new FS.File(file);
            YourFileCollection.insert(yourFile, function (err, fileObj) {
          console.log("callback for the insert, err: ", err);
          if (!err) {
            console.log("inserted without error");
          }
          else {
            console.log("there was an error", err);
          }
        });

  });
  }
});
}

if (Meteor.isServer) {
  Meteor.publish("fileUploads", function () {
    console.log("publishing fileUploads");
    return YourFileCollection.find();
  });
}
