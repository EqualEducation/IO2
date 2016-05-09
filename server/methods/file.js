Meteor.methods({
  renameFile: function(url, originalName, newName, key){
    console.log('renameFile')
    //1. setup AWS configuration
  if (Meteor.settings != undefined) {
    AWS.config.update({
      accessKeyId: Meteor.settings.AWSAccessKeyId,
      secretAccessKey: Meteor.settings.AWSSecretAccessKey
    })
  }  else {
    console.log("AWS settings missing")
  }

//2. Copy file
    copySource = Meteor.settings.S3Bucket + '/' + key;
    newKey = Meteor.settings.environment + '/' + newName;
    console.log(newKey);
    console.log(copySource);
    var s3 = new AWS.S3()
    var params = {
        Bucket: Meteor.settings.S3Bucket,
        Key: newKey,
        CopySource: copySource
    };

    s3.copyObject(params, function(err, data) {
      console.log('Copy object')

      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else  {
        //3. Remove old file
        var params = {
          Bucket: Meteor.settings.S3Bucket, /* required */
          Key: key /* required */
        };
        s3.deleteObject(params, function(err, data) {
          console.log('Deleted object')
          if (err){
             console.log(err, err.stack); // an error occurred
          }
          else  {
            return "did delete";
            console.log(data);           // successful response
          }
        });
        return "did make copy";
        console.log(data);           // successful response
      }
    });
  },
  // addFile: function(yourFile) {
  //   var s3 = new AWS.S3()
  //
  //   console.log(files)
  // },
  // cancelFile: function(fileId) {
  //
  // },
  // deleteFileWithKey: function(key) {
  //   console.log('deleteFileWithKey')
  //   var s3 = new AWS.S3()
  //   var params = {
  //       Bucket: Meteor.settings.S3Bucket,
  //       Key: key
  //   };
  //
  //   s3.getObject(params, Meteor.bindEnvironment(function (err, data) {
  //     console.log('AWS S3 ')
  //     console.log(err)
  //     console.log(data);
  //   }));
  // },
  storeUrlInDatabase: function( url, uniqueName, originalName, key ) {
    console.log('storeURLInDatabase')

      check( url, String );
      Modules.both.checkUrlValidity( url );

      try {
        return Files.insert({
          originalName: originalName,
          name: uniqueName,
          url: url,
          key: key,
          added: new Date()
        });
      } catch( exception ) {
        console.log('error storing url')
        return exception;
      }
    },
  retrieveFile: function(fileId) {
    console.log('retrieveFile')
    var s3 = new AWS.S3()
    var params = {
        Bucket: Meteor.settings.S3Bucket
    };

    s3.listObjects(params, Meteor.bindEnvironment(function (err, data) {
      console.log('AWS S3')
      console.log(err)
      console.log(data);
    }));
  },
})
