Template.editCurriculum.onRendered( function() {
	$('#curriculumDetailsForm')
  .form({
    fields: {
      title     : 'empty',
      mainTopic   : 'empty',
      subTopic : 'empty',
      description : ['minLength[6]', 'empty'],
      keywords   : ['minCount[1]', 'empty'],
      audience    : 'empty'
    }
  })
	.form({
		onFailure(formErrors, fields)	{
			event.preventDefault();
			console.log(formErrors);
			return false;
		},
		onSuccess : function(event, fields){
			var form = $('#curriculumDetailsForm');
			var topic =	form.form('get field', 'topic').val();
			var identifier = Router.current().data()._id
			var existingCurriculum = Curricula.findOne(identifier);

			existingCurriculum.details = fields;
			existingCurriculum.fileIDs = Session.get('fileIDs');
			Meteor.call("addItem", ItemTypeEnum.CURRICULUM, existingCurriculum, function(error, result){
				 if(error){
						 console.log(error);
				 }  else {
					console.log('Success');
					console.log(result)
				}

				Session.set('fileIDs', null);
				Router.go('/curriculum/' + existingCurriculum._id);
				return false;
				});
    },
	})
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
;
})
