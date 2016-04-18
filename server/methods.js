// take a cfs file and return a base64 string
var getBase64Data = function(file, callback) {
  // callback has the form function (err, res) {}
  var readStream = file.createReadStream();
  var buffer = [];
  readStream.on('data', function(chunk) {
    buffer.push(chunk);
  });
  readStream.on('error', function(err) {
    console.log(err)
    callback(err, null);
  });
  readStream.on('end', function() {
    console.log('finished reading')
    var data = buffer.concat()[0].toString('base64');
    callback(null, data);
  });
};

var createZip = function(zip, callback) {
  console.log('creating zip');
  var date = Date.parse(new Date());
  var path = process.env["PWD"] + "/public/zips/";
  var fileLocation = path + date + '.zip'
  zip.saveAs(fileLocation, function(error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, fileLocation);
    }
  });
}

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
  zipFiles:function(fileIDs){

    //1. Create the zip object
    var zip = new JSZip();

    //2. setup synchronous versions of asynchronous methods. These synchronous methods will wait for their async versions to finish before moving on
    //Meteor.wrapAsync() wraps a function that takes a callback function as its final parameter.
    //e.g. Meteor.wrapSync(methodWithCallback)
    //call back will be in the form: function(error, result){}
    //http://docs.meteor.com/#/full/meteor_wrapasync
    var getBase64DataSync = Meteor.wrapAsync(getBase64Data);
    var createZipSync = Meteor.wrapAsync(createZip);

    // //3. Get the file object
    // // http://stackoverflow.com/questions/30991797/how-can-i-get-a-buffer-for-a-file-image-from-collectionfs
    // var file = YourFileCollection.findOne(files[0]._id);
    var files = YourFileCollection.find({_id: {$in:fileIDs}}).fetch()
    files.forEach(function(file) {
        console.log(file)

      //4. Convert file object into binary data
      //TODO: will need to be different for different MIME types
      var data = getBase64DataSync(file);

      //5. Add the binary data to the zip object and create a final zip at a location
      //Can add multiple blobs of data to the zip.
      zip.file(file.original.name, data, {base64: true});
      // zip.file('textfile.txt', 'Hello World');
    })

    //6. Create the final zip object;
    var locationOfZip = createZipSync(zip);

    //7. Return the file location of the zip (/public/zips/dateInMilliSecondsSince1970.zip)
    return locationOfZip;
  },
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
