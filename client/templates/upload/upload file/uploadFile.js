Template.uploadFile.events({
	'change .your-upload-class': function (event, template) {
		console.log("uploading...")
		FS.Utility.eachFile(event, function (file) {

			console.log("each file...");
			var yourFile = new FS.File(file);
			YourFileCollection.insert(yourFile, function (err, fileObj) {
				console.log("callback for the insert, err: ", err);
				if (!err) {
					console.log("inserted without error",fileObj)
					var name = yourFile.original.name;
					var index=name.indexOf(".");
					var nameTrunc=name.substring(0,index);
					Session.set('fileIDs', fileObj._id)
					fileDetails.insert({name:nameTrunc,fileId:fileObj._id,keywords:[],type:yourFile.original.type,description:null});
					fileSearch.cleanHistory();
					fileSearch.search("");
					Session.set('filesToReturn',fileSearch.getData());
				}
				else {
					console.log("there was an error", err);
				}

			});
			//
		});
	},
})
