  Template.dropzone.events({
  'dropped #dropzone': function(e) {
    console.log('dropped a file');
      FS.Utility.eachFile(event, function (file) {
        console.log("each file...");
        var yourFile = new FS.File(file);
        console.log('yourfile')
        console.log(yourFile)
        YourFileCollection.insert(yourFile, function (err, fileObj) {
          console.log("callback for the insert, err: ", err);
          if (!err) {
            console.log("inserted without error",fileObj)
            var name = yourFile.original.name;
            var index=name.indexOf(".");
            var nameTrunc=name.substring(0,index);
            //console.log(nameTrunc)
            fileDetails.insert({name:nameTrunc,fileId:fileObj._id,keywords:[],type:yourFile.original.type,description:null});
            fileSearch.cleanHistory();
            fileSearch.search("");
            Session.set('filesToReturn',fileSearch.getData());
            console.log("REFRESH");
          }
          else {
            console.log("there was an error", err);
          }
        });
        //
      });
  }
});
