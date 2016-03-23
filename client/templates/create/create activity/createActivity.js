// Template.create_activity.rendered({
// 	$('#activityDetailsForm')
//   .form({
//     fields: {
//       name     : 'empty',
//       gender   : 'empty',
//       username : 'empty',
//       password : ['minLength[6]', 'empty'],
//       skills   : ['minCount[2]', 'empty'],
//       terms    : 'checked'
//     }
//   })
// ;
// })

Template.create_activity.events({
	'click #save' : function() {
		var form = $('#activityDetailsForm');
		var topic =	form.form('get field', 'topic').val();
		var allFields = form.form('get values')
		var newActivity = new Object();

		newActivity.details = allFields;
		newActivity.fileIDs = Session.get('fileIDs');
		newActivity.guideID = Session.get('guideID');
		Meteor.call("addItem", ItemTypeEnum.ACTIVITY, newActivity);
		Session.set('fileIDs', null);
		form.form('clear')
	 	return true;
	}
})
