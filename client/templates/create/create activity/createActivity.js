Template.create_activity.onRendered( function() {
	Session.set('hideSuccessMessage', true);

	$('#activityDetailsForm')
  .form({
		onFailure(formErrors, fields)	{
			event.preventDefault();
			console.log(formErrors);
			return false;
		},
		onSuccess : function(event, fields){
			event.preventDefault();
			var form = $('#activityDetailsForm');
			var topic =	form.form('get field', 'topic').val();
			var newActivity = new Object();

			newActivity.details = fields;
			newActivity.fileIDs = Session.get('fileIDs');
			newActivity.guideID = Session.get('guideID');
			Meteor.call("addItem", ItemTypeEnum.ACTIVITY, newActivity, function(error, result){
        if(error){
            console.log(error);
        }  else {
					console.log('Success');
					console.log(result)
				}

				Session.set('fileIDs', null);
				Router.go('/activity/' + result.insertedId);
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
