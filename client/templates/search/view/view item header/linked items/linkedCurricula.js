Template.linkedCurricula.onRendered(function() {
  $('.ui.dropdown.linked')
    .dropdown({
      action: 'hide'
    });
})

Template.linkedCurricula.helpers({
  associatedCurriculum: function(curriculumId){
    var curriculum=Curricula.findOne(curriculumId);
    return curriculum;
  },
  hasLinkedCurricula: function(curriculumIds) {
    if (curriculumIds != undefined) {
      return curriculumIds.length > 0;
    }

    return false;
  },
  numberOfLinkedCurricula: function(curriculumIds) {
    if (curriculumIds == undefined) {
      return 'Something went wrong';
    }

    if (curriculumIds.length > 1) {
      return curriculumIds.length + " curricula use this activity"
    } else {
      return curriculumIds.length + " curriculum uses this activity"
    }
  }
})
