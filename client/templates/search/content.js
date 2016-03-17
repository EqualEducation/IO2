
// var options = {
//   keepHistory: 1000 * 60 * 5,
//   localSearch: true
// };
// var fields = ['description'];
// fileSearch = new SearchSource('filesToSearch', fields, options);
// // initialise the search
// fileSearch.search("");
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
  // resourceLink: function() {
  //   //look in YourFile collection
  //   //var details = YourFileCollection.findOne(this.fileIDs);
  //   return {
  //     //URL: details.url,
  //     name: this.details.title,
  //     itemType: this.itemType,
  //     keywords: this.details.keywords,
  //     description:this.details.description,
  //     _id:this._id
  //   };
  // },
  pathName: function(itemType) {
    return itemType.toLowerCase() + ".view";
  },
  allResources: function() {
  //look in YourFile collection
  var resources = Resources.find().fetch();
  return resources;

},


  isLoading: function() {
    return fileSearch.getStatus().loading;
  }
})
