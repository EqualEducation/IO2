// Template.cre.onRendered(function() {
//   $('.createActivity.modal')
//       .modal({
//         onApprove : function() {
//                var form = $('#activityDetailsForm');
//                var topic =	form.form('get field', 'topic').val();
//                var allFields = form.form('get values')
//                console.log('SAVING');
//                console.log(allFields)
//
//                var newActivity = new Object();
//
//                console.log(allFields.keywords);
//                newActivity.details = allFields;
//                newActivity.fileIDs = Session.get('fileIDs');
//                Meteor.call("addItem", ItemTypeEnum.ACTIVITY, newActivity);
//                Session.set('fileIDs', null);
//                form.form('clear')
//               return true;
//             }
//            })
//          ;
// })


Template.uploadGuide.events({
	'change .uploadGuide': function (event, template) {
      uploadFileWithVariableName('guideID');
	},
})
