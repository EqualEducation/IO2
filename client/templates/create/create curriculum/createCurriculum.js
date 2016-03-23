Template.create_curriculum.onRendered( function() {
	$('#curriculumDetailsForm')
  .form({
		onFailure(formErrors, fields)	{
			event.preventDefault();
			console.log(formErrors);
			return false;
		},
		onSuccess : function(event, fields){
			event.preventDefault();
      var form = $('#curriculumDetailsForm');
      var topic =	form.form('get field', 'topic').val();
      console.log('SAVING');

      var newCurriculum = new Object();

      newCurriculum.details = fields;
      newCurriculum.fileIDs = Session.get('fileIDs');
      Meteor.call("addItem", ItemTypeEnum.CURRICULUM, newCurriculum);
      Session.set('fileIDs', null);
      form.form('clear')
     return true;
    },
		on: 'submit',
    fields: {
      title     : 'empty',
      mainTopic   : 'empty',
      subTopic : 'empty',
      description : ['minLength[6]', 'empty'],
      keywords   : ['minCount[1]', 'empty'],
      audience    : 'empty'
    }
  })
})

// Template.create_activity.events({
// 	'click #save' : function() {
//
// 	}
// })


Template.content_curriculum.onRendered(function () {

});
