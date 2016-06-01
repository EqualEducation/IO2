var searchString;
var searchOptions;
var searchSelector;
var activitiesCursor;
var resourcesCursor;
var curriculaCursor;
var tab;
var activityStub;
var resourceStub;
var curriculumStub;
var activityTotalStub;
var resourceTotalStub;
var curriculumTotalStub;
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
  if (activityStub)
           activityStub.stop();
  activityStub = Meteor.subscribe("activities-searchpage-data", searchString, pageSize, pageNumber, function(){
    callback(_activitiesData());
  });
}

let _searchResources = (type, callback) => {
  if (resourceStub)
           resourceStub.stop();
  resourceStub =  Meteor.subscribe("resources-searchpage-data", searchString, pageSize, pageNumber, function() {
    callback(_resourcesData(type));
  })
}

let _searchCurricula = (callback) => {
  if (curriculumStub)
           curriculumStub.stop();
  curriculumStub = Meteor.subscribe("curricula-searchpage-data", searchString, pageSize, pageNumber, function() {
    callback(_curriculaData());
  })
}

let _searchTotalActivities = (callback) => {
  if (activityStub)
           activityStub.stop();
  activityStub = Meteor.subscribe("activities-searchpage-count", searchString, function(){
    callback(_activitiesData().count());
  });
}

let _searchTotalResources = (type, callback) => {
  if (resourceStub)
           resourceStub.stop();
  resourceStub =  Meteor.subscribe("resources-searchpage-count", searchString, function() {
    callback(_resourcesData(type).count());
  })
}

let _searchTotalCurricula = (callback) => {
  if (curriculumStub)
           curriculumStub.stop();
  curriculumStub = Meteor.subscribe("curricula-searchpage-count", searchString, function() {
    callback(_curriculaData().count());
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
      _searchActivities(function(activities) {
       _searchResources(null, function(resources) {
         _searchCurricula(function(curricula) {
              searchResults = _.union(activities.fetch(), resources.fetch(), curricula.fetch())
              searchResults = _.sortBy(searchResults, 'score').reverse()

              _searchTotalActivities(function(activitiesCount) {
               _searchTotalResources(null, function(resourcesCount) {
                 _searchTotalCurricula(function(curriculaCount) {
                     resultsCount = activitiesCount + resourcesCount + curriculaCount;
                     var results = {searchResults: searchResults, total: resultsCount};
                      callback(err, results)
                    })
                  })
                })
            })
          })
        })
        break;
      case 'activities':
        _searchActivities(function(activities) {
          _searchTotalActivities(function(activitiesCount) {
            searchResults = activities.fetch()
            resultsCount = activitiesCount;
            var results = {searchResults: searchResults, total: resultsCount};
            callback(err, results)
          })
        })
        break;
      case 'resources':
          _searchResources(null, function(resources) {
            _searchTotalResources(null, function(resourcesCount) {
              searchResults = resources.fetch()
              resultsCount = resourcesCount;
              var results = {searchResults: searchResults, total: resultsCount};
              callback(err, results)
            })
          })
          break;
      case 'allResources':
          _searchResources(null, function(resources) {
            _searchTotalResources(null, function(resourcesCount) {
              searchResults = resources.fetch()
              resultsCount = resourcesCount;
              var results = {searchResults: searchResults, total: resultsCount};
              callback(err, results)
            })
          })
          break;
      case 'curricula':
          _searchCurricula(function(curricula) {
            _searchTotalCurricula(function(curriculaCount) {
              searchResults = curricula.fetch()
              resultsCount = curriculaCount;
              var results = {searchResults: searchResults, total: resultsCount};
              callback(err, results)
            })
          })
          break;
      case 'book':
          _searchResources(tab,function(resources) {
            _searchTotalResources(tab,function(resourcesCount) {
              searchResults = resources.fetch()
              resultsCount = resourcesCount;
              var results = {searchResults: searchResults, total: resultsCount};
              callback(err, results)
            })
          })
          break;
      case 'video':
          _searchResources(tab,function(resources) {
            _searchTotalResources(tab,function(resourcesCount) {
              searchResults = resources.fetch()
              resultsCount = resourcesCount;
              var results = {searchResults: searchResults, total: resultsCount};
              callback(err, results)
            })
          })
          break;
      case 'shortreading':
          _searchResources(tab,function(resources) {
            _searchTotalResources(tab,function(resourcesCount) {
              searchResults = resources.fetch()
              resultsCount = resourcesCount;
              var results = {searchResults: searchResults, total: resultsCount};
              callback(err, results)
            })
          })
          break;
      case 'icebreaker':
        _searchResources(tab,function(resources) {
          _searchTotalResources(tab,function(resourcesCount) {
            searchResults = resources.fetch()
            resultsCount = resourcesCount;
            var results = {searchResults: searchResults, total: resultsCount};
            callback(err, results)
          })
        })
        break;
      case 'other':
        _searchResources(tab,function(resources) {
          _searchTotalResources(tab,function(resourcesCount) {
            searchResults = resources.fetch()
            resultsCount = resourcesCount;
            var results = {searchResults: searchResults, total: resultsCount};
            callback(err, results)
          })
        })
        break;
      default:
      _searchActivities(function(activities) {
       _searchResources(null, function(resources) {
         _searchCurricula(function(curricula) {
              searchResults = _.union(activities.fetch(), resources.fetch(), curricula.fetch())
              searchResults = _.sortBy(searchResults, 'score').reverse()

              _searchTotalActivities(function(activitiesCount) {
               _searchTotalResources(null, function(resourcesCount) {
                 _searchTotalCurricula(function(curriculaCount) {
                     resultsCount = activitiesCount + resourcesCount + curriculaCount;
                     var results = {searchResults: searchResults, total: resultsCount};
                      callback(err, results)
                    })
                  })
                })
            })
          })
        })
          break;
    }
  return;
};

Modules.both.searchItems = search;
