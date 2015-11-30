Meteor.subscribe("fileUploads");
  Meteor.subscribe("fileMeta");
var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['keywords', 'name'];
fileSearch = new SearchSource('filesToSearch', fields, options);
//initialise the search
fileSearch.search("");
// Tracker.autorun(function () {
//   fileSearch.getData();
// });
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
    // FIX THIS TO MAKE TEXT BOLD
    // return fileSearch.getData({
    //   transform: function(matchText, regExp) {
    //     return matchText.replace(regExp, "<b>$&</b>")
    //   },
    //   sort: {isoScore: -1}
    // });
//ADD FUZZY LOGIC HERE!
    return fileSearch.getData();
  },

  isLoading: function() {
    return fileSearch.getStatus().loading;
  }
})

