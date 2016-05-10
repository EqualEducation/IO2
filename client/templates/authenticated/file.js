Template.file.helpers({
  isImage( url ) {
    const formats = [ 'jpg', 'jpeg', 'png', 'gif' ];
    return _.find( formats, ( format ) => url.indexOf( format ) > -1 );
  }
});

Template.file.events({
  'click .removeFileId' : function(event, template) {
    var idToRemove = this._id;
    var uploadedFileIds = Session.get('uploadedFileIds');
    uploadedFileIds = uploadedFileIds.filter(function(fileId) {
      return (fileId != idToRemove)
    })

    var removedFileIds = Session.get('removedFileIds');
    removedFileIds.push(idToRemove);

    Session.set('removedFileIds', removedFileIds);
    Session.set('uploadedFileIds', uploadedFileIds);
  }
})
