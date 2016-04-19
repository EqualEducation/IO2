Template.commonFields.onRendered(function() {
  $('.commonFields.noAdditions.ui.dropdown')
    .dropdown()
  ;

  $('.commonFields.allowAdditions.ui.dropdown')
    .dropdown({
      allowAdditions: true
    })
  ;

  $('.ui.radio.checkbox')
    .checkbox()
  ;

  Session.set('mainTopic', null);

})

Template.commonFields.events({
  'change #mainTopic': function(event,template){
    Session.set('mainTopic', event.target.value);
  }
});

Template.commonFields.helpers({
  'mainTopicExists' : function() {
    var mainTopic = Session.get('mainTopic')
    console.log('MAIN TOPIC');
    console.log(mainTopic)
    if (mainTopic != undefined && mainTopic != "") {
      return true;
    } else {
      return false;
    }
  }
})


Template.methodField.onRendered(function() {
  $('.commonFields.noAdditions.ui.dropdown')
    .dropdown()
  ;

  $('.commonFields.allowAdditions.ui.dropdown')
    .dropdown({
      allowAdditions: true
    })
  ;
})

Template.materialsField.onRendered(function() {
  $('.ui.radio.checkbox')
    .checkbox()
  ;
})
