Template.create_curriculum.onRendered( function() {
	$('#curriculumDetailsForm')
  .form({
		onFailure(formErrors, fields)	{
			console.log(formErrors);
			return false;
		},
		onSuccess : function(event, fields){
			event.preventDefault();
      var form = $('#curriculumDetailsForm');
      var topic =	form.form('get field', 'topic').val();
      console.log('SAVING');

      var newCurriculum = new Object();
      var activities = $('#activities .ui.label.transition.visible');
      var activityIds = $.map(activities, function(element) {
        return $(element).attr('data-value');
      });
      newCurriculum.activityIds = activityIds;
      newCurriculum.details = fields;
      newCurriculum.fileIDs = Session.get('fileIDs');
      Meteor.call("addItem", ItemTypeEnum.CURRICULUM, newCurriculum, function(error, result){
        if(error){
          console.log(error);
        }  else {
					console.log('Success');
					console.log(result)
				}

				Session.set('fileIDs', null);
				Router.go('/curriculum/' + result.insertedId);
				return false;
    });
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
