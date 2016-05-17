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
  createZipForDownload:function(itemType, item, htmlString){
    //1. SETUP
    //1.1 configure AWS (if it hasn't already been configured)
    AWSConfig()

    //1.2 get sync functions ready
    var zip = new JSZip();
    var mainFolderName = item.details.title;

    //4. information document
    zip.folder(mainFolderName).file('info.docx', HTMLToData(htmlString), {base64: true});

    switch (itemType) {
      case ItemTypeEnum.RESOURCE:
        addResourceFilesToZip(item, zip, mainFolderName);
        break;
      case ItemTypeEnum.ACTIVITY:
        addActivityFilesToZip(item, zip, mainFolderName);
        break;
      case ItemTypeEnum.CURRICULUM:
        addCurriculumFilesToZip(item, zip, mainFolderName);
        break;
      default:
    }

    var generateZipSync = Meteor.wrapAsync(generateZip);
    var url = generateZipSync(itemType, zip)
    console.log(url)
    return url;
  },

})
