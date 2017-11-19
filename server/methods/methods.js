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
    console.log('*****')
    console.log(item);
    console.log('*****')
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
    console.log('Upserting item with ID: ' + id)
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
      //Add result._id to each activity in item.activityIds
      var linkedActivities=item.activitySlots;
      for (var i=0;i<linkedActivities.length;i++)
        Activities.update( {_id: linkedActivities[i].activityId}, { $addToSet: { 'curriculumIds':id} } );
    } else {
      throw new Meteor.Error("Item type not recognized");
    }

    console.log('------')
    console.log(result)
    console.log('------')
    return result;
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
  deleteFile: function(yourFile) {
    console.log('removing file');
    console.log(yourFile);
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
      Files.remove(yourFile, function(err, fileObj) {
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
  },
  sendEmail: function (to, from, subject, html) {
    console.log('sending email');

    check([to, from, subject, html], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    // Email.send({
    //   from: from,
    //   to: to,
    //   subject: subject,
    //   html: html
    // });

    Email.send({
      from: from,
      to: "IETU Team <IETUDB@gmail.com>, IETU Team <activities@equaleducation.org.za>",
      subject: subject,
      html: html
    });
  },
});
