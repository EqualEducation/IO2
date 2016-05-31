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

let _searchActivities = (callback) => {
  if (activityStub)
           activityStub.stop();
  activityStub = Meteor.subscribe("activities-searchpage-data", searchString, function(){
    if (searchString != undefined && searchString != "") {
      console.log("activities:" + searchString);
      data = Activities.find({}, { sort: [["score", "desc"]] });
    } else {
      console.log("activities without search string");
      data = Activities.find({});
    }
    callback(data);
  });
}

let _searchResources = (type, callback) => {
  if (resourceStub)
           resourceStub.stop();
  resourceStub =  Meteor.subscribe("resources-searchpage-data", searchString, function() {
    if (searchString != undefined && searchString != "") {
      console.log("resources:" + searchString);
      if (type != undefined && type != "" && type != null) {
        console.log("type:" + type);
        data = Resources.find({'type' : type}, { sort: [["score", "desc"]] });
      } else {
        console.log("resources without type");
        data = Resources.find({}, { sort: [["score", "desc"]] });
      }
    } else {
      if (type != undefined && type != "") {
        console.log("resources without string");
        data = Resources.find({'type' : type});
      } else {
        console.log("resources without string or type");
        data = Resources.find({});
      }
    }
    callback(data);
  })
}

let _searchCurricula = (callback) => {
  if (curriculumStub)
           curriculumStub.stop();
  curriculumStub = Meteor.subscribe("curricula-searchpage-data", searchString, function() {
    if (searchString != undefined && searchString != "") {
      console.log("curricula:" + searchString);
      data = Curricula.find({}, { sort: [["score", "desc"]] });
    } else {
      console.log("curricula without string");
      data = Curricula.find({});
    }
    callback(data);
  })
}

let search = ( options, callback ) => {
    searchString = options.searchString;
    tab = options.tab;
    var searchResults;
    var err;

    switch (tab) {
      case 'all':
      _searchActivities(function(activities) {
        console.log("activities:" + activities.count());
       _searchResources(null, function(resources) {
         console.log("resources:" + resources.count());
         _searchCurricula(function(curricula) {
           console.log("curricula:" + curricula.count());

              searchResults = _.union(activities.fetch(), resources.fetch(), curricula.fetch())
              searchResults = _.sortBy(searchResults, 'score').reverse()
              callback(err, searchResults)
            })
          })
        })
        break;
      case 'activities':
        _searchActivities(function(activities) {
          searchResults = activities.fetch()
          callback(err, searchResults)
        })
        break;
      case 'resources':
          _searchResources(null, function(resources) {
            searchResults = resources.fetch()
            callback(err, searchResults)
          })
          break;
      case 'allResources':
          _searchResources(null, function(resources) {
            searchResults = resources.fetch()
            callback(err, searchResults)
          })
          break;
      case 'curricula':
          _searchCurricula(function(curricula) {
            searchResults = curricula.fetch()
            callback(err, searchResults)
          })
          break;
      case 'book':
          _searchResources(tab,function(resources) {
            searchResults = resources.fetch()
            callback(err, searchResults)
          })
          break;
      case 'video':
            _searchResources(tab,function(resources) {
              searchResults = resources.fetch()
              callback(err, searchResults)
            })
          break;
      case 'shortreading':
          _searchResources(tab,function(resources) {
            searchResults = resources.fetch()
            callback(err, searchResults)
          })
          break;
      case 'icebreaker':
        _searchResources(tab,function(resources) {
          searchResults = resources.fetch()
          callback(err, searchResults)
        })
        break;
      case 'other':
        _searchResources(tab,function(resources) {
          searchResults = resources.fetch()
          callback(err, searchResults)
        })
        break;
      default:
        _searchActivities(function(activities) {
         _searchResources(null, function(resources) {
           _searchCurricula(function(curricula) {
                searchResults = _.union(activities.fetch(), resources.fetch(), curricula.fetch())
                searchResults = _.sortBy(searchResults, 'score').reverse()
                callback(err, searchResults)
              })
            })
          })
          break;
    }

    console.log('return')

  return;
};

Modules.both.searchItems = search;
