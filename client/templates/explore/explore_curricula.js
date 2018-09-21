Template.explore_curricula.rendered= function() {
  $('.ui.accordion').accordion({ exclusive: false });
 };

Template.registerHelper("allCurriculaForTopics", function (subTopic,mainTopic) {
  if (subTopic != undefined) {
    var activities = Curricula.find({'details.subTopic': subTopic,'details.mainTopic':mainTopic},{sort: {"details.title": 1}});
    return activities;
  }
  var activities = Curricula.find({});
  return activities;
});

Template.explore_curricula.helpers({
  tabData: function() {
    // var filteredData=(fileDetails.find(selector, options).fetch());
    var data = Curricula.find().fetch();
    var numResults=(data.length);
     return {contentType: "all", numResults: numResults,items: data};
  },
  numActivities: function(mainTopic){
    // console.log(mainTopic);
    numActivities=Curricula.find({'details.mainTopic':mainTopic}).fetch().length;
    // console.log(numActivities);
    return numActivities;
  },
  numActivitiesWithSubtopic: function(subTopic,mainTopic){
    // console.log(mainTopic);
    numActivities=Curricula.find({'details.mainTopic':mainTopic,'details.subTopic':subTopic}).fetch().length;
    // console.log(numActivities);
    return numActivities;
  },
  mainTopics: function(){
    console.log(Curricula.find().fetch())
    return _.unique(_.pluck(_.pluck(Curricula.find().fetch(),'details'),'mainTopic')).sort();
  },
  subTopics: function(mainTopic){
    // console.log(mainTopic);
    // console.log(_.unique(_.pluck(_.pluck(Activities.find({'details.mainTopic':mainTopic}).fetch(),'details'),'subTopic')));
  return _.unique(_.pluck(_.pluck(Curricula.find({'details.mainTopic':mainTopic}).fetch(),'details'),'subTopic')).sort()
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
