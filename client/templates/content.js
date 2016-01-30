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
Template.content.helpers({
    testLink: function() {
    //look in YourFile collection
    var details = YourFileCollection.findOne(this.fileId);
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
    return fileSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")//makes text bold
      },
      sort: {name: 1}
    })
  },

  isLoading: function() {
    return fileSearch.getStatus().loading;
  }
})
