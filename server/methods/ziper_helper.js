AWSConfig = function() {
  if (Meteor.settings != undefined) {
    AWS.config.update({
      accessKeyId: Meteor.settings.AWSAccessKeyId,
      secretAccessKey: Meteor.settings.AWSSecretAccessKey
    })
  }  else {
    console.log("AWS settings missing")
  }
}

HTMLToData = function(htmlString) {
  var byteNumbers = new Uint8Array(htmlString.length);
  for (var i = 0; i < htmlString.length; i++) {
    byteNumbers[i] = htmlString.charCodeAt(i);
  }
  return byteNumbers;
}

//RESOURCES
addResourceFilesToZip = function(resource, zip, folderName) {
  var getAWSFileObjectSync = Meteor.wrapAsync(getAWSFileObject);

  //2.1 The resource name will be the subfolder in the final zip file
  //e.g zip.folder("nested").file("hello.txt", "Hello World\n");
  var resourceName = resource.details.title;

  //2.2 iterate over files
  var resourceFileIDs = resource.fileIDs;
  if (resourceFileIDs == undefined) {
    return;
  }
  if (resourceFileIDs.constructor !== Array ) {
    resourceFileIDs = [resourceFileIDs];
  }
  var files = Files.find({_id: {$in:resourceFileIDs}}).fetch();
  files.forEach(function(file) {
    var AWSFile =  getAWSFileObjectSync(file.key);
    console.log('Created data for key: ' + file.key)
    zip.folder(folderName).file(file.originalName, AWSFile.Body, {base64: true});
  })
}

addActivityFilesToZip = function(activity, zip, mainFolderName) {
  var getAWSFileObjectSync = Meteor.wrapAsync(getAWSFileObject);

    //1.4 Initialize the rest of objects needed
    var resourceIDs = activity.resourceIds

    if (resourceIDs == undefined) {
      return;
    }

    var resources = Resources.find({_id: {$in:resourceIDs}}).fetch()

    //2. iterate over reosources
    resources.forEach(function(resource) {
      var resourceFolderName = mainFolderName + '/Resources/' + resource.details.title
      addResourceFilesToZip(resource, zip, resourceFolderName);
    })


    /////
    var guideID = activity.guideID;
    console.log('GUIDE ID: ' + guideID)

    if (guideID == undefined) {
      return;
    }
    var guide = Files.findOne({_id: guideID});

    if (guide == undefined) {
      return;
    }
    var AWSFile =  getAWSFileObjectSync(guide.key);
    console.log('Created data for guide key: ' + guide.key)
    zip.folder(mainFolderName).file(guide.originalName, AWSFile.Body, {base64: true});
}

addCurriculumFilesToZip = function(curriculum, zip, mainFolderName) {
  var getAWSFileObjectSync = Meteor.wrapAsync(getAWSFileObject);
      var slots = curriculum.activitySlots;

      slots.forEach(function(slot) {
        var activity = Activities.findOne({_id: slot.activityId})
        var activityFolderName = mainFolderName + '/Activities/(' + slot.index + ') ' + activity.details.title
        addActivityFilesToZip(activity, zip, activityFolderName);
      })


      //2.2 iterate over files
      var fileIDs = curriculum.fileIDs;
      if (fileIDs == undefined) {
        return;
      }
      if (fileIDs.constructor !== Array ) {
        fileIDs = [fileIDs];
      }
      var files = Files.find({_id: {$in:fileIDs}});
      files.forEach(function(file) {
        var AWSFile =  getAWSFileObjectSync(file.key);
        console.log('Created data for key: ' + file.key)
        zip.folder(mainFolderName).file(file.originalName, AWSFile.Body, {base64: true});
      })
}


generateZip = function(itemType, zip, callback) {
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

getAWSFileObject = function(key, callback) {

    var s3 = new AWS.S3()
    var params = {
        Bucket: Meteor.settings.S3Bucket,
        Key: key
    };

    s3.getObject(params, function(err, data) {
      callback(err, data)
    });
  }
