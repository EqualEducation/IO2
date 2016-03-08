
Template.createActivity.onRendered(function() {
  $('.createActivityModal.modal')
      .modal({
         onApprove : function() {
               var form = $('#activityDetailsForm');
                var topic =	form.form('get field', 'topic').val();
                var allFields = form.form('get values');
                console.log('SAVING');
                console.log(allFields);

                var newActivity = new Object();
                // var keywords = allFields.keywords;
                // var array=keywords.split(',');
                // allFields.keywords = array;

                // console.log(allFields.keywords);
                newActivity.details = allFields;
                newActivity.fileIDs = Session.get('fileIDs');
                newActivity.guideID = Session.get('guideID');
                Session.set('fileIDs', null);
                Session.set('guideID', null);
                Meteor.call("addActivity", newActivity);
                form.form('clear')
              //  $('.ui.form').submit();
               //Return false as to not close modal dialog
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
