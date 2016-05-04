Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 1 * 1024 * 1024
});
Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  bucket: Meteor.settings.S3Bucket,
  acl: "public-read",
  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },
  key: function ( file ) {
    // var user = Meteor.users.findOne( this.userId );
    var folder = Meteor.settings.environment;
    return folder + "/" + file.name;
  }
});
