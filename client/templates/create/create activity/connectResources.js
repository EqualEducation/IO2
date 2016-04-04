Template.connectResources.onRendered(function() {
  $('.ui.fluid.multiple.search')
    .dropdown();
})

Template.registerHelper("allResourcesForType", function (type) {
  if (type != undefined) {
    var resources = Resources.find({'type': type});
    return resources;
  }

  var resources = Resources.find({});
  return resources;
});
