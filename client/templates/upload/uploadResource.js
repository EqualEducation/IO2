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
		;

		$('.chooseType.modal')
			.modal('attach events', '.uploadDetails.modal #back')
		;
	},
	'click #next': function(event, template) {
		var element = template.find('input:radio[name=example2]:checked');
		console.log(template.find('input:radio[name=example2]'));

	}
})
