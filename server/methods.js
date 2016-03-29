Meteor.methods({
  addItem: function(itemType, item) {
    console.log("ADDING ITEM!");
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (itemType == undefined || itemType == null) {
      throw new Meteor.Error("Item type is required");
    }

    item.createdAt = new Date();
    item.owner = Meteor.userId();
    item.username = Meteor.user().username;
    var id = item._id;
    var newItemId;
    if (itemType == ItemTypeEnum.RESOURCE) {
      console.log("ADDING RESOURCE");
      item.itemType='Resource';
      newItemId = Resources.upsert(id, item);
    } else if (itemType == ItemTypeEnum.ACTIVITY) {
      console.log("ADDING ACTIVITY");
      item.itemType='Activity';
      newItemId = Activities.upsert(id, item);
    } else if (itemType == ItemTypeEnum.CURRICULUM) {
      console.log("ADDING CURRICULUM");
      item.itemType='Curriculum';
      newItemId = Curricula.upsert(id, item)
    } else {
      throw new Meteor.Error("Item type not recognized");
    }

    return newItemId;
  },
  addFile: function(yourFile) {
    console.log('adding file');
    console.log(yourFile);
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    // 		YourFileCollection.insert(yourFile, function (err, fileObj) {
    // 	console.log("callback for the insert, err: ", err);
    // 	if (!err) {
    // 		console.log("inserted without error",fileObj)
    // 		var name = yourFile.original.name;
    // 		var index=name.indexOf(".");
    // 		var nameTrunc=name.substring(0,index);
    // 		Session.set(sessionVariableName, fileObj._id)
    // 		fileDetails.insert({name:nameTrunc,fileId:fileObj._id,keywords:[],type:yourFile.original.type,description:null});
    // 		// fileSearch.cleanHistory();
    // 		// fileSearch.search("");
    // 		// Session.set('filesToReturn',fileSearch.getData());
    // 	}
      YourFileCollection.insert(yourFile, function(err, fileObj) {
        if (err) {
          throw new Meteor.Error(err);
        } else {
          return fileObj._id;
        }
       })
  },
  // optionsUpsert: function(collection, data){
  //    Customers.upsert( id, doc );
  // },
  deleteItem: function (itemType,ItemId){
  if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
  if (itemType == ItemTypeEnum.RESOURCE) {
      console.log("DELETING RESOURCE");
      newItemId = Resources.remove(ItemId);
    } else if (itemType == ItemTypeEnum.ACTIVITY) {
      console.log("DELETING ACTIVITY");
      newItemId = Activities.remove(ItemId);
    } else if (itemType == ItemTypeEnum.CURRICULUM) {
      console.log("DELETING CURRICULUM");
      newItemId = Curricula.remove(ItemId)
    } else {
      throw new Meteor.Error("Item type not recognized");
    }
  }
});
