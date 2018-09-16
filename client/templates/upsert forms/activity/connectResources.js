Template.connectResources.onRendered(function() {
  $('.ui.fluid.multiple.search')
    .dropdown();
})

Template.registerHelper("allResourcesForType", function (type) {
  if (type != undefined) {
    var resources = Resources.find({'type': type},{sort: {"details.title": 1}});
    return resources;
  }
  var resources = Resources.find({});
  return resources;
});


Template.connectResources.helpers({
  'selectedResources' : function() {
    var resourceIds = this.resourceIds;
    var resources = [];
    resourceIds.forEach(function(resourceId) {
      var resource = Resources.findOne(resourceId);
      resources.push(resource);
    })

    return resources;
  }
})
