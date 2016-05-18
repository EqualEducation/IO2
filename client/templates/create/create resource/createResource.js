Template.registerHelper('totalNumberOfResourceType', function(resourceType) {
	var numberOfItems = Resources.find({'type' : resourceType}).count();
	return numberOfItems;
});
