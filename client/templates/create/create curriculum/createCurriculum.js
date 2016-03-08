Tempalte.createCurriculum.onRenderd(function() {
  $('.createCurriculum.modal')
  .modal({
     onApprove : function() {
           var form = $('#curriculumDetailsForm');
            var topic =	form.form('get field', 'topic').val();
            var allFields = form.form('get values')
            console.log(allFields)

            var newCurriculum = new Object();
            var keywords = allFields.keywords;
            var array=keywords.split(',');
            allFields.keywords = array;

            console.log(allFields.keywords);
            newCurriculum.details = allFields;
            newCurriculum.fileIDs = Session.get('fileIDs');
            Meteor.call("addCurriculum", newCurriculum);
            form.form('clear')
          //  $('.ui.form').submit();
           //Return false as to not close modal dialog
           return true;
         }
        })
      ;
})

Template.content_curriculum.onRendered(function () {

});
