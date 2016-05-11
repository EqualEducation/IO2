Template.upsert_curriculum.onRendered( function() {

	$('#curriculumDetailsForm')
  .form({
		onFailure(formErrors, fields)	{
			console.log(formErrors);
			return false;
		},
		onSuccess : function(event, fields){
			event.preventDefault();
			console.log('saving curriculum')
			// $('.page.dimmer:first')
			// .dimmer('toggle')
			// ;

			var files = Session.get('removedFileIds');
			var files = Files.find({'_id': { $in: files }}, {'key': 1})
			if (files != undefined && files.length > 0) {
				Meteor.call('deleteFiles', files);
				Session.set('removedFileIds', [])
			}

      var form = $('#curriculumDetailsForm');

			var identifier = Router.current().params._id
			var curriculum = new Object();
			if (identifier != undefined) {
				curriculum = Curricula.findOne(identifier);
			}

			var slots = $(".slot");
			var count = 1;
		  var activitySlots = $.map(slots, function(element) {
				var activitySlot = new Object();
				activitySlot.index = count;
				activitySlot.identifier = $(element)[0].firstChild.id
				activitySlot.activityId =	$(element).dropdown('get value');
				if (activitySlot.activityId != undefined && activitySlot.activityId != "") {
					return activitySlot;
				}
				count++;
      });


			if (activitySlots.length < 2) {
				form.form("add errors", [ 'Curriculum requires at least 2 activities' ]);
			} else {
				curriculum.activitySlots = activitySlots;
				curriculum.details = fields;

				var fileIds = Session.get('uploadedFileIds')
				curriculum.fileIDs = fileIds;

				console.log('SAVING: ' + curriculum._id);
				Meteor.call("addItem", ItemTypeEnum.CURRICULUM, curriculum, function(error, result){
	        if(error){
						alert(error);
	        }  else {
						console.log('Success');
						console.log(result)

					}

					Session.set('uploadedFileIds', []);
					if (result.insertedId != undefined) {
						identifier = result.insertedId;
					}
					Router.go('/curriculum/' + identifier);
					return false;
	    });
			}
    },
		inline: true,
		keyboardShortcuts : false,
		on: 'submit',
    fields: {
			title: {
        identifier: 'title',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a title'
          }
        ]
      },
			mainTopic: {
        identifier: 'mainTopic',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please select a main topic'
          }
        ]
      },
			subTopic: {
        identifier: 'subTopic',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please select a sub topic'
          }
        ]
      },
			description: {
        identifier: 'description',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a description'
          }
        ]
      },
			keywords: {
        identifier: 'keywords',
        rules: [
          {
            type   : 'minCount[1]',
            prompt : 'Keywords must have at least {ruleValue} choices'
          }
        ]
      },
			link : {
        identifier: 'link',
        optional: true,
        rules: [
          {
            type   : 'url',
            prompt : 'Please enter a valid URL'
          }
        ]
      }
    }
  })
  .form('set values', {
    title     : this.data.details.title,
    description     : this.data.details.description,
    mainTopic   : this.data.details.mainTopic,
    subTopic   : this.data.details.subTopic,
    keywords : this.data.details.keywords,
		complexity : this.data.details.complexity,
    source    : this.data.details.source,
		link  : this.data.details.link,
		method    : this.data.details.method
  })

	Session.set('uploadedFileIds', this.data.fileIDs)

})
