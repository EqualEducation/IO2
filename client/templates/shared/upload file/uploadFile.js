Template.uploadFile.events({
		'change .uploadFile': function (event, template) {
			console.log('upload file');
			uploadFileWithVariableName('fileIDs');
	},
})
