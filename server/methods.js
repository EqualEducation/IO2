Meteor.methods({
  addItem: function(itemType, item) {
    console.log("ADDING ITEM!");
    console.log(item);
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (itemType == undefined || itemType == null) {
      throw new Meteor.Error("Item type is required");
    }

    item.createdAt = new Date();
    item.owner = Meteor.userId();
    item.user_email = Meteor.user().emails[0];
    var id = item._id;
    var result;
    if (itemType == ItemTypeEnum.RESOURCE) {
      console.log("ADDING RESOURCE");
      item.itemType='Resource';
      result = Resources.upsert(id, item);
    } else if (itemType == ItemTypeEnum.ACTIVITY) {
      console.log("ADDING ACTIVITY");
      item.itemType='Activity';
      result = Activities.upsert(id, item);
      if (result.insertedId != null && result.insertedId != undefined) { id = result.insertedId }
      // Add result._id to each resource in item.resourceIds
      var linkedResources=item.resourceIds;
      for (var i=0;i<linkedResources.length;i++)
        Resources.update( {_id: linkedResources[i]}, { $addToSet: { 'activityIds':id} } );

    } else if (itemType == ItemTypeEnum.CURRICULUM) {
      console.log("ADDING CURRICULUM");
      item.itemType='Curriculum';
      result = Curricula.upsert(id, item);
      console.log(result);
      if (result.insertedId != null && result.insertedId != undefined) { id = result.insertedId }
      console.log(item);
      console.log('linked activity ids:');
      console.log(item.activityIds);
      //Add result._id to each activity in item.activityIds
      var linkedActivities=item.activityIds;
      for (var i=0;i<linkedActivities.length;i++)
        Activities.update( {_id: linkedActivities[i]}, { $addToSet: { 'curriculumIds':id} } );
    } else {
      throw new Meteor.Error("Item type not recognized");
    }
    // console.log(item);
    // console.log(result);
    return result;
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
  pullActivity: function (curriculumIds,activityId){
    for (var i=0;i<curriculumIds.length;i++)
            {
              Curricula.update({_id:curriculumIds[i]},{$pull:{'activityIds':activityId}});
            }
  },
  pullResource: function (activityIds,resourceId){
    for (var i=0;i<activityIds.length;i++)
            {
              Activities.update({_id:activityIds[i]},{$pull:{'resourceIds':resourceId}});
            }
  },
  // optionsUpsert: function(collection, data){
  //    Customers.upsert( id, doc );
  // },
  deleteItem: function (itemType,ItemId){
    console.log('deleting!');
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
