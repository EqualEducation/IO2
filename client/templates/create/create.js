Template.create.onRendered(function(){
	$('.content.ui.form').form();
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
								var allFields = form.form('get values')
								console.log(allFields)

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

		// $('.coupled.modal')
		//   .modal({
		//     allowMultiple: false
		//   })
		// ;
		// show first now
		$('.chooseType.modal')
			.modal('show')
			.modal({
				 onApprove : function() {
					var resourceType = $('input:radio[name=example2]:checked').val();
					var modalName = '.'+resourceType+'.modal';
					Session.set('activeModal', resourceType);
					$('.resourceDetails.modal')
					.modal({
						 onDeny    : function(){
							 return false;
						 },
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
						.modal('show')
					;

					// var backEvent = modalName + ' #back'
					$('.chooseType.modal')
						.modal('attach events', '#back')
					;
				 }
			})
		;
	},
})
