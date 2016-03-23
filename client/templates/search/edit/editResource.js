Template.edit_resource_type.helpers({
  content: function() {
		var ret = 'content_' + this.type
		return ret ;
  },
	header: function() {
		var ret = 'header_' + this.type
		return ret ;
	},
});
