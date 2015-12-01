

Template.fileList.events({
    'click #deleteFileButton ': function (event) {
      var fsId= this._id;
      var fileDetailsId=fileDetails.findOne({fileId:fsId})._id;
      YourFileCollection.remove({_id: this._id});
      fileDetails.remove({_id:fileDetailsId});
      Session.set('fileSearch',fileSearch.getData());
    },
    'click #editKeywordButton ': function (event) {
      console.log(this);
      var fsId= this._id;
      var fileDetailsID=fileDetails.findOne({fileId:fsId})._id;
      var fileDetailsKeywords=fileDetails.findOne({fileId:fsId}).keywords;
      //console.log(fileDetailsKeywords)
      var keywords=fileDetailsKeywords.join()
      document.getElementById("keywords").value = keywords;
      Session.set('fileDetailsID',fileDetailsID);
      Session.set('fileSearch',fileSearch.getData());
    },
    'click #editDescriptionButton ': function (event) {
      var fsId= this._id;
      var fileDetailsID=fileDetails.findOne({fileId:fsId})._id;
      var fileDetailsDescription=fileDetails.findOne({fileId:fsId}).description;
      //console.log(fileDetailsKeywords)
      var description=fileDetailsDescription
      document.getElementById("description").value = description;
      Session.set('fileDetailsID',fileDetailsID);
      Session.set('fileSearch',fileSearch.getData());
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
            fileDetails.insert({name:yourFile.original.name,fileId:fileObj._id,keywords:[],type:yourFile.original.type,description:null});
            Session.set('fileSearch',fileSearch.getData());
            //Session.set('fileSearchVar',fileSearch.find().fetch())
            //console.log(fileDetails.find());
          }
          else {
            console.log("there was an error", err);
          }
        });
        //
      });
    },
     'submit .keyword-form': function(event,template){
        event.preventDefault();
        var keywordsVar=event.target.keywords.value;
        var array=keywordsVar.split(',');
        var fileDetailsID=Session.get('fileDetailsID');
        fileDetails.update(fileDetailsID,{$set: {"keywords":array}});
    }
    ,
     'submit .description-form': function(event,template){
        event.preventDefault();
        var descriptionVar=event.target.description.value;
        var fileDetailsID=Session.get('fileDetailsID');
        fileDetails.update(fileDetailsID,{$set: {"description":descriptionVar}});
    }
    // ,
    // 'submit .search-form': function(event,template){
    //     event.preventDefault();
    //     var searchField=event.target.searchName.value;
    //     Session.set('searchField',searchField);
    // }
  });

