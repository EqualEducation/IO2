Template.create.onRendered(function(){
	//initialising forms
	$('.content.ui.form').form();
})

Template.registerHelper('totalNumberOfItems', function(itemType) {
	var numberOfItems = 0;
	var singleItemType;
	var multipleItemTypes;
	switch (itemType) {
		case ItemTypeEnum.ACTIVITY:
			numberOfItems = Activities.find().count()
			singleItemType = "Activity";
			multipleItemTypes = "Activities";
			break;
		case ItemTypeEnum.RESOURCE:
			numberOfItems = Resources.find().count()
			singleItemType = "Resource";
			multipleItemTypes = "Resources";
			break;
		case ItemTypeEnum.CURRICULUM:
			numberOfItems = Curricula.find().count()
			singleItemType = "Curriculum";
			multipleItemTypes = "Curricula";
			break;
		default:
			break;
	}
	if (numberOfItems == 1) {
		return "1 " + singleItemType;
	}
	return numberOfItems + " " + multipleItemTypes;
});
