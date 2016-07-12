var searchString;
var searchOptions;
var searchSelector;
var activitiesCursor;
var resourcesCursor;
var curriculaCursor;
var tab;
var activityStub;
var activityCountStub;
var resourceStub;
var curriculumStub;
var pageSize;
var pageNumber;

let _activitiesData = () => {
  if (searchString != undefined && searchString != "") {
    data = Activities.find({}, { sort: [["score", "desc"]] });
  } else {
    data = Activities.find({});
  }
  return data;
}


let _resourcesData = (type) => {
  if (searchString != undefined && searchString != "") {
    if (type != undefined && type != "" && type != null) {
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
  console.log(data);
  return data;
}

let _curriculaData = () => {
  if (searchString != undefined && searchString != "") {
    data = Curricula.find({}, { sort: [["score", "desc"]] });
  } else {
    data = Curricula.find({});
  }
  return data;
}

let _searchActivities = (callback) => {
  if (activityStub) {
    activityStub.stop();
  }
  console.log("pageSize: " + pageSize +", pageNumber: " + pageNumber);
  activityStub = Meteor.subscribe("activities-searchpage-data", searchString, pageSize, pageNumber, function(){
    var count = Counts.get("activities-searchpage-count");
    callback(_activitiesData(), count);
  });
};

let _searchResources = (type, callback) => {
  if (resourceStub)
           resourceStub.stop();
  resourceStub =  Meteor.subscribe("resources-searchpage-data", searchString, pageSize, pageNumber, type, function() {
    var count = Counts.get("resources-searchpage-count");
    callback(_resourcesData(type), count);
  })
}

let _searchCurricula = (callback) => {
  if (curriculumStub)
           curriculumStub.stop();
  curriculumStub = Meteor.subscribe("curricula-searchpage-data", searchString, pageSize, pageNumber, function() {
    var count = Counts.get("curricula-searchpage-count");
    callback(_curriculaData(), count);
  })
}


let search = ( options, callback ) => {
    searchString = options.searchString;
    tab = options.tab;
    pageNumber = options.pageNumber;
    pageSize = options.pageSize;

    console.log(options);
    var searchResults;
    var err;

    switch (tab) {
      case 'all':
      _searchActivities(function(activities, activitiesCount) {
       _searchResources(null, function(resources, resourcesCount) {
         _searchCurricula(function(curricula, curriculaCount) {
              searchResults = _.union(activities.fetch(), resources.fetch(), curricula.fetch());
              searchResults = _.sortBy(searchResults, 'score').reverse();
              resultsCount = activitiesCount + resourcesCount + curriculaCount;
              var results = {searchResults: searchResults.slice(0,parseInt(pageSize)), total: resultsCount};
              callback(err, results)
            })
          })
        })
        break;
      case 'activities':
        _searchActivities(function(activities, activitiesCount) {
            searchResults = activities.fetch()
            var results = {searchResults: searchResults, total: activitiesCount};
            callback(err, results)
        })
        break;
      case 'resources':
          _searchResources(null, function(resources, resourcesCount) {
              searchResults = resources.fetch()
              resultsCount = resourcesCount;
              var results = {searchResults: searchResults, total: resultsCount};
              callback(err, results)
          })
          break;
      case 'allResources':
          _searchResources(null, function(resources, resourcesCount) {
              searchResults = resources.fetch()
              resultsCount = resourcesCount;
              var results = {searchResults: searchResults, total: resultsCount};
              callback(err, results)
          })
          break;
      case 'curricula':
          _searchCurricula(function(curricula, curriculaCount) {
              searchResults = curricula.fetch()
              resultsCount = curriculaCount;
              var results = {searchResults: searchResults, total: resultsCount};
              callback(err, results)
          })
          break;
      case 'book':
          _searchResources(tab,function(resources, resourcesCount) {
              searchResults = resources.fetch()
              resultsCount = resourcesCount;
              var results = {searchResults: searchResults, total: resultsCount};
              callback(err, results)
          })
          break;
      case 'video':
          _searchResources(tab,function(resources, resourcesCount) {
              searchResults = resources.fetch()
              resultsCount = resourcesCount;
              var results = {searchResults: searchResults, total: resultsCount};
              callback(err, results)
          })
          break;
      case 'shortreading':
          _searchResources(tab,function(resources, resourcesCount) {
              searchResults = resources.fetch()
              resultsCount = resourcesCount;
              var results = {searchResults: searchResults, total: resultsCount};
              callback(err, results)
          })
          break;
      case 'icebreaker':
        _searchResources(tab,function(resources, resourcesCount) {
            searchResults = resources.fetch()
            resultsCount = resourcesCount;
            var results = {searchResults: searchResults, total: resultsCount};
            callback(err, results)
        })
        break;
      case 'other':
        _searchResources(tab,function(resources, resourcesCount) {
            searchResults = resources.fetch()
            resultsCount = resourcesCount;
            var results = {searchResults: searchResults, total: resultsCount};
            callback(err, results)
        })
        break;
      default:
      _searchActivities(function(activities, activitiesCount) {
       _searchResources(null, function(resources, resourcesCount) {
         _searchCurricula(function(curricula, curriculaCount) {
              searchResults = _.union(activities.fetch(), resources.fetch(), curricula.fetch())
              searchResults = _.sortBy(searchResults, 'score').reverse()
              resultsCount =  activitiesCount + resourcesCount + curriculaCount;
              var results = {searchResults: searchResults, total: resultsCount};
              callback(err, results)
            })
          })
        })
          break;
    }
  return;
};

Modules.both.searchItems = search;
