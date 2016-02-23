Template.create.onRendered(function(){
	Meteor.subscribe("resources");
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
},
'click #createActivityButton': function(event, template) {
	$('.createActivity.modal')
		.modal('show')
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
								console.log(allFields)

								var newResource = new Object();
								newResource.type = Session.get('activeModal')
								var keywords = allFields.keywords;
								var array=keywords.split(',');
								allFields.keywords = array;

								console.log(allFields.keywords);
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

Template.create.helpers({
  content: function() {
		var ret = 'content_' + Session.get('activeModal')
		return ret ;
  },
	header: function() {
		var ret = 'header_' + Session.get('activeModal')
		return ret ;
	},
});
