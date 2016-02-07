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
