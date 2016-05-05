Meteor.methods({
  renameFile: function(url, originalName, newName, key){
  if (Meteor.settings != undefined) {
    AWS.config.update({
      accessKeyId: Meteor.settings.AWSAccessKeyId,
      secretAccessKey: Meteor.settings.AWSSecretAccessKey
    })
  }  else {
    console.log("AWS settings missing")
  }

    oldKey = Meteor.settings.S3Bucket + '/' + key;
    newKey = Meteor.settings.environment + '/' + newName;
    console.log(newKey);
    console.log(oldKey);
    var s3 = new AWS.S3()
    var params = {
        Bucket: Meteor.settings.S3Bucket,
        Key: newKey,
        CopySource: oldKey
    };

    s3.copyObject(params, function(err, data) {
      console.log('Copy object')

      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else  {
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
            console.log(data);           // successful response
          }
        });
        console.log(data);           // successful response
      }
    });
  },
  addFile: function(yourFile) {
    var s3 = new AWS.S3()

    console.log(files)
  },
  cancelFile: function(fileId) {

  },
  deleteFileWithKey: function(key) {
    var s3 = new AWS.S3()
    var params = {
        Bucket: Meteor.settings.S3Bucket,
        Key: key
    };

    s3.getObject(params, Meteor.bindEnvironment(function (err, data) {
      console.log('AWS S3')
      console.log(err)
      console.log(data);
    }));
  },
  retrieveFile: function(fileId) {
    var s3 = new AWS.S3()

    console.log(s3);

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
