Template.registerHelper("allResourcesForType", function (type) {
  if (type != undefined) {
    var resources = Resources.find({'type': type});
    return resources;
  }

  var resources = Resources.find({});
  return resources;
});

Template.connectBooks.onRendered(function() {
  $('.connectResources.ui.dropdown')
    .dropdown();
})

Template.connectResources.onRendered(function() {
  $('.ui.fluid.multiple.search')
    .dropdown();
})
