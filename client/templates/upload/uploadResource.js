Template.uploadResource.onRendered(function(){
	Meteor.subscribe("resources");

	// $('.ui.form').form(validationRules, { onSuccess: submitForm });

	$('.content.ui.form').form();
})

Template.uploadResource.events({
	'click button.modal': function(event, template) {
	var name = template.$(event.target).data('modal-template');
	console.log(name)
	Session.set('activeModal', name);
},
	'click #uploadResourceButton': function(event, template) {
		$('#chooseTypeForm').form('reset');
		// var chooseTypeForm = template.find("#chooseTypeForm");//[0].reset();
		// console.log(chooseTypeForm);
		//
		// chooseTypeForm.form('reset');

		$('.coupled.modal')
		  .modal({
		    allowMultiple: false
		  })
		;
		// attach events to buttons

		// show first now
		$('.chooseType.modal')
			.modal('show')
			.modal({
				 onApprove : function() {
					var resourceType = $('input:radio[name=example2]:checked').val();
					// var name = template.$(event.target).data('modal-template');

					var modalName = '.'+resourceType+'.modal';
					Session.set('activeModal', resourceType);
					// $(modalName)
					// 	.modal('show')
					// ;

					$('.resourceDetails.modal')
					.modal({
						 onDeny    : function(){
							 return false;
						 },
						 onApprove : function() {
							 //Submits the semantic ui form
		           //And pass the handling responsibilities to the form handlers,
		           // e.g. on form validation success
							 var form = $('#resourceDetailsForm');
								var topic =	form.form('get field', 'topic').val();
								var allFields = form.form('get values')

								var newResource = new Object();
								newResource.type = Session.get('activeModal')
								newResource.details = allFields;
								console.log('file ids')
								console.log(Session.get('fileIDs'));
								newResource.fileIDs = Session.get('fileIDs');
								Resources.insert(newResource);

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

Template.uploadResource.helpers({
  content: function() {
		var ret = 'content_' + Session.get('activeModal')
		return ret ;
  },
	header: function() {
		var ret = 'header_' + Session.get('activeModal')
		return ret ;
	},
});
