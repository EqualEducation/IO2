Template.explore.rendered= function() {
  $('.ui.accordion').accordion()
 };
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
  numActivities: function(mainTopic){
    console.log(mainTopic);
    numActivities=Activities.find({'details.mainTopic':mainTopic}).fetch().length;
    console.log(numActivities);
    return numActivities;
  },
  mainTopics: function(){
  return _.unique(_.pluck(_.pluck(Activities.find().fetch(),'details'),'mainTopic'));
  },
  subTopics: function(mainTopic){
  return {subTopics:_.unique(_.pluck(_.pluck(Activities.find({'details.mainTopic':mainTopic}).fetch(),'details'),'subTopic')),
  mainTopic:mainTopic};
  },
  pathName: function(itemType) {
    return itemType.toLowerCase() + ".view";
  },
  itemTypeIsResource: function(itemType) {
    //look in YourFile collection
    if(itemType=="Resource")
      return true;
    else
      return false;

  }
})
