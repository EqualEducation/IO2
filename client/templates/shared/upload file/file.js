// uploadFileWithVariableName = function(sessionVariableName){
// 	// 	FS.Utility.eachFile(event, function (file) {
// 	// 	console.log("each file...");
// 	// 	var fsFile = new FS.File(file);
// 	// 	if(fsFile.original.size < (2097152)*10) {
// 	// 			console.log("Chunksize :" + FS.config.uploadChunkSize);
// 	//
// 	// 	    var chunkSize = fsFile.original.size / 10;
// 	// 	    FS.config.uploadChunkSize = chunkSize;
// 	// 	}
// 	//
// 	 	 Meteor.call("addFile",yourFile, function(fileObjId) {
//
// 		 })
// 	// 	// 	console.log('CALL BACK ON ADD FILE: ' + fileObjId);
// 	// 	// 	Session.set(sessionVariableName, fileObjId)
// 	// 	// });
// 	// 			Files.insert(fsFile, function (err, fileObj) {
// 	// 		console.log("callback for the insert, err: ", err);
// 	// 		if (!err) {
// 	// 			console.log("inserted without error",fileObj)
// 	// 			var name = fsFile.original.name;
// 	// 			var index=name.indexOf(".");
// 	// 			var nameTrunc=name.substring(0,index);
// 	// 			Session.set(sessionVariableName, fileObj._id)
// 	// 			//fileDetails.insert({name:nameTrunc,fileId:fileObj._id,keywords:[],type:yourFile.original.type,description:null});
// 	// 			// fileSearch.cleanHistory();
// 	// 			// fileSearch.search("");
// 	// 			// Session.set('filesToReturn',fileSearch.getData());
// 	// 		}
// 	// 		else {
// 	// 			console.log("there was an error", err);
// 	// 		}
// 	//
// 	// 	});
// 	// 	//
// 	// });
// };
