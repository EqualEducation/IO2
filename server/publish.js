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

Meteor.publish("resources-searchpage-data", function (searchValue) {
    // console.log("publishing resources-searchpage-data");
  //  return Resources.find({},{fields: {'itemType' : 1, 'details.title' : 1, 'details.description' : 1, 'details.keywords' : 1, 'type' : 1}});
   //return Resources.find();
   var data;
   if (!searchValue ||  searchValue == "") {
     console.log('RESOURCES without search value')
     data = Resources.find({}, {limit: 30});
   } else {
     console.log('RESOURCES with search value: ' + searchValue)
      data = Resources.find(
       { $text: {$search: searchValue} },
       {
         // `fields` is where we can add MongoDB projections. Here we're causing
         // each document published to include a property named `score`, which
         // contains the document's search rank, a numerical value, with more
         // relevant documents having a higher score.
         fields: {
           'type':1,'itemType' : 1, 'details.title' : 1, 'details.description' : 1,  'details.keywords' : 1, score: { $meta: "textScore" }
         },
         // This indicates that we wish the publication to be sorted by the
         // `score` property specified in the projection fields above.
         sort: {
           score: { $meta: "textScore" }
         }
       }, {limit: 30}
     );
   }

   console.log(data.count())
   if (data!=undefined && data.count() > 0 ) {
     console.log('data')
       return data;
   }

   return this.ready();

  });

// Meteor.publish("activities-searchpage-data", function () {
//       console.log("publishing activities-searchpage-data");
//      return Activities.find({},{fields: {'itemType' : 1, 'details.title' : 1, 'details.description' : 1, 'details.keywords' : 1}});
// });

// If `searchValue` is not provided, we publish all known messages. If it is
// provided, we publish only messages that match the given search value.
Meteor.publish("activities-searchpage-data", function (searchValue) {
  var data;
  if (!searchValue ||  searchValue == "") {
    console.log('ACTIVITES without search value')
    data = Activities.find({}, {limit: 30});
  } else {
    console.log('ACTIVITES with search value: ' + searchValue)
    data = Activities.find(
      { $text: {$search: searchValue} },
      {
        // `fields` is where we can add MongoDB projections. Here we're causing
        // each document published to include a property named `score`, which
        // contains the document's search rank, a numerical value, with more
        // relevant documents having a higher score.
        fields: {
          'itemType' : 1, 'details.title' : 1, 'details.description' : 1,  'details.keywords' : 1, score: { $meta: "textScore" }
        },
        // This indicates that we wish the publication to be sorted by the
        // `score` property specified in the projection fields above.
        sort: {
          score: { $meta: "textScore" }
        }
      }, {limit: 30}
    );
  }

  console.log(data.count())
  if (data!=undefined && data.count() > 0 ) {
    console.log('data')
    return data;
  }
  return this.ready();
});

Meteor.publish("curricula-searchpage-data", function (searchValue) {
  var data;
    //   console.log("publishing curricula-searchpage-data");
    //  return Curricula.find({},{fields: {'itemType' : 1, 'details.title' : 1, 'details.description' : 1,  'details.keywords' : 1}});
    if (!searchValue || searchValue == "") {
      console.log('CURRICULA without search value')
      data = Curricula.find({}, {limit: 30});
    } else {
      console.log('CURRICULA with search value: ' + searchValue)
      data = Curricula.find(
        { $text: {$search: searchValue} },
        {
          // `fields` is where we can add MongoDB projections. Here we're causing
          // each document published to include a property named `score`, which
          // contains the document's search rank, a numerical value, with more
          // relevant documents having a higher score.
          fields: {
            'itemType' : 1, 'details.title' : 1, 'details.description' : 1,  'details.keywords' : 1, score: { $meta: "textScore" }
          },
          // This indicates that we wish the publication to be sorted by the
          // `score` property specified in the projection fields above.
          sort: {
            score: { $meta: "textScore" }
          }
        }, {limit: 30}
      )
    }

    console.log(data.count())
    if (data!=undefined && data.count() > 0 ) {
        console.log('data')
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

// Meteor.publish("fileMeta", function () {
//     console.log("publishing fileMeta");
//    return fileDetails.find();
//   });


//DROP DOWN DATA
Meteor.publish("options", function () {
    console.log("publishing options");
   return Options.find();

});

//COUNTS
Meteor.publish("resources-createpage-count", function () {
    console.log("publishing resources-createpage-count");
    return Resources.find({},{fields: {'_id' : 1, 'type' : 1}});
  });

Meteor.publish("activities-createpage-count", function () {
  console.log("publishing activities-createpage-count");
  return Activities.find({},{fields: {'_id' : 1}});
});

Meteor.publish("curricula-createpage-count", function () {
  console.log("publishing curricula-createpage-count");
  return Curricula.find({},{fields: {'_id' : 1}});
});
