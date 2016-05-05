
  // counter starts at 0
Template.uploader.onRendered(function() {
  Session.set('uploadProgress', 0);
  Session.set('upload_images', []);
  Session.set('progress_array', []);
})

  Template.uploadFiles.helpers({
    upload_images: function(){
        return Session.get('upload_images');
    }
  });

  Template.progressBar.helpers({
    updateProgressBar: function (index, percent) {
      $('#progress_' + index).progress({percent: percent});
    }
  });

  Template.progressBar.events({
    'click button.cancel' : function(event, template) {
      event.preventDefault()

      var uploader = Session.get('upload_images')[this.index].uploader;
      var object = uploader.instructions.postData.filter(function ( obj ) {
          if (obj.name === "key"){
            return obj.value
          }
      })[0];
      console.log(object.value);
      Meteor.call("deleteFileWithKey", object.value, function(error, result){

      })
    }
  })


  Template.uploader.events({
    'change #upload-btn': function (event, template) {

      //Session var for holding overall progress
      Session.set('uploadProgress', 0);
      //Session var for holding objects containing url and progress
      //for each image we upload
      Session.set('upload_images', []);

      //var files = event.target.files;
      var files = file = $('#upload-btn').get(0).files;

      //Check that there is a file or more to be processed
      if (files.length>0){

        var total_files = files.length;

        var uploads = _.map(files, function (file) {
            var uploader = new Slingshot.Upload("uploadToAmazonS3");
            Modules.client.uploadToAmazonS3( { file: file, template: template, uploader: uploader } );

            // uploader.send(file, function (error, downloadUrl) {
            //   if (error != undefined) {
            //     alert(error)
            //   } else {
            //     console.log('uploaded file available here: '+downloadUrl);
            //   }
            // });
            return uploader;
        });

        //Create a tracker to iterate our array of uploaders and
        //return information to store in our Session variable
        var uploadTracker = Tracker.autorun(function (computation) {

            //Rest our variables here
            var image_array = [];
            var progress_array = [];
            var overall_progress = 0;

            //iterate with underscore over our uploaders and push details to array
            _.each(uploads, function(a_uploader){
                var prog = a_uploader.progress();
                if (!isNaN(prog))
                    prog = Math.round(prog*100);
                else
                    prog=0;
                var image_details = {
                    uploader: a_uploader,
                    name: a_uploader.file.name,
                    url: a_uploader.url(true),
                    progress: prog
                };
                image_array.push(image_details);
                if (!isNaN(prog)){
                  progress_array.push(prog);
                } else {
                  progress_array.push(0);
                }
                //Update the overall progress
                overall_progress = overall_progress+prog;
            });

            overall_progress = overall_progress/total_files;

            //Set our Session var array of image details
            Session.set('upload_images', image_array);
            Session.set('progress_array', progress_array);

            if (!isNaN(overall_progress)){
              Session.set('uploadProgress', Math.round(overall_progress));
            }
            if(overall_progress==100){
                computation.stop();
            }
            return;
        });

      }//end if
    }
  });


//
// var uploader = new ReactiveVar();
//
// Template.uploader.events({
//   'change input[type="file"]' ( event, template ) {
//     uploader.set(new Slingshot.Upload("uploadToAmazonS3"));
//     Modules.client.uploadToAmazonS3( { event: event, template: template, uploader: uploader.get() } );
//   }
// });
//
// Template.uploader.helpers({
//   'uploader':function() {
//     console.log('SDFSDFDSFSDF')
//     var upload = uploader.get();
//     // var file = upload.file
//     return upload;
//   }
// })
//
// Template.progressBar.onRendered(function() {
//   $('#example1').progress('increment')
// })
//
// Template.progressBar.helpers({
//   isUploading: function () {
//       return Boolean(uploader.get());
//   },
//   progress: function (percent) {
//       // var upload = uploader.get();
//       // console.log(upload);
//       // if (upload) {
//       //   var progress = Math.round(upload.progress() * 100)
//       //   return progress;
//       // }
//       $('#example1').progress({percent: Math.round(percent * 100)})
//
//       return Math.round(percent * 100);
//   }
// });
