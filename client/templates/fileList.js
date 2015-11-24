Meteor.subscribe("fileUploads");
  Meteor.subscribe("fileMeta");
  fileIndex = new EasySearch.Index({
    collection: fileDetails,
     fields: ['keywords','name'],
     engine: new EasySearch.MongoDB()
   });

Tracker.autorun(function () {
  let cursor = fileDetails.search('Colorbar.jpg');

  console.log(cursor.fetch()); // log found documents with default search limit
  console.log(cursor.count()); // log count of all found documents
});

  Template.fileList.helpers({
    inputAttributes: function () {
      return { 'class': 'easy-search-input', 'placeholder': 'Start searching...' };
    },
files: function () {
      return fileList.find({}, { sort: { keywords: -1, name: 1 } });
    },
    theFiles: function () {
      var searchField=Session.get('searchField');//search field data from the session
      var fileDetailsFiltered=[];
      if(searchField!=undefined && searchField!="")//if there is text in the search filter
      {
        var searchFieldArray=searchField.split(',');//separate into array
      fileDetailsFiltered=_.pluck(fileDetails.find({$or : [{keywords:{ $in: searchFieldArray}},{ name: new RegExp(searchField, "i")}]}).fetch(),'fileId');//filter fileDetails fileIds where keywords include the text
      return YourFileCollection.find({"_id": {$in: fileDetailsFiltered}});//return filtered objects
    }
    else
    {return YourFileCollection.find();//return all objects
}
    //looks at title of the doc:
      //return YourFileCollection.find({"original.name":new RegExp(searchField, "i")});
    },
    index: function () {
      return fileIndex;
    },
    resultsCount: function () {
      return fileIndex.getComponentDict().get('count');
    },
    showMore: function () {
      return false;
    },
    renderTmpl: () => Template.renderTemplate
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
