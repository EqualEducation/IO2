Template.uploadResource.events({
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
					var modalName = '.'+resourceType+'.modal';
					$(modalName)
						.modal('show')
					;

					var backEvent = modalName + ' #back'
					$('.chooseType.modal')
						.modal('attach events', backEvent)
					;


				 }
			})
		;
	},
})
