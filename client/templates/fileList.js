  Meteor.subscribe("fileUploads");
  Meteor.subscribe("fileMeta");
  Template.fileList.helpers({
    theFiles: function () {
      var searchField=Session.get('searchField');//search field data from the session
      var fileDetailsFiltered=[];
      if(searchField!=undefined && searchField!="")//if there is text in the search filter
      {
        var searchFieldArray=searchField.split(',');//separate into array
      fileDetailsFiltered=_.pluck(fileDetails.find({ keywords: { $in: searchFieldArray} }).fetch(),'fileId');//filter fileDetails fileIds where keywords include the text
      return YourFileCollection.find({"_id": {$in: fileDetailsFiltered}});//return filtered objects
    }
    else
    {return YourFileCollection.find();//return all objects
}
    //looks at title of the doc:
      //return YourFileCollection.find({"original.name":new RegExp(searchField, "i")});
    }
  });
    Template.fileList.events({
    'click #deleteFileButton ': function (event) {
      var fsId= this._id;
      var fileDetailsId=fileDetails.findOne({fileId:fsId})._id;
      YourFileCollection.remove({_id: this._id});
      fileDetails.remove({_id:fileDetailsId});
    },
    'click #editKeywordButton ': function (event) {
      var fsId= this._id;
      var fileDetailsID=fileDetails.findOne({fileId:fsId})._id;
      var fileDetailsKeywords=fileDetails.findOne({fileId:fsId}).keywords;
      //console.log(fileDetailsKeywords)
      var keywords=fileDetailsKeywords.join()
      document.getElementById("keywords").value = keywords;
      Session.set('fileDetailsID',fileDetailsID);
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
            fileDetails.insert({name:yourFile.original.name,fileId:fileObj._id,keywords:[]});
            console.log(fileDetails.find());
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
    'submit .search-form': function(event,template){
        event.preventDefault();
        var searchField=event.target.searchName.value;
        Session.set('searchField',searchField);
    }
  });