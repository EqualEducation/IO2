var uploader = new ReactiveVar();

Template.uploader.events({
  'change input[type="file"]' ( event, template ) {
    uploader.set(new Slingshot.Upload("uploadToAmazonS3"));
    Modules.client.uploadToAmazonS3( { event: event, template: template, uploader: uploader.get() } );
  }
});

Template.uploader.helpers({
  'uploader':function() {
    console.log('SDFSDFDSFSDF')
    var upload = uploader.get();
    // var file = upload.file
    return upload;
  }
})

Template.progressBar.onRendered(function() {
  $('#example1').progress('increment')
})

Template.progressBar.helpers({
  isUploading: function () {
      return Boolean(uploader.get());
  },
  progress: function (percent) {
      // var upload = uploader.get();
      // console.log(upload);
      // if (upload) {
      //   var progress = Math.round(upload.progress() * 100)
      //   return progress;
      // }
      $('#example1').progress({percent: Math.round(percent * 100)})

      return Math.round(percent * 100);
  }
});
