Template.content_resource_type.helpers({
  content: function() {
		var ret = 'content_' + this.type
		return ret ;
  },
	header: function() {
		var ret = 'header_' + this.type
		return ret ;
	},
});


Template.upsert_resource_type.onRendered( function() {
	$('#resourceDetailsForm')
  .form({
    onFailure(formErrors, fields)	{
			console.log(formErrors);
			return false;
		},
		onSuccess : function(event, fields){
      event.preventDefault();
      var form = $('#resourceDetailsForm');
       var topic =	form.form('get field', 'topic').val();
       var allFields = form.form('get values')

       var identifier = Router.current().params._id
       var resource = new Object();
       if (identifier != undefined) {
         resource = Resources.findOne(identifier);
       }

       var type = Router.current().params.resource_type;
       resource.type = type
       resource.details = allFields;
       resource.fileIDs = Session.get('fileIDs');
       console.log("editing file IDs");
       console.log(resource.fileIDs);
       Meteor.call("addItem", ItemTypeEnum.RESOURCE, resource, function(error, result){
          if(error){
              console.log(error);
          }  else {
           console.log('Success');
           console.log(result)
         }

         Session.set('fileIDs', null);
         if (result.insertedId != undefined) {
 					identifier = result.insertedId;
   			 }
   			 Router.go('/resource/' + identifier);
         return false;
         });
    },
    on: 'submit',
    fields: {
      title     : 'empty',
      mainTopic   : 'empty',
      subTopic : 'empty',
      description : ['minLength[6]', 'empty'],
      keywords   : ['minCount[1]', 'empty'],
      complexity    : 'empty'
    }
  })
	.form('set values', {
    title     : this.data.details.title,
		description     : this.data.details.description,
    mainTopic   : this.data.details.mainTopic,
    subTopic   : this.data.details.subTopic,
    keywords : this.data.details.keywords,
    complexity : this.data.details.complexity,
    source    : this.data.details.source,
    link  : this.data.details.link,
		method    : this.data.details.method,
		books    : this.data.books,
		videos    : this.data.videos,
    author  : this.data.author,
    year  : this.data.year,
  })
;
})
