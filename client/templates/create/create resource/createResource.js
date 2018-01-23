Template.registerHelper('totalNumberOfResourceType', function(resourceType) {
	var numberOfItems = Resources.find({'type' : resourceType}).count();
	return numberOfItems;
});

Template.registerHelper('resourceName', function(resourceName) {
	if (resourceName == "Shortreading") {
		return "Short Reading"
	}
	return resourceName;
});
