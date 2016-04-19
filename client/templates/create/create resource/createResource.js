// Template.create_resource_type.onRendered( function() {
// 	$('#resourceDetailsForm')
//   .form({
// 		onFailure(formErrors, fields)	{
// 			event.preventDefault();
// 			console.log(formErrors);
// 			return false;
// 		},
// 		onSuccess : function(event, fields){
// 			event.preventDefault();
//       	var form = $('#resourceDetailsForm');
//        var topic =	form.form('get field', 'topic').val();
//        var allFields = form.form('get values')
//        var newResource = new Object();
// 			 var type = Router.current().data().type;
//        newResource.type = type
//        newResource.details = allFields;
//        newResource.fileIDs = Session.get('fileIDs');
// 			 console.log("inserting file IDs");
// 			 console.log(newResource.fileIDs);
//        Meteor.call("addItem", ItemTypeEnum.RESOURCE, newResource, function(error, result){
//          if(error){
//              alert(error);
//          }  else {
//  					console.log('Success');
//  					console.log(result)
//  				}
//
//  				Session.set('fileIDs', null);
//  				Router.go('/resource/' + result.insertedId);
//  				return false;
//      });
//     },
// 		on: 'submit',
//     fields: {
//       title     : {
// 			 identifier  : 'title',
// 			 rules: [
// 				 {
// 					 type   : 'empty',
// 					 prompt : 'Title is required'
// 				 }
// 			 ]
// 		 },
//       mainTopic   : {
// 			 identifier  : 'mainTopic',
// 			 rules: [
// 				 {
// 					 type   : 'empty',
// 					 prompt : 'Main topic is required'
// 				 }
// 			 ]
// 		 },
//       subTopic : {
// 			 identifier  : 'subTopic',
// 			 rules: [
// 				 {
// 					 type   : 'empty',
// 					 prompt : 'Sub topic is required'
// 				 }
// 			 ]
// 		 },
// 			description: {
//         identifier: 'description',
//         rules: [
//           {
//             type   : 'empty',
//             prompt : 'Please enter a description'
//           },
//           {
//             type   : 'minLength[1]',
//             prompt : 'Your description must be at least {ruleValue} characters'
//           }
//         ]
//       },
// 			keywords: {
// 			 identifier  : 'keywords',
// 			 rules: [
// 				 {
// 					 type   : 'minCount[1]',
// 					 prompt : 'At least {ruleValue} keyword is required'
// 				 },
// 			 ]
// 		 },
//       audience   : {
// 			 identifier  : 'audience',
// 			 rules: [
// 				 {
// 					 type   : 'empty',
// 					 prompt : 'Audience is required'
// 				 }
// 			 ]
// 		 },
// 			materialsNeeded: {
// 			 identifier  : 'materialsNeeded',
// 			 rules: [
// 				 {
// 					 type   : 'checked',
// 					 prompt : 'You must choose if materials are needed'
// 				 }
// 			 ]
// 		 }
//     }
//   })
// })
//
//
// Template.create_resource_type.helpers({
//   content: function() {
// 		var ret = 'content_' + this.type
// 		return ret ;
//   },
// 	header: function() {
// 		var ret = 'header_' + this.type
// 		return ret ;
// 	},
// });

Template.registerHelper('totalNumberOfResourceType', function(resourceType) {
	var numberOfItems = Resources.find({'type' : resourceType}).count();
	return numberOfItems;
});
