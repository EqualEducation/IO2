var searchString;
var searchOptions;
var searchSelector;
var activitiesCursor;
var resourcesCursor;
var curriculaCursor;

let _performSearch = () => {

  var allExactSearchResults = [];
  allExactSearchResults = _.union(activitiesCursor.fetch(), resourcesCursor.fetch(), curriculaCursor.fetch())
  return allExactSearchResults;

}

let _searchResults = () => {
  var data =  {
    "all" : _performSearch('all'),
    "activities" : _performSearch('activities'),
    "curricula" : _performSearch('curricula'),
    "resources" : _performSearch('resources'),
    "allResources" : _performSearch('allResources'),
    "book" : _performSearch('book'),
    "video" : _performSearch('video'),
    "shortreading" : _performSearch('shortreading'),
    "icebreaker" : _performSearch('icebreaker'),
    "other" : _performSearch('other')
  }

  return data;
};

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

let search = ( options ) => {
  // searchString = _buildRegExp(options.searchString);

  console.log(searchString)
  searchOptions = {sort: {score:{$meta:"textScore"}}, limit: 20};
  searchSelector = {$text: {$search: "animal"}}, {score: {$meta: "textScore"}}
  // searchOptions = {sort: {"details.title": 1}, limit: 20};
  // searchSelector = {$or: [
  //   {"details.title": searchString},
  //   {"details.description": searchString},
  //   {"details.keywords": searchString}
  // ]};

  activitiesCursor = Activities.find(searchSelector, searchOptions);
  resourcesCursor = Resources.find(searchSelector, searchOptions);
  curriculaCursor = Curricula.find(searchSelector, searchOptions);


  // let file = _getFileFromInput( options.event );

  return _searchResults();
};

Modules.client.searchItems = search;
