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

  Session.set('mainTopic', this.data.mainTopic);

})

Template.commonFields.events({
  'change #mainTopic': function(event,template){
    var mainTopic = Session.get('mainTopic');
    if (mainTopic != event.target.value) {
      Session.set('mainTopic', event.target.value);
      $("#subTopic").dropdown('refresh');
    }
  }
});

Template.commonFields.helpers({
  'hideIfVideo' : function() {
    var resourceType = Router.current().params.resource_type;
    if (resourceType == 'video') {
      return 'hidden'
    }
  },
  'shouldHide' : function() {
    var mainTopic = Session.get('mainTopic')
    if (mainTopic != undefined && mainTopic != "") {
      return;
    } else {
      return 'hidden';
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
