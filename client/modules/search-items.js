var searchString;
var searchOptions;
var searchSelector;
var activitiesCursor;
var resourcesCursor;
var curriculaCursor;
var tab;

// let _performSearch = () => {
//
//   var allExactSearchResults = [];
//   allExactSearchResults = _.union(activitiesCursor.fetch(), resourcesCursor.fetch(), curriculaCursor.fetch())
//   return allExactSearchResults;
//
// }

// let _searchResults = () => {
//   var data =  {
//     "all" : _performSearch('all'),
    // "activities" : _performSearch('activities'),
    // "curricula" : _performSearch('curricula'),
    // "resources" : _performSearch('resources'),
    // "allResources" : _performSearch('allResources'),
    // "book" : _performSearch('book'),
    // "video" : _performSearch('video'),
    // "shortreading" : _performSearch('shortreading'),
    // "icebreaker" : _performSearch('icebreaker'),
    // "other" : _performSearch('other')
//   }
//
//   return data;
// };

let _buildRegExp = (searchText) => {
  var parts=[""];
  if (searchText===undefined)
  {}
  else
  {
    parts = searchText.trim().split(/[ \-]+/);
  }
  //define regExp with flags (case insensitive + global search)
  return new RegExp("(" + parts.join('|') + ")", "ig");
}

let _searchActivities = () => {
  Meteor.subscribe("activities-searchpage-data", Session.get("searchText"));
  if (searchString != undefined && searchString != "") {
    data = Activities.find({}, { sort: [["score", "desc"]] });
  } else {
    data = Activities.find({});
  }
  return data;
}

let _searchResources = (type) => {
  Meteor.subscribe("resources-searchpage-data", Session.get("searchText"));
  if (searchString != undefined && searchString != "") {
    if (type != undefined && type != "") {
      data = Resources.find({'type' : type}, { sort: [["score", "desc"]] });
    } else {
      data = Resources.find({}, { sort: [["score", "desc"]] });
    }
  } else {
    if (type != undefined && type != "") {
      data = Resources.find({'type' : type});
    } else {
      data = Resources.find({});
    }
  }
  return data;
}

let _searchCurricula = () => {
  Meteor.subscribe("curricula-searchpage-data", Session.get("searchText"));
  if (searchString != undefined && searchString != "") {
    data = Curricula.find({}, { sort: [["score", "desc"]] });
  } else {
    data = Curricula.find({});
  }
  return data;
}
let search = ( options ) => {

    searchString = options.searchString;
    tab = options.tab;
    var searchResults;

    switch (tab) {
      case 'all':
        searchResults = _.union(_searchActivities().fetch(),_searchResources().fetch(), _searchCurricula().fetch())
        searchResults = _.sortBy(searchResults, 'score').reverse()
        break;
      case 'activities':
        searchResults = _searchActivities().fetch()
        break;
      case 'resources':
          searchResults = _searchResources().fetch()
          break;
      case 'allResources':
          searchResults = _searchResources().fetch()
          break;
      case 'curricula':
          searchResults = _searchCurricula().fetch()
          break;
      case 'book':
          searchResults = _searchResources('book').fetch()
          break;
      case 'video':
          searchResults = _searchResources('video').fetch()
          break;
      case 'shortreading':
          searchResults = _searchResources('shortreading').fetch()
          break;
      case 'icebreaker':
          searchResults = _searchResources('icebreaker').fetch()
          break;
      case 'other':
          searchResults = _searchResources('other').fetch()
          break;
      default:
        searchResults = _.union(_searchActivities().fetch(),_searchResources().fetch(), _searchCurricula().fetch())
        searchResults = _.sortBy(searchResults, 'score').reverse()
    }

  return searchResults;
};

Modules.client.searchItems = search;
