Template.create_activity.onRendered( function() {
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
			Meteor.call("addItem", ItemTypeEnum.ACTIVITY, newActivity);
			Session.set('fileIDs', null);
			form.form('clear')
			console.log('Success');
			Router.go('create');
			return false;
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
