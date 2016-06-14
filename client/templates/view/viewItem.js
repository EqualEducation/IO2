
Template.viewItem.onRendered(function() {
  $('.download.button')
  .popup({
    popup : $('.custom.popup')
  })
;
})

Template.registerHelper('listView', function(listItems) {
  var count=listItems.length;
  var returnList = "";
  listItems.forEach(function(item) {
    if (count > 1) {
      returnList = returnList + item + ", ";
    } else {
      returnList = returnList + item;
    }
    count--;
  })

  return returnList;
})


Template.registerHelper('convertDate', function(createdAtDate) {
  var d = new Date(createdAtDate);
  var year = d.getFullYear();

  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  var month = month[d.getMonth()];

  return month + ' ' + year;

})
// Template.viewItem.events({
//   'click #downloadPDF2': function (event) {
//     var doc = new jsPDF();

// // We'll make our own renderer to skip this editor
// var specialElementHandlers = {
//   '#editor': function(element, renderer){
//     return true;
//   }
// };

// // All units are in the set measurement for the document
// // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
// doc.fromHTML($('body').get(0), 15, 15, {
//   'width': 170,
//   'elementHandlers': specialElementHandlers
// });
// var pdf = new jsPDF('p','pt','a4');

// pdf.addHTML(document.body,function() {
//   var string = pdf.output('datauristring');
//   $('.preview-pane').attr('src', string);
// });
// pdf.save('Test.pdf');
//   }
// });

Template.viewItem.helpers({
  editURL: function(item) {
    var url;
    fileIDs=(this.fileIDs);
    switch (item.itemType) {
      case ItemTypeEnum.ACTIVITY:
        url = '\\edit\\activity\\' + item._id;
        break;
      case ItemTypeEnum.RESOURCE:
        url = '\\edit\\resource\\' + item.type + '\\' + item._id;
        break;
      case ItemTypeEnum.CURRICULUM:
        url = '\\edit\\curriculum\\' + item._id;
        break;
      default:
        break;
    }

    return url;
  }
})

Template.viewItem.events({
    'click #downloadPack' : function (event, template) {
      event.preventDefault()
      analytics.track("Download", {
          "ID": this._id,
          "Item Type": this.itemType,
          "Name" : this.details.title
      });
      var htmlString = html2docx.generate('#detailsTable', template.css, template.stylesheets)

        $('.ui.basic.downloadZip.modal')
          .modal('show')
        ;

       Meteor.call("createZipForDownload", this.itemType, this, htmlString, function(error, result){
           if(error){
               alert(error);
           }  else {
            console.log(result);
            window.open(result,'_blank');
            $('.ui.basic.downloadZip.modal')
              .modal('hide')
            ;
          }
      })
    },
    'click #deleteButton': function (event) {
      console.log("DELETE");
      itemID=(this._id);
      itemType=(this.itemType);
      activityIds=this.activityIds;
      curriculumIds=this.curriculumIds;
      linkedGuide=this.guideID;
      linkedFiles=this.fileIDs;
      console.log(this);
      console.log(this.curriculumIds);
      $('.ui.basic.test.modal')
        .modal({

          onDeny    : function(){
            return true;
          },
          onApprove : function() {
                  console.log('DELETING ITEM');
                  //REMOVE associated references
                  if (itemType=='Resource')
                  {
                    console.log('resource');
                    Meteor.call("pullResource", activityIds, itemID,function(error, result){
                      if(error){
                          console.log(error);
                      }  else {
                        console.log('Success');
                        console.log(result);
                      }
                    });
                    Meteor.call("deleteFile",linkedFiles,function(error, result){
                      if(error){
                          console.log(error);
                      }  else {
                        console.log('Success');
                        console.log(result);
                      }
                    });
                  }
                  if (itemType=='Activity')
                  {
                    console.log('activity');
                    Meteor.call("pullActivity", curriculumIds, itemID,function(error, result){
                      if(error){
                          console.log(error);
                      }  else {
                        console.log('Success');
                        console.log(result);
                      }});
                      Meteor.call("deleteFile",linkedGuide,function(error, result){
                      if(error){
                          console.log(error);
                      }  else {
                        console.log('Success');
                        console.log(result);
                      }
                    });
                  }
                  //delete the curriculum/activity/resource
                  Meteor.call("deleteItem",itemType,itemID,function(error, result){
                      if(error){
                          console.log(error);
                      }  else {
                        console.log('Success');
                        console.log(result);
                      }
                    });
                  window.location = "/search";
          }
        })
        .modal('show')
      ;
    }
    });
