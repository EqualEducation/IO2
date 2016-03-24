Template.editActivity.onRendered( function() {
	$('#activityDetailsForm')
  .form('set values', {
    title     : this.data.details.title,
    description     : this.data.details.description,
    mainTopic   : this.data.details.mainTopic,
    subTopic   : this.data.details.subTopic,
    keywords : this.data.details.keywords,
    audience : this.data.details.audience,
    source    : this.data.details.source,
    method    : this.data.method,
    books    : this.data.books,
    films    : this.data.films
  })
  .form({
		onFailure(formErrors, fields)	{
			event.preventDefault();
			console.log(formErrors);
			return false;
		},
		onSuccess : function(event, fields){
			event.preventDefault();
      console.log('edit activity');
      console.log(this);
			// var form = $('#activityDetailsForm');
			// var topic =	form.form('get field', 'topic').val();
			// var newActivity = new Object();
      //
			// newActivity.details = fields;
			// newActivity.fileIDs = Session.get('fileIDs');
			// newActivity.guideID = Session.get('guideID');
			// Meteor.call("updateItem", ItemTypeEnum.ACTIVITY, newActivity);
			// Session.set('fileIDs', null);
			// form.form('clear')
			// console.log('Success');
			// Router.go('create');
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
