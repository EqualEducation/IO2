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
Template.searchResult.helpers({
  testLink: function() {
    //look in YourFile collection
    var details = YourFileCollection.findOne(this.fileId)

    return details;
  },
  getFiles: function() {
    //wait until fileSearch is initiated
    console.log(fileSearch.getData());
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

