

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
       var identifier = Router.current().params._id
       var resource = new Object();
       if (identifier != undefined) {
         resource = Resources.findOne(identifier);
       }


      //  var offline_video_locations = $(".offline_video_locations").map(function() {
      //    return $(this)[0].value;
      //  }).get();
       //
      //  var offline_video_names = $(".offline_video_names").map(function() {
      //    return $(this)[0].value;
      //  }).get();
       //
      //  var online_video_locations = $(".online_video_locations").map(function() {
      //    return $(this)[0].value;
      //  }).get();
       //
      //  var online_video_locations = $(".online_video_locations").map(function() {
      //    return $(this)[0].value;
      //  }).get();

       var offline_videos = [];
       var count = 0;
       $(".offline_video_locations").each(function() {
         var video = new Object();
         video.location = $(this)[0].value;
         video.name = $(".offline_video_names")[count].value

         offline_videos.push(video);
         count++;
       })

       var online_videos = [];
       count = 0;
       $(".online_video_locations").each(function() {
         var video = new Object();
         video.location = $(this)[0].value;
         video.name = $(".online_video_names")[count].value

         online_videos.push(video);
         count++;
       })

       var type = Router.current().params.resource_type;
       resource.type = type
       resource.details = fields;
       resource.fileIDs = Session.get('fileIDs');
       resource.offline_videos = offline_videos;
       resource.online_videos = online_videos;

       console.log("SAVING RESOURCE:");
       console.log(resource);
       Meteor.call("addItem", ItemTypeEnum.RESOURCE, resource, function(error, result){
          if(error){
              console.log(error);
          }  else {
           console.log('Success! Result:');
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
  })
	.form('set values', {
    title     : this.data.details.title,
		description : this.data.details.description,
    mainTopic   : this.data.details.mainTopic,
    subTopic   : this.data.details.subTopic,
    keywords : this.data.details.keywords,
    complexity : this.data.details.complexity,
    source    : this.data.details.source,
    length  : this.data.details.length,
    link  : this.data.details.link,
    year  : this.data.details.year,
		method    : this.data.details.method,
    author  : this.data.details.author,
		books    : this.data.books,
		videos    : this.data.videos,
    materialsNeeded : this.data.details.materialsNeeded
  })
;
})
