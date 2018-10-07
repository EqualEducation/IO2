Template.viewItemHeader.onRendered(function() {
  $('.download.button')
  .popup({
    popup : $('.custom.popup')
  })
;
})

Template.viewItemHeader.events({
    'click #downloadPack' : function (event, template) {
      event.preventDefault()
      console.log("hello!")
      console.log(this.item)
      analytics.track("Download", {
          "ID": this.item._id,
          "Item Type": this.item.itemType,
          "Name" : this.item.details.title
      });
      var htmlString = html2docx.generate('#detailsTable', template.css, template.stylesheets)

        $('.ui.basic.downloadZip.modal')
          .modal('setting', 'closable', false)
          .modal('show')
        ;

       Meteor.call("createZipForDownload", this.item.itemType, this.item, htmlString, function(error, result){
           if(error){
             console.log(error)
               alert(error);
           }  else {
            window.open(result,'_blank');
          }
          $('.ui.basic.downloadZip.modal')
            .modal('hide')
          ;
      })
    }
  })
