var validationRules = {
  title: {
    identifier: 'title',
    rules: [
      {
        type   : 'empty',
        prompt : 'Please enter a title'
      }
    ]
  },
  mainTopic: {
    identifier: 'mainTopic',
    rules: [
      {
        type   : 'empty',
        prompt : 'Please select a main topic'
      }
    ]
  },
  subTopic: {
    identifier: 'subTopic',
    rules: [
      {
        type   : 'empty',
        prompt : 'Please select a sub topic'
      }
    ]
  },
  description: {
    identifier: 'description',
    rules: [
      {
        type   : 'empty',
        prompt : 'Please enter a description'
      }
    ]
  },
  keywords: {
    identifier: 'keywords',
    rules: [
      {
        type   : 'minCount[1]',
        prompt : 'Keywords must have at least {ruleValue} choices'
      }
    ]
  },
  link : {
    identifier: 'link',
    optional: true,
    rules: [
      {
        type   : 'url',
        prompt : 'Please enter a valid link URL'
      }
    ]
  },
  storageLocationOnline : {
    identifier: 'storageLocationOnline',
    optional: true,
    rules: [
      {
        type   : 'url',
        prompt : 'Please enter a valid URL'
      }
    ]
  }
}

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
       var offline = form.form('get values', ['offline_video_names', 'offline_video_locations'])

       console.log(offline);

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
    fields: validationRules
  })
	.form('set values', {
    title     : this.data.details.title,
		description : this.data.details.description,
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
    online_video_names : this.data.online_video_names,
    online_video_locations: this.data.online_video_locations,
    offline_video_names: this.data.offline_video_names,
    offline_video_locations: this.data.offline_video_locations
  })
;
})
