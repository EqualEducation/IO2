// let _uploadFileToAmazon = ( file ) => {
//   const uploader = new Slingshot.Upload( "uploadToAmazonS3" );
//
//   uploader.send( file, ( error, url ) => {
//     if ( error ) {
//       alert( error.message, "warning" );
//       _setPlaceholderText();
//     } else {
//       _addUrlToDatabase( url );
//     }
//   });
// };

// let _addUrlToDatabase = ( url ) => {
//   Meteor.call( "storeUrlInDatabase", url, ( error ) => {
//     if ( error ) {
//       alert( error.reason, "warning" );
//       _setPlaceholderText();
//     } else {
//       alert( "File uploaded to Amazon S3!", "success" );
//       _setPlaceholderText();
//     }
//   });
// };

// let upload = ( options ) => {
//   template = options.template;
//   let file = _getFileFromInput( options.event );
//
//   _setPlaceholderText( `Uploading ${file.name}...` );
//   _uploadFileToAmazon( file );
// };
//
// Modules.client.uploadToAmazonS3 = upload;
