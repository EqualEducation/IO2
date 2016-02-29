Template.createResource.onRendered(function() {

})


Template.createResource.helpers({
  content: function() {
    console.log("ACTIVE MODAL");
		var ret = 'content_' + Session.get('activeModal')
		return ret ;
  },
	header: function() {
		var ret = 'header_' + Session.get('activeModal')
		return ret ;
	},
});
