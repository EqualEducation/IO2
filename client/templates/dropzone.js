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