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
  createResourceZip:function(resource){
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

      var resourceName = resource.details.title;
      var folderName = resourceName;

      //2.2 iterate over files
      var resourceFileIDs = resource.fileIDs;
      if (resourceFileIDs.constructor !== Array ) {
        resourceFileIDs = [resourceFileIDs];
      }
      var files = Files.find({_id: {$in:resourceFileIDs}});


      files.forEach(function(file) {
        var AWSFile =  getAWSFileObjectSync(file.key);
        // var data = getBase64DataSync(AWSFile)
        console.log('Created data for key: ' + file.key)
        zip.folder(folderName).file(file.originalName, AWSFile.body, {base64: true});
      })

    var url = createZipSync('resource',zip)
    console.log(url)
    return url;
  },
  createActivityZip:function(htmlString, activity){
    console.log(htmlString);
    console.log(activity);

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
    console.log(JSZip.support)
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
      var resourceFileIDs = resource.fileIDs;
      if (resourceFileIDs.constructor !== Array ) {
        resourceFileIDs = [resourceFileIDs];
      }
      var files = Files.find({_id: {$in:resourceFileIDs}});


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

    //4. information document

    zip.folder(activityName).file('info.docx', HTMLToData(htmlString), {base64: true});


    // zip.generate({type:"base64"}), location.href="data:application/zip;base64," + base64;


    var url = createZipSync('activity',zip)
    console.log(url)
    return url;
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
var getBase64Data = function(file, callback) {
  // callback has the form function (err, res) {}
  var readStream = file.createReadStream();
  var buffer = [];
  readStream.on('data', function(chunk) {
    buffer.push(chunk);
  });
  readStream.on('error', function(err) {
    console.log(err)
    callback(err, null);
  });
  readStream.on('end', function() {
    console.log('finished reading')
    var data = buffer.concat()[0].toString('base64');
    callback(null, data);
  });
};

var createZip = function(itemType, zip, callback) {
  console.log('creating zip');
  var date = Date.parse(new Date());
  var content = zip.generate({
      type: 'nodebuffer'
  });

  var newKey = Meteor.settings.environment + '/zips/' + itemType + '_'+ date + '.zip';

  var s3 = new AWS.S3()

  var params = {
      Bucket: Meteor.settings.S3Bucket,
      Key: newKey,
      Body: content
  };
  s3.putObject(params, function(err, data) {
      if (err) {
          console.log('upload zip to s3 err',err, err.stack); // an error occurred
      } else {
          console.log(data); // successful response
      }
      var url = 'https://s3.amazonaws.com/' + Meteor.settings.S3Bucket + '/' + newKey;
      callback(err, url)
  });
}


function HTMLToData(htmlString) {
  var byteNumbers = new Uint8Array(htmlString.length);
  for (var i = 0; i < htmlString.length; i++) {
    byteNumbers[i] = htmlString.charCodeAt(i);
  }
  return byteNumbers;

}

var getBase64Data = function(readStream, callback) {
  // callback has the form function (err, res) {}
  // var readStream = file.createReadStream();
  var buffer = [];
  readStream.on('data', function(chunk) {
    buffer.push(chunk);
  });
  readStream.on('error', function(err) {
    console.log(err)
    callback(err, null);
  });
  readStream.on('end', function() {
    console.log('finished reading')
    var data = buffer.concat()[0].toString('base64');
    callback(null, data);
  });
}



generateStyle = function () {
  // Concatenate all CSS rules into a big string
  var style = '';
  _.each(document.styleSheets, function (sheet) {
	try {
	  _.each(sheet.cssRules, function (rule) {
	    style += rule.cssText;
	  });
	}
	catch (err) {
	  console.log('Some CSS not included due to cross domain security issues.');
	}
  });
  return style;
}
