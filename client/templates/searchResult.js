Meteor.subscribe("fileUploads");
  Meteor.subscribe("fileMeta");
var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['description'];
fileSearch = new SearchSource('filesToSearch', fields, options);
//initialise the search
fileSearch.search("");
Template.searchResult.helpers({
  testLink: function() {
    //look in YourFile collection
    var details = YourFileCollection.findOne(this.fileId)
    //console.log(details.original)
    return {
      URL: details.url,
      name: details.original.name,
      type: details.original.type,
      isUploaded: details.original.updatedAt,
      details:details,
      keywords: this.keywords,
      description:this.description,
      _id:details._id
    };

  },
  getFiles: function() {
    //console.log('here');
    //wait until fileSearch is initiated
    //console.log(fileSearch.getData());
    var theFiles
    var theFilesReturned
Tracker.autorun(function () {
  theFiles=(Session.get('filesToReturn'));
  theFilesReturned=fileSearch.getData({
      transform: function(matchText, regExp) {
        console.log(matchText);
        console.log(regExp);
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {name: -1}
    });
});
    // FIX THIS TO MAKE TEXT BOLD
    return fileSearch.getData({
      transform: function(matchText, regExp) {
        console.log(matchText);
        console.log(regExp);
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {name: -1}
    });
//ADD FUZZY LOGIC HERE!
//return Session.get('fileSearch');
//console.log(Session.get('fileSearch'));
// console.log('here');
// Session.set('fileSearch',fileSearch.getData());
// console.log('session data:');
// console.log(Session.get('fileSearch'));
// console.log(Session.get('filesToReturn'))
    // return fileSearch.getData();
  },

  isLoading: function() {
    return fileSearch.getStatus().loading;
  }
})

