Template.create.onRendered(function(){
	//initialising forms
	$('.content.ui.form').form();



	//setting up chooseType modal
	$('.chooseType.modal')
		//present chooseType modal when "back" button clicked on resourceDetails modal
		.modal('attach events', '.resourceDetails.modal #back')
		//what to do when approve button pressed ("next")
		.modal({
			 onApprove : function() {
				var resourceType = $('input:radio[name=example2]:checked').val();
				var modalName = '.'+resourceType+'.modal';
				Session.set('activeModal', resourceType);
			 }
		});

	$('.resourceDetails.modal')
		//present resourceDetails modal when "next" button clicked on chooseType modal
		.modal('attach events', '.chooseType.modal #next')
		//what to do when approve button pressed ("save")
		.modal({
			 onApprove : function() {
				 var form = $('#resourceDetailsForm');
					var topic =	form.form('get field', 'topic').val();
					var allFields = form.form('get values')
					console.log('SAVING');
					console.log(allFields);

					var newResource = new Object();

					newResource.type = Session.get('activeModal')
					var subTopic = allFields.subTopic;
					var keywords = allFields.keywords;
					var methods = allFields.methods;
					var materials = allFields.materials;

					newResource.details = allFields;
					newResource.fileIDs = Session.get('fileIDs');
					Meteor.call("addResource", newResource);
					form.form('clear')
				//  $('.ui.form').submit();
				 //Return false as to not close modal dialog
				 return true;
			 }
			})
		;

})

Template.create.events({
	'click button.modal': function(event, template) {
	var name = template.$(event.target).data('modal-template');
	Session.set('activeModal', name);
},
'click #createCurriculumButton': function(event, template) {
	$('.createCurriculum.modal')
	.modal('show')
	.modal({
		 onApprove : function() {
					 var form = $('#curriculumDetailsForm');
						var topic =	form.form('get field', 'topic').val();
						var allFields = form.form('get values')
						console.log(allFields)

						var newCurriculum = new Object();
						var keywords = allFields.keywords;
						var array=keywords.split(',');
						allFields.keywords = array;

						console.log(allFields.keywords);
						newCurriculum.details = allFields;
						newCurriculum.fileIDs = Session.get('fileIDs');
						Meteor.call("addCurriculum", newCurriculum);
						form.form('clear')
					//  $('.ui.form').submit();
					 //Return false as to not close modal dialog
					 return true;
				 }
				})
			;
},
'click #createActivityButton': function(event, template) {
	$('.createActivity.modal')
			.modal('show')
			.modal({
				 onApprove : function() {
							 var form = $('#activityDetailsForm');
								var topic =	form.form('get field', 'topic').val();
								var allFields = form.form('get values');
								console.log('SAVING');
								console.log(allFields);

								var newActivity = new Object();
								// var keywords = allFields.keywords;
								// var array=keywords.split(',');
								// allFields.keywords = array;

								// console.log(allFields.keywords);
								newActivity.details = allFields;
								newActivity.fileIDs = Session.get('fileIDs');
								Meteor.call("addActivity", newActivity);
								form.form('clear')
							//  $('.ui.form').submit();
							 //Return false as to not close modal dialog
							 return true;
						 }
						})
					;
},
	'click #createResourceButton': function(event, template) {
		$('#chooseTypeForm').form('reset');
		$('.chooseType.modal')
			.modal('show');
	},
})
