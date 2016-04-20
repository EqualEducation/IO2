Template.upsert_activity.onRendered( function() {
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

			var identifier = Router.current().params._id
			var activity = new Object();
			if (identifier != undefined) {
				activity = Activities.findOne(identifier);
			}

			var resources =	$('#resources .ui.label.transition.visible');
			var resourceIds = $.map(resources, function(element) {
				return $(element).attr('data-value');
			});
			activity.resourceIds = resourceIds;
			activity.details = fields;
			activity.guideID = Session.get('guideID');
			Meteor.call("addItem", ItemTypeEnum.ACTIVITY, activity, function(error, result){
        if(error){
					alert(error);
        }  else {
					console.log('Success');
					console.log(result)
				}

				Session.set('guideID', null);
        Session.set('fileIDs', null);

				if (result.insertedId != undefined) {
					identifier = result.insertedId;
				}
				Router.go('/activity/' + identifier);
				return false;
    });

    },
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
			complexity: {
        identifier: 'complexity',
        rules: [
          {
            type   : 'checked',
            prompt : 'Please select a complexity level'
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
		method    : this.data.details.method,
		duration    : this.data.details.duration,
		books    : this.data.books,
		videos    : this.data.videos
	})
})

// Template.uploadGuide.events({
// 	'change .uploadGuide': function (event, template) {
//       uploadFileWithVariableName('guideID');
// 	},
// })
