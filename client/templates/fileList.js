  Meteor.subscribe("fileUploads");
  Template.fileList.helpers({
    theFiles: function () {
      var docName=Session.get('docName');
      console.log(docName);
      //console.log(docName);
      //console.log(YourFileCollection.find({name:'Activist Wordsearch.docx'}).original.name);
      //console.log(YourFileCollection.find({name: 'Activism 101.docx'}).fetch())
      return YourFileCollection.find({"original.name":new RegExp(docName)});
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
        Session.set('docName',docNameVar);
        //PlayersList.insert({name: playerNameVar,score:playerScoreVar});
        //template.find("form").reset();
    }
  });