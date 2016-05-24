
// var options = {
//   keepHistory: 1000 * 60 * 5,
//   localSearch: true
// };
// var fields = ['description'];
// fileSearch = new SearchSource('filesToSearch', fields, options);
// // initialise the search
// fileSearch.search("");

Template.content.helpers({
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
  transform: function(matchText) {
    var searchText = Session.get('searchText');
    if (searchText == "" || searchText == undefined) {
      return matchText;
    }
    // console.log("SEARCHING: "  + searchText);
      var parts = searchText.trim().split(/[ \-]+/);
      searchText = searchText.replace(/^"(.*)"$/, '$1');
      parts.push(searchText);


      //define regExp with flags (case insensitive + global search)
      var regEx = RegExp("(" + parts.join('|') + ")", "ig");
      // console.log(regEx)
      // var regEx = new RegExp(searchText, "ig");
      return matchText.replace(regEx, "<mark>$&</mark>");

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
