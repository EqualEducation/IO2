Template.uploadResource.events({
	'click #uploadResourceButton': function(event, template) {
		$('.coupled.modal')
		  .modal({
		    allowMultiple: false
		  })
		;
		// attach events to buttons
		$('.uploadDetails.modal')
		  .modal('attach events', '.chooseType.modal #next')

		;
		// show first now
		$('.chooseType.modal')
			.modal('show')
			.modal('attach events', '.uploadDetails.modal #back')
			.modal({
				 onApprove : function() {
					console.log('next');
					var modalInputValue = $('input:radio[name=example2]:checked').val();
			 		console.log(modalInputValue);
				 }
			})
		;
	},
})
