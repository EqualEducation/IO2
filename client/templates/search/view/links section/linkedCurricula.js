Template.linkedCurricula.helpers({
  associatedCurricula: function(activityID){
    var curricula=Curricula.find({"activityIds":activityID}).fetch();
    return curricula;
  }
})
