Template.create_curriculum.onRendered( function() {
	$('#curriculumDetailsForm')
  .form({
		onFailure(formErrors, fields)	{
			console.log(formErrors);
			return false;
		},
		onSuccess : function(event, fields){
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
