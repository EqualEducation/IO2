let template;
var uploader;

// let _getFileFromInput = ( event ) => event.target.files[0];

let _setPlaceholderText = ( string = "Click or Drag a File Here to Upload" ) => {
  // template.find( ".alert span" ).innerText = string;
};

let _addUrlToDatabase = ( url ) => {
  Meteor.call( "storeUrlInDatabase", url, ( error ) => {
    if ( error ) {
      alert( error.reason, "warning" );
      _setPlaceholderText();
    } else {
      alert( "File uploaded to Amazon S3!", "success" );
      _setPlaceholderText();
    }
  });
};

let _uploadFileToAmazon = ( file ) => {
  // const uploader = new Slingshot.Upload( "uploadToAmazonS3" );

  uploader.send( file, ( error, url ) => {
    if ( error ) {
      alert( error.message, "warning" );
      _setPlaceholderText();
    } else {
      _addUrlToDatabase( url, file.originalName );
    }
  });
};

let _uniqueId = () => {
  return Math.random().toString(36).substr(2, 16);
};

let upload = ( options ) => {
  uploader  = options.uploader;
  template = options.template;
  let file = options.file;
  let originalFileName = file.name;
  let uniqueId = _uniqueId();
  let uniqueFileName = uniqueId + '_' + originalFileName;
  file.uniqueName = uniqueFileName;
  file.originalName = originalFileName;
  console.log(file);

  // let file = _getFileFromInput( options.event );

  _setPlaceholderText( `Uploading ${file.name}...` );
  _uploadFileToAmazon( file );
};

Modules.client.uploadToAmazonS3 = upload;
