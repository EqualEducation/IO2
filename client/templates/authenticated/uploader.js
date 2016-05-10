
Template.uploader.onRendered(function() {
  console.log('rendered uploader')
  Session.set('uploadProgress', 0);
  Session.set('upload_files', []);
  Session.set('progress_array', []);
  Session.set('fileStatus');
  Session.set('uploadedFileIds', []);
  Session.set('removedFileIds', []);
})

  Template.uploadFiles.helpers({
    upload_files: function(){
        return Session.get('upload_files');
    }
  });

  Template.progressBar.helpers({
    updateProgressBar: function (index, percent) {
      $('#progress_' + index).progress({percent: percent});
    }
  });


  Template.uploader.events({
    'change #upload-btn': function (event, template) {

      //Session var for holding overall progress
      Session.set('uploadProgress', 0);
      //Session var for holding objects containing url and progress
      //for each image we upload
      Session.set('upload_files', []);

      //var files = event.target.files;
      var files = file = $('#upload-btn').get(0).files;

      //Check that there is a file or more to be processed
      if (files.length>0){

        var total_files = files.length;

        //start an upload
        var count = 0;
        var uploads = _.map(files, function (file) {
            var uploader = new Slingshot.Upload("uploadToAmazonS3");
            Modules.client.uploadToAmazonS3( { file: file, template: template, uploader: uploader, index: count} );
            count++;
            return uploader;
        });

        // Create a tracker to iterate our array of uploaders and
        // return information to store in our Session variable
        var uploadTracker = Tracker.autorun(function (computation) {
            var change = Session.get('fileStatus');

            // Rest our variables here
            var files_array = [];
            var progress_array = [];
            var overall_progress = 0;

            // iterate with underscore over our uploaders and push details to array
            _.each(uploads, function(a_uploader){
                var status = a_uploader.file.status;
                var prog = a_uploader.progress();
                if (!isNaN(prog)){
                  prog = Math.round(prog*100);
                  if (prog > 30) {
                    prog = 30;
                  }
                  if (status == "1_uploadedToAmazon") {
                    prog = 60;
                  }
                  else if (status == "2_renamedOnAmazon") {
                    prog = 90;
                  }
                  else if (status == "3_addedToDatabase") {
                    prog = 100;
                  } else if (status == "999_error") {
                    prog = 0;
                  }
                }
                else{
                    prog = 0;
                }

                var file_details = {
                    uploader: a_uploader,
                    name: a_uploader.file.name,
                    url: a_uploader.url(true),
                    progress: prog
                };
                if (status != "3_addedToDatabase") {
                  files_array.push(file_details);
                  if (!isNaN(prog)){
                    progress_array.push(prog);
                  } else {
                    progress_array.push(0);
                  }
                  overall_progress = overall_progress+prog;
                }
                //Update the overall progress
            });

            overall_progress = overall_progress/total_files;

            //Set our Session var array of image details
            Session.set('upload_files', files_array);
            Session.set('progress_array', progress_array);

            if (!isNaN(overall_progress)){
              Session.set('uploadProgress', Math.round(overall_progress));
            }
            // if(overall_progress==100){
            //     computation.stop();
            // }
            return;
        });

      }//end if
    }
  });
