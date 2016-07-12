Template.searchResults.onRendered(function() {
  console.log("SEARHC RESULTS");
});

Template.searchResults.helpers({
  pageSizeIsEqualTo: function(dropDownPageSize) {
    var selectedPageSize = Session.get('selectedPageSize');
    if (selectedPageSize === undefined) {
      Session.set('selectedPageSize', 10);
      selectedPageSize = Session.get('selectedPageSize');
    }
    if (dropDownPageSize == selectedPageSize) {
      return "selected";
    }
  },
  pageNumberIsEqualTo: function(pageNumber) {
    var selectedPageNumber = Session.get('selectedPageNumber');
    if (selectedPageNumber === undefined) {
      Session.set('selectedPageNumber', 1);
      selectedPageNumber = Session.get('selectedPageNumber');
    }
    if (pageNumber == selectedPageNumber) {
      return "active";
    }
  },
  data: function() {
    console.log('data');
    return Session.get('tabData');
  },
  isLoading: function() {
    return Session.get('isLoading');
  },
  itemTitle: function(item) {
    itemType = item.itemType;
    var title;
    if (itemType === ItemTypeEnum.Resource) {
        title = itemType + ' (' + _resourceDisplayName(item.type) + '): ' + item.details.title;
    } else {
      title = itemType + ': ' + item.details.title;
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
  pageArray: function(numPages){
    var pageArray = [];
    for (var i = 1; i <= numPages; i++) {
      pageArray[i] = i;
    }
    return pageArray;
  }
});

Template.searchResults.events({
  'change .pageSize' : function(event, template) {
    event.preventDefault();
    var value = event.target.selectedOptions[0].value;
    Session.set('selectedPageSize', value);
    return false;
  },
  'click .pageNumber' : function(event, template) {
    event.preventDefault();
    console.log('did tap page number');
    var value = parseInt(this)
    Session.set('selectedPageNumber', value);
    return false;
  }
});
