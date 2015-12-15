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
    // console.log(this);
    //console.log(details.original)
    return {
      URL: details.url,
      name: this.name,
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
    // var theFiles
    // var theFilesReturned
  // Tracker.autorun(function () {
    // theFiles=(Session.get('filesToReturn'));
    // console.log("IN AUTORUN");
    // fileSearch.search("")
    // console.log(fileSearch.getData());
    return fileSearch.getData({
      transform: function(matchText, regExp) {
        //regExpString=regExp.toString();

        return matchText.replace(regExp, "<b>$&</b>")//makes text bold
      },
      sort: {name: 1}
    });
  // }

  },

  isLoading: function() {
    return fileSearch.getStatus().loading;
  }
})
