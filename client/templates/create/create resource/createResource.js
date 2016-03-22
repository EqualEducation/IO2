// Template.create_resource.onRendered(function() {
//   //setting up chooseType modal
//   $('.chooseType.modal')
//     //present chooseType modal when "back" button clicked on resourceDetails modal
//     .modal('attach events', '.resourceDetails.modal #back')
//     //what to do when approve button pressed ("next")
//     .modal({
//        onApprove : function() {
//         var resourceType = $('input:radio[name=example2]:checked').val();
//         var modalName = '.'+resourceType+'.modal';
//         Session.set('activeModal', resourceType);
//        }
//     });
//
//   $('.resourceDetails.modal')
//     //present resourceDetails modal when "next" button clicked on chooseType modal
//     .modal('attach events', '.chooseType.modal #next')
//     //what to do when approve button pressed ("save")
//     .modal({
//        onApprove : function() {
        //  var form = $('#resourceDetailsForm');
        //   var topic =	form.form('get field', 'topic').val();
        //   var allFields = form.form('get values')
        //   console.log('SAVING');
        //   console.log(allFields);
        //
        //   var newResource = new Object();
        //
        //   newResource.type = Session.get('activeModal')
        //   var subTopic = allFields.subTopic;
        //   var keywords = allFields.keywords;
        //   var methods = allFields.methods;
        //   var materials = allFields.materials;
        //
        //   newResource.details = allFields;
        //   newResource.fileIDs = Session.get('fileIDs');
        //   Session.set('fileIDs', null);
        //   Meteor.call("addItem", ItemTypeEnum.RESOURCE, newResource);
        //   form.form('clear')
        // //  $('.ui.form').submit();
        //  //Return false as to not close modal dialog
        //  return true;
//        }
//       })
//     ;
// })


Template.create_resource_type.events({
  'click #save' : function(event, template) {
    var form = $('#resourceDetailsForm');
     var topic =	form.form('get field', 'topic').val();
     var allFields = form.form('get values')
     console.log('SAVING');
     console.log(allFields);

     var newResource = new Object();

     newResource.type = this.type
     var subTopic = allFields.subTopic;
     var keywords = allFields.keywords;
     var methods = allFields.methods;
     var materials = allFields.materials;

     newResource.details = allFields;
     newResource.fileIDs = Session.get('fileIDs');
     Session.set('fileIDs', null);
     Meteor.call("addItem", ItemTypeEnum.RESOURCE, newResource);
     form.form('clear')
   //  $('.ui.form').submit();
    //Return false as to not close modal dialog
    return true;
  }
})
Template.create_resource_type.helpers({
  content: function() {
		var ret = 'content_' + this.type
		return ret ;
  },
	header: function() {
		var ret = 'header_' + this.type
		return ret ;
	},
});
