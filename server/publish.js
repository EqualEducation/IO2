searchItems = function(searchValue, pageSize, pageNumber, collection, fields) {
  console.log('search items: ' + searchValue)
  var paging = {};
  if (pageSize != null && pageNumber != null && pageSize != undefined && pageSize != "" && pageNumber != undefined && pageNumber != "") {
    paging = {skip: pageSize*(pageNumber-1), limit: pageSize}
  }
  console.log(paging)

  if (!searchValue ||  searchValue == "") {
    data = collection.find({}, paging);
  } else {
    data = collection.find(
      { $text: {$search: searchValue} },
      {
        // `fields` is where we can add MongoDB projections. Here we're causing
        // each document published to include a property named `score`, which
        // contains the document's search rank, a numerical value, with more
        // relevant documents having a higher score.
        fields: fields,
        // This indicates that we wish the publication to be sorted by the
        // `score` property specified in the projection fields above.
        sort: {
          score: { $meta: "textScore" }
        }
      }, paging
    );
  }

  console.log("COUNT: "  + data.count())

  return data;
}

Meteor.publish("allUsers", function () {
  if (Roles.userIsInRole(this.userId, ['admin'])) {

    return Meteor.users.find({});

  } else {
    // user not authorized. do not publish users
    this.stop();
    return;

  }
});

Meteor.publish( 'files', function(){
  var data = Files.find();

  if ( data ) {
    return data;
  }

  return this.ready();
});

Meteor.publish("resources-searchpage-count", function (searchValue) {
   var fields = {score: { $meta: "textScore" }}
   var data = searchItems(searchValue, null, null, Resources, fields);
   if (data!=undefined && data.count() > 0 ) {
     return data;
   }
   return this.ready();
});


Meteor.publish("activities-searchpage-count", function (searchValue) {
  var fields = {score: { $meta: "textScore" }};
  var data = searchItems(searchValue, null, null, Activities, fields);
  if (data!=undefined && data.count() > 0 ) {
    return data;
  }
  return this.ready();
});

Meteor.publish("curricula-searchpage-count", function (searchValue, pageSize, pageNumber) {
  var fields = {score: { $meta: "textScore" }}
  var data = searchItems(searchValue, null, null, Curricula, fields);
  if (data!=undefined && data.count() > 0 ) {
    return data;
  }
  return this.ready();
});

Meteor.publish("resources-searchpage-data", function (searchValue, pageSize, pageNumber) {
   var fields = {'type':1,'itemType' : 1, 'details.title' : 1, 'details.description' : 1,  'details.keywords' : 1, score: { $meta: "textScore" }}
   var data = searchItems(searchValue, pageSize, pageNumber, Resources, fields);
   if (data!=undefined && data.count() > 0 ) {
     return data;
   }
   return this.ready();
});

Meteor.publish("activities-searchpage-data", function (searchValue, pageSize, pageNumber) {
  var fields = {'itemType' : 1, 'details.title' : 1, 'details.description' : 1,  'details.keywords' : 1, score: { $meta: "textScore" }};
  var data = searchItems(searchValue, pageSize, pageNumber, Activities, fields);
  if (data!=undefined && data.count() > 0 ) {
    return data;
  }
  return this.ready();
});

Meteor.publish("curricula-searchpage-data", function (searchValue, pageSize, pageNumber) {
  var fields = {'itemType' : 1, 'details.title' : 1, 'details.description' : 1,  'details.keywords' : 1, score: { $meta: "textScore" }};
  var data = searchItems(searchValue, pageSize, pageNumber, Curricula, fields);
  if (data!=undefined && data.count() > 0 ) {
    return data;
  }
  return this.ready();
});


Meteor.publish("activities-explore-data", function () {
      console.log("publishing activities-explore-data");

     return Activities.find({},{fields: {'itemType' : 1, 'details.title' : 1, 'details.description' : 1,'details.mainTopic':1,'details.subTopic':1}});
});



Meteor.publish("all-resources", function () {
    console.log("publishing resources");
   return Resources.find();
  });

Meteor.publish("all-activities", function () {
    console.log("publishing activities");
   return Activities.find();
  });

Meteor.publish("all-curricula", function () {
    console.log("publishing activities");
   return Curricula.find();
  });

Meteor.publish("fileUploads", function () {
    console.log("publishing fileUploads");
    return Files.find();
  });

//DROP DOWN DATA
Meteor.publish("options", function () {
    console.log("publishing options");
   return Options.find();

});

//COUNTS
Meteor.publish("resources-count", function () {
    console.log("publishing resources-count");
    return Resources.find({},{fields: {'_id' : 1, 'type' : 1}});
  });

Meteor.publish("activities-count", function () {
  console.log("publishing activities-count");
  return Activities.find({},{fields: {'_id' : 1}});
});

Meteor.publish("curricula-count", function () {
  console.log("publishing curricula-count");
  return Curricula.find({},{fields: {'_id' : 1}});
});

Meteor.publish('version', function () {
  return Version.find();
});
