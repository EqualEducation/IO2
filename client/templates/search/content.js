
// var options = {
//   keepHistory: 1000 * 60 * 5,
//   localSearch: true
// };
// var fields = ['description'];
// fileSearch = new SearchSource('filesToSearch', fields, options);
// // initialise the search
// fileSearch.search("");

Template.content.helpers({
  isLoading: function() {
    return Session.get('isLoading')
  },
  itemTitle: function(item) {
    itemType = item.itemType;
    var title;
    if (itemType === ItemTypeEnum.Resource) {
        title = itemType + ' (' + _resourceDisplayName(item.type) + '): ' + item.details.title
    } else {
      title = itemType + ': ' + item.details.title
    }
    return title;
  },
  itemTypeIsResource: function(itemType) {
    //look in YourFile collection
    if(itemType=="Resource")
      return true;
    else
      return false;

  },
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


//download
//Files.findOne("vT9HZ5qc5k3iQ5T8M").url()
