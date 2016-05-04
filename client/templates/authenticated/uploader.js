var uploader = new ReactiveVar();

Template.uploader.events({
  'change input[type="file"]' ( event, template ) {
    uploader.set(new Slingshot.Upload("uploadToAmazonS3"));
    Modules.client.uploadToAmazonS3( { event: event, template: template, uploader: uploader.get() } );
  }
});


Template.progressBar.helpers({
  isUploading: function () {
      return Boolean(uploader.get());
  },

  progress: function () {
      var upload = uploader.get();
      if (upload)
          return Math.round(upload.progress() * 100);
  }
});
