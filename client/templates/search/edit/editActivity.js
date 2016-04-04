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
    videos    : this.data.videos
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
			var form = $('#activityDetailsForm');
			var identifier = Router.current().data()._id
			var existingActivity = Activities.findOne(identifier);

			var resources =	$('#resources .ui.label.transition.visible');
			var resourceIds = $.map(resources, function(element) {
				return $(element).attr('data-value');
			});
			existingActivity.resourceIds = resourceIds;
			existingActivity.details = fields;
			existingActivity.fileIDs = Session.get('fileIDs');
			existingActivity.guideID = Session.get('guideID');
			Meteor.call("addItem", ItemTypeEnum.ACTIVITY, existingActivity);
			Session.set('fileIDs', null);
			console.log('Success');
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
