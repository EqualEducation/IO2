Template.registerHelper("allActivitiesForTopic", function (topic) {
  if (topic != undefined) {
    var activities = Activities.find({'details.mainTopic': topic});
    return activities;
  }
  var activities = Activities.find({});
  return activities;
});

Template.explore.helpers({
  tabData: function() {
    // var filteredData=(fileDetails.find(selector, options).fetch());
    var data = Activities.find().fetch();
    var numResults=(data.length);
     return {contentType: "all", numResults: numResults,items: data};
  },
  mainTopics: function(){
  return _.unique(_.pluck(_.pluck(Activities.find().fetch(),'details'),'mainTopic'))
  }

})
