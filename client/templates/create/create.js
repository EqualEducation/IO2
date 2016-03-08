Template.create.onRendered(function(){
	//initialising forms
	$('.content.ui.form').form();
})

Template.create.events({
'click #createCurriculumButton': function(event, template) {
	$('.createCurriculum.modal')
	.modal('show')
	;
},
'click #createActivityButton': function(event, template) {
	$('.createActivityModal.modal')
			.modal('show')
			;
},
	'click #createResourceButton': function(event, template) {
		$('#chooseTypeForm').form('reset');
		$('.chooseType.modal')
			.modal('show');
	},
})
