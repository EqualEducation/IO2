Template.create_resource_type.onRendered( function() {
	$('#resourceDetailsForm')
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
       var newResource = new Object();

       newResource.type = this.type
       var subTopic = allFields.subTopic;
       var keywords = allFields.keywords;
       var methods = allFields.methods;
       var materials = allFields.materials;

       newResource.details = allFields;
       newResource.fileIDs = Session.get('fileIDs');
       Session.set('fileIDs', null);
       Meteor.call("addItem", ItemTypeEnum.RESOURCE, newResource, function(error, result){
         if(error){
             console.log(error);
         }  else {
 					console.log('Success');
 					console.log(result)
 				}

 				Session.set('fileIDs', null);
 				Router.go('/resource/' + result.insertedId);
 				return false;
     });
    },
		on: 'submit',
    fields: {
      title     : 'empty',
      mainTopic   : 'empty',
      subTopic : 'empty',
      description : ['minLength[1]', 'empty'],
      keywords   : ['minCount[1]', 'empty'],
      audience    : 'empty'
    }
  })
})


Template.create_resource_type.helpers({
  content: function() {
		var ret = 'content_' + this.type
		return ret ;
  },
	header: function() {
		var ret = 'header_' + this.type
		return ret ;
	},
});

Template.registerHelper('totalNumberOfResourceType', function(resourceType) {
	var numberOfItems = Resources.find({'type' : resourceType}).count();
	return numberOfItems;
});
