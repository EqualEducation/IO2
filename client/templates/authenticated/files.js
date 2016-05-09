Template.files.onCreated( () => Template.instance().subscribe( 'files' ) );

Template.files.helpers({
  files() {
    var fileIds = Session.get('uploadedFileIds');
    var files = Files.find( { "_id": { "$in": fileIds } }, { sort: { "added": -1 } } );
    console.log('show files')
    console.log(files.fetch())
    if ( files ) {
      return files;
    }
  }
});
