Template.upsert_curriculum.onRendered( function() {
	console.log('upsert curriculum');
	console.log(this)
	$('#curriculumDetailsForm')
  .form({
		onFailure(formErrors, fields)	{
			console.log(formErrors);
			return false;
		},
		onSuccess : function(event, fields){
			event.preventDefault();
      var form = $('#curriculumDetailsForm');

			var identifier = Router.current().params._id
			var curriculum = new Object();

			if (identifier != undefined) {
				curriculum = Curricula.findOne(identifier);
			}


			var slots = $(".slot");
		  var activitySlots = $.map(slots, function(element) {
				var activitySlot = new Object();
				activitySlot.name = $(element)[0].firstChild.id
				activitySlot.activityId =	$(element).dropdown('get value');
        return activitySlot;
      });

			curriculum.activitySlots = activitySlots;
      curriculum.details = fields;
      curriculum.fileIDs = Session.get('fileIDs');
			console.log('SAVING: ' + curriculum._id);
      Meteor.call("addItem", ItemTypeEnum.CURRICULUM, curriculum, function(error, result){
        if(error){
					alert(error);
        }  else {
					console.log('Success');
					console.log(result)
				}

				Session.set('fileIDs', null);
				if (result.insertedId != undefined) {
					identifier = result.insertedId;
				}
				Router.go('/curriculum/' + identifier);
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
  .form('set values', {
    title     : this.data.details.title,
    description     : this.data.details.description,
    mainTopic   : this.data.details.mainTopic,
    subTopic   : this.data.details.subTopic,
    keywords : this.data.details.keywords,
    audience : this.data.details.audience,
    source    : this.data.details.source,
    method    : this.data.method,
  })
})
