Template.topics.onRendered(function(){
  $('.ui.accordion')
  .accordion();
});

Template.topics.helpers({
  'mainTopics' : function() {
    var options = Options.findOne();
    return options.mainTopics;
  },
  'subtopics' : function(mainTopic) {
    var options = Options.findOne();
    let optionsByTopic = options[mainTopic]
    optionsByTopic.sort(function(option1, option2){
        if(option1 < option2) return -1;
        if(option1 > option2) return 1;
        return 0;
    })
    return optionsByTopic;
  },
  'subtopicId' : function(subTopic) {
    return subTopic.replace(" ", "");
  }
});

Template.topics.events({
  'click .addSubtopic' : function(event, template) {
    var mainTopic = this.toString();
    var mainTopicId = mainTopic.replace(" ", "")

    var newSubtopic = $('#' + mainTopicId)[0].value;
    Meteor.call("addSubtopic", mainTopic, newSubtopic, function(error){
      if(error){
        alert(error);
      }  else {
        console.log('Success');
      }
    });
  },
  'click .addMainTopic' : function(event, template) {
    var mainTopic = $('#mainTopic')[0].value;
    Meteor.call("addMainTopic", mainTopic, function(error){
      if(error){
        alert(error);
      }  else {
        console.log('Success');
      }
    });

  }
})
