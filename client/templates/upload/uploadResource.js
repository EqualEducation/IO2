// //Get value from an input field
// 	function getFieldValue(fieldId) {
// 		 // 'get field' is part of Semantics form behavior API
// 		 return $('.ui.form').form('get field', fieldId).val();
// 	}
//
// 	function submitForm() {
// 		 var formData = {
// 				 field1: getFieldValue('someId')
// 		 };
//
// 		 $.ajax({ type: 'POST', url: '/api/someRestEndpoint', data: formData, success: onFormSubmitted });
// 	}
//
// 	// Handle post response
// 	function onFormSubmitted(response) {
// 			 // Do something with response ...
// 	}


var formValidationRules =
{
    // title: {
    //     identifier  : 'title',
    //     rules: [
    //         {
    //             type   : 'empty',
    //             prompt : 'Please enter a title'
    //         },
    //         {
    //             type   : 'length[2]',
    //             prompt : 'At least 6 characters'
    //         }
    //     ]
    // }
}

var formSettings =
{
	fields: true
    // onSuccess : function()
    // {
    //   //Hides modal on validation success
    //   // alert("Valid Submission, modal will close.");
		// 	console.log(this);
    //   // $('.modal').modal('hide');
    // }
}

Template.uploadResource.onRendered(function(){
	// $('.ui.form').form(validationRules, { onSuccess: submitForm });

	$('.content.ui.form').form(formValidationRules, formSettings);
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
							 window.alert('Wait not yet!');
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
								newResource.fileIDs = Session.get('fileIDs');
								resources.insert(newResource);

		          //  $('.ui.form').submit();
		           //Return false as to not close modal dialog
		           return false;
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
