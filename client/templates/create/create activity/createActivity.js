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

			var newActivity = new Object();

			var resources =	$('#resources .ui.label.transition.visible');
			var resourceIds = $.map(resources, function(element) {
				return $(element).attr('data-value');
			});
			newActivity.resourceIds = resourceIds;
			newActivity.details = fields;
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
