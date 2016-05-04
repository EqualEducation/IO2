Template.uploadFile.onRendered(function() {
	S3.collection.remove({});
})

Template.uploadFile.events({
	"click button.upload": function(event, template){
		event.preventDefault();
		var files = $("input.file_bag")[0].files

		S3.upload({
				files:files,
				path:"files"
			},function(e,r){
				console.log(r);
				if (e == undefined) {
					if (this.fileType == 'guide') {
						uploadFileWithVariableName('guideID');
					} else {
						uploadFileWithVariableName('fileIDs');
					}
				}
		});
	},
	"click button.delete": function(event, template){
		event.preventDefault();
		var file = this;
		S3.delete(file.relative_url,function(e,r){
			if (e == undefined){
				S3.collection.remove(file._id);
			}
			console.log(r);
		})
	},
	"click button.cancel": function(event, template){
		event.preventDefault();
		var file = this;
		S3.collection.remove(file._id);
	}
})

Template.uploadFile.helpers({
	"files": function(){
		return S3.collection.find();
	},
	"initializeBarAtIndex" : function(index, progress) {
		$('#progressBar_' + index).progress({
  			percent: progress
			});
	}
})
