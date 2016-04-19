Template.uploadFile.events({
	'click #removeFile': function (event) {
		console.log('remove file!');
		$('.ui.basic.change.modal')
				.modal({
					onDeny    : function(){
						return true;
					},
					onApprove: function(){
						Session.set('fileIDs',null);
						return true;
					}
				})
				.modal('show')
	},
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

Template.uploadFile.helpers({
	getFileNames: function(fileType){
		var fileIDs;
		if (fileType == 'guide') {
			fileIDs = Session.get('guideID')
		} else {
			fileIDs = Session.get('fileIDs')
		}
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
