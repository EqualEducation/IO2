// Template.createCurriculum.onRendered(function() {
//   $('.createCurriculum.modal')
//       .modal({
//          onApprove : function() {
//                 var form = $('#curriculumDetailsForm');
//                 var topic =	form.form('get field', 'topic').val();
//                 var allFields = form.form('get values')
//                 console.log('SAVING');
//                 console.log(allFields)
//
//                 var newCurriculum = new Object();
//
//                 console.log(allFields.keywords);
//                 newCurriculum.details = allFields;
//                 newCurriculum.fileIDs = Session.get('fileIDs');
//                 Meteor.call("addItem", ItemTypeEnum.CURRICULUM, newCurriculum);
//                 Session.set('fileIDs', null);
//                 form.form('clear')
//                return true;
//              }
//             })
//           ;
// })

Template.content_curriculum.onRendered(function () {

});
