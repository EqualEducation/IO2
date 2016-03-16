Template.createActivity.onRendered(function() {
  $('.createActivity.modal')
      .modal({
        onApprove : function() {
               var form = $('#activityDetailsForm');
               var topic =	form.form('get field', 'topic').val();
               var allFields = form.form('get values')
               console.log('SAVING');
               console.log(allFields)

               var newCurriculum = new Object();

               console.log(allFields.keywords);
               newCurriculum.details = allFields;
               newCurriculum.fileIDs = Session.get('fileIDs');
               Meteor.call("addActivity", newCurriculum);
               Session.set('fileIDs', null);
               form.form('clear')
              return true;
            }
           })
         ;
})


Template.uploadGuide.events({
	'change .uploadGuide': function (event, template) {
      uploadFileWithVariableName('guideID');
	},
})
