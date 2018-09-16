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
  var size = pageSize;
  var pageNum =  pageNumber;
  if (tab == "all") {
    size = null;
    pageNum =  null;
  }
  activityStub = Meteor.subscribe("activities-searchpage-data", searchString, size, pageNum, function(){
    var count = Counts.get("activities-searchpage-count");
    callback(_activitiesData(), count);
  });
};

let _searchResources = (type, callback) => {
  if (resourceStub) {
    resourceStub.stop();
  }

   var size = pageSize;
   var pageNum =  pageNumber;
   if (tab == "all") {
     size = null;
     pageNum =  null;
   }
  resourceStub =  Meteor.subscribe("resources-searchpage-data", searchString, size, pageNum, type, function() {
    var count = Counts.get("resources-searchpage-count");
    callback(_resourcesData(type), count);
  })
}

let _searchCurricula = (callback) => {
  if (curriculumStub) {
    curriculumStub.stop();
  }

   var size = pageSize;
   var pageNum =  pageNumber;
   if (tab == "all") {
     size = null;
     pageNum =  null;
   }

  curriculumStub = Meteor.subscribe("curricula-searchpage-data", searchString, pageSize, pageNumber, function() {
    var count = Counts.get("curricula-searchpage-count");
    callback(_curriculaData(), count);
  })
}

function stopStubs() {
  //need to cancel all stubs otherwise will use subscriptions when viewing an item
  if (resourceStub) {
    resourceStub.stop();
  }

  if (activityStub) {
    activityStub.stop();
  }

  if (curriculumStub) {
    curriculumStub.stop();
  }

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
      //search all activiies, resources, curricula
      _searchActivities(function(activities, activitiesCount) {
       _searchResources(null, function(resources, resourcesCount) {
         _searchCurricula(function(curricula, curriculaCount) {
              //combine the search results
              searchResults = _.union(activities.fetch(), resources.fetch(), curricula.fetch());
              //sort them by score
              searchResults = _.sortBy(searchResults, 'score').reverse();
              //total number of results
              resultsCount = activitiesCount + resourcesCount + curriculaCount;
              //we need to jump to the first visible item based on pageNumber
              //e.g. pageNumber = 2, pageSize = 30, we need to show the 31st item
              // (pageNumber - 1)*(pageSize) + 1
              var firstVisible = (parseInt(pageSize)*(pageNumber-1));

              //the last visible item will be 60
              //(pageNumber) * (pageSize)
              var lastVisible = parseInt(pageSize)*(pageNumber)
              if (lastVisible > resultsCount) {
                lastVisible = resultsCount;
              }
              var results = {searchResults: searchResults.slice(firstVisible, lastVisible), total: resultsCount};
              stopStubs();
              callback(err, results)
            })
          })
        })
        break;
      case 'activities':
        _searchActivities(function(activities, activitiesCount) {
            searchResults = activities.fetch()
            var results = {searchResults: searchResults, total: activitiesCount};
            stopStubs();
            callback(err, results)
        })
        break;
      case 'resources':
          _searchResources(null, function(resources, resourcesCount) {
              searchResults = resources.fetch()
              resultsCount = resourcesCount;
              var results = {searchResults: searchResults, total: resultsCount};
              stopStubs();
              callback(err, results)
          })
          break;
      case 'allResources':
          _searchResources(null, function(resources, resourcesCount) {
              searchResults = resources.fetch()
              resultsCount = resourcesCount;
              var results = {searchResults: searchResults, total: resultsCount};
              stopStubs();
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
              stopStubs();
              callback(err, results)
          })
          break;
      case 'publication':
          _searchResources(tab,function(resources, resourcesCount) {
              searchResults = resources.fetch()
              resultsCount = resourcesCount;
              var results = {searchResults: searchResults, total: resultsCount};
              stopStubs();
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
              stopStubs();
              callback(err, results)
          })
          break;
      case 'icebreaker':
        _searchResources(tab,function(resources, resourcesCount) {
            searchResults = resources.fetch()
            resultsCount = resourcesCount;
            var results = {searchResults: searchResults, total: resultsCount};
            stopStubs();
            callback(err, results)
        })
        break;
      case 'other':
        _searchResources(tab,function(resources, resourcesCount) {
            searchResults = resources.fetch()
            resultsCount = resourcesCount;
            var results = {searchResults: searchResults, total: resultsCount};
            stopStubs();
            callback(err, results)
        })
        break;
      default:
      _searchActivities(function(activities, activitiesCount) {
       _searchResources(null, function(resources, resourcesCount) {
         _searchCurricula(function(curricula, curriculaCount) {
              searchResults = _.union(activities.fetch(), resources.fetch(), curricula.fetch());
              searchResults = _.sortBy(searchResults, 'score').reverse();
              resultsCount = activitiesCount + resourcesCount + curriculaCount;
              var firstVisible = parseInt(pageSize)*(pageNumber-1) + 1;
              var lastVisible = parseInt(pageSize)*(pageNumber-1) + parseInt(pageSize)
              if (lastVisible > resultsCount) {
                lastVisible = resultsCount;
              }
              var results = {searchResults: searchResults.slice(firstVisible, lastVisible), total: resultsCount};
              stopStubs();
              callback(err, results)
            })
          })
        })
          break;
    }
  return;
};

Modules.both.searchItems = search;
