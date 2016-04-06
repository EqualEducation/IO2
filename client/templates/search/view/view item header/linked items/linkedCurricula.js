Template.linkedCurricula.onRendered(function() {
  $('.ui.dropdown.linked')
    .dropdown({
      action: 'hide'
    });
})

Template.linkedCurricula.helpers({
  associatedCurricula: function(activityID){
    var curricula=Curricula.find({"activityIds":activityID}).fetch();
    return curricula;
  },
  hasLinkedCurricula: function(curricula) {
    if (curricula != undefined) {
      return curricula.length > 0;
    }

    return false;
  },
  numberOfLinkedCurricula: function(curricula) {
    if (curricula == undefined) {
      return 'Something went wrong';
    }

    if (curricula.length > 1) {
      return curricula.length + " curricula use this activity"
    } else {
      return curricula.length + " curriculum uses this activity"
    }
  }
})
