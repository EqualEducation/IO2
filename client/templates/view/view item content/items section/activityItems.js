Template.activityItems.helpers({
  resource: function(resourceID) {
    var resource=Resources.findOne(resourceID);
    //linkedFile=Files.findOne();
    console.log("RESOURCE")
    console.log(resource)
    return resource;
    //return itemType.toLowerCase() + ".view";
  }
});
