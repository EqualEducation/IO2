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


Template.edit_resource_type.onRendered( function() {
	$('#resourceDetailsForm')
  .form({
    fields: {
      title     : 'empty',
      mainTopic   : 'empty',
      subTopic : 'empty',
      description : ['minLength[6]', 'empty'],
      keywords   : ['minCount[1]', 'empty'],
      audience    : 'empty'
    }
  })
  .form({
		onFailure(formErrors, fields)	{
			event.preventDefault();
			console.log(formErrors);
			return false;
		},
		onSuccess : function(event, fields){
      event.preventDefault();
      var form = $('#resourceDetailsForm');
       var topic =	form.form('get field', 'topic').val();
       var allFields = form.form('get values')
       var identifier = Router.current().data()._id
 			 var existingResource = Resources.findOne(identifier);

       existingResource.type = this.type
       var subTopic = allFields.subTopic;
       var keywords = allFields.keywords;
       var methods = allFields.methods;
       var materials = allFields.materials;

       existingResource.details = allFields;
       existingResource.fileIDs = Session.get('fileIDs');
       Session.set('fileIDs', null);
       Meteor.call("addItem", ItemTypeEnum.RESOURCE, existingResource);
    },
  })
	.form('set values', {
    title     : this.data.details.title,
		description     : this.data.details.description,
    mainTopic   : this.data.details.mainTopic,
    subTopic   : this.data.details.subTopic,
    keywords : this.data.details.keywords,
    audience : this.data.details.audience,
    source    : this.data.details.source,
		method    : this.data.method,
		books    : this.data.books,
		films    : this.data.films
  })
;
})
