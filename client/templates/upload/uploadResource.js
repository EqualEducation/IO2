Template.uploadResource.events({
	'click #uploadResourceButton': function(event, template) {
		$('.ui.upload.modal')
			.modal({
	    	onApprove : function() {
	    	}
	  	})
 			.modal('show');
	}
})
