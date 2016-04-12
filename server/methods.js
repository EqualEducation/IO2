// take a cfs file and return a base64 string
var getBase64Data = function(file, zip, callback) {
  // callback has the form function (err, res) {}
  var readStream = file.createReadStream();
  var buffer = [];
  readStream.on('data', function(chunk) {
    buffer.push(chunk);
  });
  readStream.on('error', function(err) {
    console.log('error')
    callback(err, null);
  });
  readStream.on('end', function() {
    console.log('finished reading')
    console.log('zipping')
    var data = buffer.concat()[0].toString('base64');
    zip.file(file.original.name, data, {base64: true});

    var date = new Date();
    var path = process.env["PWD"] + "/public/";
    var downloadURL = 'test.zip'
    zip.saveAs(path + downloadURL, function(error, result) {
      if (error) {
        callback(err, null);
      } else {
        var downloadURL = 'test' + '.zip'
        callback(null, '/'+downloadURL);
        // callback(null, buffer.concat()[0].toString('base64'), downloadURL);
      }
    });
  });
};

function updateOptions(optionType, itemOptions) {
  var doc = Options.findOne();
  var existingOptions = doc[optionType];
  console.log(existingOptions);
  if (existingOptions != undefined && itemOptions != undefined) {
    itemOptions.forEach(function(option) {
      if (existingOptions.indexOf(option) == -1) {
        existingOptions.push(option);
      }
    });
  } else {
    existingOptions = itemOptions;
  }

  doc[optionType] = existingOptions;
  Options.upsert(doc._id, doc)
}

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

    updateOptions("keywords", item.details.keywords)
    updateOptions("source", item.details.source)

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
    return result;
  },
  zipFiles:function(files){
    console.log(files)
    var zip=new JSZip();
    var getBase64DataSync = Meteor.wrapAsync(getBase64Data);

    // files.forEach(function(f) {
      // wrap it to make it sync

      // get the base64 string
      // http://stackoverflow.com/questions/30991797/how-can-i-get-a-buffer-for-a-file-image-from-collectionfs
      var f = YourFileCollection.findOne(files[0]._id);
      console.log(f.original.name)
      // var file = new FS.File(f);
      var downloadURL = getBase64DataSync(f, zip);
      return downloadURL;

  },
  addFile: function(yourFile) {
    console.log('adding file');
    console.log(yourFile);
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
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
  deleteFile: function(yourFile) {
    console.log('removing file');
    console.log(yourFile);
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
      YourFileCollection.remove(yourFile, function(err, fileObj) {
        if (err) {
          throw new Meteor.Error(err);
        } else {
          return fileObj._id;
        }
       })
  },
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
