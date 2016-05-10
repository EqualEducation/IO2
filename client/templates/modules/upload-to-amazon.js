let _addFileDetailsToDatabase = (uploader, url, uniqueName, originalName, key) => {
  // console.log("ADD FILES TO DB: " + uploader.file.originalName)

  Meteor.call( "storeUrlInDatabase", url, uniqueName, originalName, key,( error, result ) => {
    if ( error ) {
      uploader.file.status = "999_error"
      Session.set('fileStatus', uploader.file.status);
      console.log(error)
    } else {
      var uploadedFileIds = Session.get('uploadedFileIds')
      if (uploadedFileIds == undefined) {
        uploadedFileIds = [];
      } else if (uploadedFileIds.constructor !== Array) {
        uploadedFileIds = [uploadedFileIds];
      }
      uploadedFileIds.push(result);
      Session.set('uploadedFileIds', uploadedFileIds)

      var filesToUpload = Session.get('upload_files');
      console.log('initial objects count: ' + filesToUpload.length)
      filesToUpload = filesToUpload.filter(function (object) {
          return object.uploader.file.uniqueName != uniqueName;
      });
      console.log('final objects count: ' + filesToUpload.length)
      Session.set('upload_files', filesToUpload);
      filesToUpload = Session.get('upload_files');
      console.log('reinitialized objects count: ' + filesToUpload.length)

      uploader.file.status = "3_addedToDatabase"
      Session.set('fileStatus', uploader.file.status);
    }
  });
};

let _renameFile = (uploader, url, file) => {
  // console.log("RENAME FILE: " + uploader.file.originalName)
  var object = uploader.instructions.postData.filter(function ( obj ) {
      if (obj.name === "key"){
        return obj.value
      }
  })[0];

  let key = object.value;

  Meteor.call( "renameFile", url, file.originalName, file.uniqueName, key, ( error, response ) => {
    if ( error ) {
      uploader.file.status = "999_error"
      Session.set('fileStatus', uploader.file.status);
      console.log(error)
    } else {
      var i = url.lastIndexOf('/');
      if (i != -1) {
          url = url.substr(0, i) + "/" + file.uniqueName;
      }

      var j = key.lastIndexOf('/');
      if (j != -1) {
          key = key.substr(0, j) + "/" + file.uniqueName;
      }

      uploader.file.status = "2_renamedOnAmazon"
      Session.set('fileStatus', uploader.file.status);
      _addFileDetailsToDatabase(uploader, url, file.uniqueName, file.originalName, key, file);
    }
  });
};

let _uploadFileToAmazon = (uploader, file ) => {
  file.status = "0_pending"
  Session.set('fileStatus', file.status);

  uploader.send( file, ( error, url ) => {
    if ( error ) {
      uploader.file.status = "999_error"
      Session.set('fileStatus', uploader.file.status);
      console.log(error)
    } else {
      uploader.file.status = "1_uploadedToAmazon"
      Session.set('fileStatus', uploader.file.status);
      _renameFile(uploader, url, file);
    }
  });
};

let _uniqueId = () => {
  return Math.random().toString(36).substr(2, 16);
};

let upload = ( options ) => {
  let uploader = options.uploader;
  let file = options.file;

  let originalFileName = file.name;
  let uniqueId = _uniqueId();
  let uniqueFileName = uniqueId + '_' + originalFileName;
  file.uniqueName = uniqueFileName;
  file.originalName = originalFileName;

  console.log(options);

  // let file = _getFileFromInput( options.event );

  _uploadFileToAmazon(uploader, file );
};

Modules.client.uploadToAmazonS3 = upload;
