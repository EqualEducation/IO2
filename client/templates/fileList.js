  Meteor.subscribe("fileUploads");
  Meteor.subscribe("fileMeta");
  Template.fileList.helpers({
    theFiles: function () {
      var docName=Session.get('docName');
      //console.log(YourFileCollection.findOne());
      //console.log(docName);
      //console.log(YourFileCollection.find({name:'Activist Wordsearch.docx'}).original.name);
      //console.log(YourFileCollection.find({name: 'Activism 101.docx'}).fetch())
     // console.log(fileDetails.findOne());
      return YourFileCollection.find({"original.name":new RegExp(docName)});
    }
  });
    Template.fileList.events({
    'click #deleteFileButton ': function (event) {
      var fsId= this._id;
      var fileDetailsId=fileDetails.findOne({fileId:fsId})._id;
      YourFileCollection.remove({_id: this._id});
      fileDetails.remove({_id:fileDetailsId});
    },
    'change .your-upload-class': function (event, template) {
      console.log("uploading...")
      FS.Utility.eachFile(event, function (file) {
        console.log("each file...");
        var yourFile = new FS.File(file);
        console.log('yourfile')
        console.log(yourFile)
        YourFileCollection.insert(yourFile, function (err, fileObj) {
          console.log("callback for the insert, err: ", err);
          if (!err) {
            console.log("inserted without error",fileObj)
            fileDetails.insert({name:yourFile.original.name,fileId:fileObj._id});
            console.log(fileDetails.find());
          }
          else {
            console.log("there was an error", err);
          }
        });
        //
      });
    },
     'submit form': function(event,template){
        event.preventDefault();
        var docNameVar;
        docNameVar=event.target.docName.value;
        Session.set('docName',docNameVar);
        //PlayersList.insert({name: playerNameVar,score:playerScoreVar});
        //template.find("form").reset();
    }
  });