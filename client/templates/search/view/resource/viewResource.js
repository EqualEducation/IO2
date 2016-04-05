Template.viewResource.helpers({
  associatedActivities: function(resourceID){
    var activities=Activities.find({"resourceIds":resourceID}).fetch();
    return activities;
  },
})
