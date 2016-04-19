Template.uploadFile.events({
		'change .uploadFile': function (event, template) {
			console.log('upload file');
			console.log(this.fileType)
			if (this.fileType == 'guide') {
				uploadFileWithVariableName('guideID');
			} else {
				uploadFileWithVariableName('fileIDs');
			}
	},
})

Template.uploadFile.onRendered(function() {

})

Template.uploadFile.helpers({
	getFileNames: function(fileIDs){
    return YourFileCollection.findOne(fileIDs);
  },
  noAssociatedFiles: function(fileIDs){
    if (fileIDs==undefined) {
			return true;
		}
    else {
			Session.set('fileIDs',fileIDs);
			return false;
		}
  },
})
