Template.explore_activities.rendered= function() {
  $('.ui.accordion').accordion({ exclusive: false });
 };

Template.registerHelper("allActivitiesForTopics", function (subTopic,mainTopic) {
  if (subTopic != undefined) {
    var activities = Activities.find({'details.subTopic': subTopic,'details.mainTopic':mainTopic},{sort: {"details.title": 1}});
    return activities;
  }
  var activities = Activities.find({});
  return activities;
});

Template.explore_activities.helpers({
  tabData: function() {
    // var filteredData=(fileDetails.find(selector, options).fetch());
    var data = Activities.find().fetch();
    var numResults=(data.length);
     return {contentType: "all", numResults: numResults,items: data};
  },
  numActivities: function(mainTopic){
    // console.log(mainTopic);
    numActivities=Activities.find({'details.mainTopic':mainTopic}).fetch().length;
    // console.log(numActivities);
    return numActivities;
  },
  numActivitiesWithSubtopic: function(subTopic,mainTopic){
    // console.log(mainTopic);
    numActivities=Activities.find({'details.mainTopic':mainTopic,'details.subTopic':subTopic}).fetch().length;
    // console.log(numActivities);
    return numActivities;
  },
  mainTopics: function(){
    return _.unique(_.pluck(_.pluck(Activities.find().fetch(),'details'),'mainTopic')).sort();
  },
  subTopics: function(mainTopic){
    // console.log(mainTopic);
    // console.log(_.unique(_.pluck(_.pluck(Activities.find({'details.mainTopic':mainTopic}).fetch(),'details'),'subTopic')));
  return _.unique(_.pluck(_.pluck(Activities.find({'details.mainTopic':mainTopic}).fetch(),'details'),'subTopic')).sort()
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
