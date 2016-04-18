Template.edit_resource_type.helpers({
  content: function() {
		var ret = 'content_' + this.type
		return ret ;
  },
  noAssociatedFiles: function(){
    console.log('file:');
    console.log(this);
    var fileIDs=(this.fileIDs);
    if (fileIDs==undefined)
      return true;
    else
      return false;
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

       existingResource.details = allFields;
       existingResource.fileIDs = Session.get('fileIDs');
       console.log("editing file IDs");
       console.log(existingResource.fileIDs);
       Meteor.call("addItem", ItemTypeEnum.RESOURCE, existingResource, function(error, result){
          if(error){
              console.log(error);
          }  else {
           console.log('Success');
           console.log(result)
         }

         Session.set('fileIDs', null);
         Router.go('/resource/' + existingResource._id);
         return false;
         });

      //  Meteor.call("addItem", ItemTypeEnum.RESOURCE, existingResource);
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
		videos    : this.data.videos
  })
;
})
Template.edit_resource_type.events({
  'click #removeFile': function (event) {
    console.log('remove file!');
    $('.ui.basic.change.modal')
        .modal({

          onDeny    : function(){
            return true;
          },
          onApprove: function(){
            Session.set('fileIDs',null);
            return true;
          }
        })
        .modal('show')
  }      
})
