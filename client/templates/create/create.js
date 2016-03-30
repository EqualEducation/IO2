Template.create.onRendered(function(){
	//initialising forms
	$('.content.ui.form').form();
})

Template.registerHelper('totalNumberOfItems', function(resourceType) {
	var numberOfItems = 0;
	var singleResourceType;
	var multipleResourceTypes;
	switch (resourceType) {
		case ItemTypeEnum.ACTIVITY:
			numberOfItems = Activities.find().count()
			singleResourceType = "Activity";
			multipleResourceTypes = "Activities";
			break;
		case ItemTypeEnum.RESOURCE:
			numberOfItems = Resources.find().count()
			singleResourceType = "Resource";
			multipleResourceTypes = "Resources";
			break;
		case ItemTypeEnum.CURRICULUM:
			numberOfItems = Curricula.find().count()
			singleResourceType = "Curriculum";
			multipleResourceTypes = "Curricula";
			break;
		default:
			break;
	}



	if (numberOfItems == 1) {
		return "1 " + singleResourceType;
	}

	return numberOfItems + " " + multipleResourceTypes;

});
// Template.create.events({
// 'click #createCurriculumButton': function(event, template) {
// 	$('.createCurriculum.modal')
// 	.modal('show')
// 	;
// },
// 'click #createActivityButton': function(event, template) {
// 	$('.createActivity.modal')
// 			.modal('show')
// 			;
// },
// 	'click #createResourceButton': function(event, template) {
// 		$('#chooseTypeForm').form('reset');
// 		$('.chooseType.modal')
// 			.modal('show');
// 	},
// })
