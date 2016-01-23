Template.activityDetail.helpers({
  activity: function() {
    var file=fileDetails.findOne({_id:Session.get('fileDetailsID')});
    return file
  }
})
