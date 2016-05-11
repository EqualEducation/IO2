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
  retrieveFile: function() {
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
  deleteFiles: function(files) {

    console.log("##################")
    console.log('deleteFileWithKey')
    console.log("##################")

    var ids = files.map(function(file) {
      return file._id;
    })

    var keys = files.map(function(file) {
      return {Key: file.key};
    })

    var s3 = new AWS.S3()
    var params = {
        Bucket: Meteor.settings.S3Bucket,
        Delete: { /* required */
          Objects: keys,
          Quiet: true
        }
    };

    s3.deleteObjects(params, Meteor.bindEnvironment(function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else {
        Files.remove({'_id': { $in: ids }})
        console.log(data);
      }           // successful response
    }));
  },
  createActivityZip:function(activity){

    //1. SETUP
    //1.1 configure AWS (if it hasn't already been configured)
    if (Meteor.settings != undefined) {
      AWS.config.update({
        accessKeyId: Meteor.settings.AWSAccessKeyId,
        secretAccessKey: Meteor.settings.AWSSecretAccessKey
      })
    }  else {
      console.log("AWS settings missing")
    }

    //1.2 get sync functions ready
    // var getBase64DataSync = Meteor.wrapAsync(getBase64Data);
    var createZipSync = Meteor.wrapAsync(createZip);
    var getAWSFileObjectSync = Meteor.wrapAsync(getAWSFileObject);

    //1.3 Create the zip object
    var zip = new JSZip();

    //1.4 Initialize the rest of objects needed
    var resourceIDs = activity.resourceIds
    var resources = Resources.find({_id: {$in:resourceIDs}}).fetch()
    var activityName = activity.details.title;
    //2. iterate over reosources
    resources.forEach(function(resource) {
      //2.1 The resource name will be the subfolder in the final zip file
      //e.g zip.folder("nested").file("hello.txt", "Hello World\n");
      var resourceName = resource.details.title;
      var folderName = activityName + '/resources/' + resourceName
      //2.2 iterate over files
      var files = Files.find({_id: {$in:resource.fileIDs}});
      files.forEach(function(file) {
        var AWSFile =  getAWSFileObjectSync(file.key);
        // var data = getBase64DataSync(AWSFile)
        console.log('Created data for key: ' + file.key)
        zip.folder(folderName).file(file.originalName, AWSFile.body, {base64: true});
      })
    })

    //3. add the activity guide
    var guide = Files.findOne({_id: activity.guideID});
    var AWSGuide = getAWSFileObjectSync(guide.key)
    zip.folder(activityName).file(guide.originalName, AWSGuide.body, {base64: true});

    var locationOfZip = createZipSync(zip)
    console.log('LOCATION OF ZIP:')
    console.log(locationOfZip)

    //1. Get files from AWS

    // var files = Files.find({_id: {$in:fileIDs}}).fetch()
    // files.forEach(function(file) {
    //     console.log(file)
    //
    //   //4. Convert file object into binary data
    //   // TODO: will need to be different for different MIME types
    //   var data = getBase64DataSync(file);
    //
    //   //5. Add the binary data to the zip object and create a final zip at a location
    //   //Can add multiple blobs of data to the zip.
    //   zip.file(file.original.name, data, {base64: true});
    //   // zip.file('textfile.txt', 'Hello World');
    // })
    //
    // //6. Create the final zip object;
    // var locationOfZip = createZipSync(zip);
    //
    // //7. Return the file location of the zip (/public/zips/dateInMilliSecondsSince1970.zip)
    // return locationOfZip;
  }
})

var getAWSFileObject = function(key, callback) {

  var s3 = new AWS.S3()
  var params = {
      Bucket: Meteor.settings.S3Bucket,
      Key: key
  };

  s3.getObject(params, function(err, data) {
    callback(err, data)
  });
}
// take a cfs file and return a base64 string
// var getBase64Data = function(file, callback) {
//   // callback has the form function (err, res) {}
//   var readStream = file.createReadStream();
//   var buffer = [];
//   readStream.on('data', function(chunk) {
//     buffer.push(chunk);
//   });
//   readStream.on('error', function(err) {
//     console.log(err)
//     callback(err, null);
//   });
//   readStream.on('end', function() {
//     console.log('finished reading')
//     var data = buffer.concat()[0].toString('base64');
//     callback(null, data);
//   });
// };

var createZip = function(zip, callback) {
  console.log('creating zip');
  var date = Date.parse(new Date());
  var path = process.env["PWD"] + "/public/zips/";
  var fileLocation = path + date + '.zip'
  zip.saveAs(fileLocation, function(error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, fileLocation);
    }
  });
}
