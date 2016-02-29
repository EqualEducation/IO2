Template.registerHelper("allResourcesForType", function (type) {
  var resources = Resources.find({'type': type});
  return resources;
});

Template.connectBooks.onRendered(function() {
  $('.connectResources.ui.dropdown')
    .dropdown();
})
