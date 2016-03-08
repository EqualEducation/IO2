Template.viewItemContent.events({
    'click #editItem': function (event) {
      var item=this;
      var itemKeywords=item.keywords;
      var itemDescription=item.description;
      $form=$('.ui.form');
      var keywords=itemKeywords;//.join()
      //Session.set('resourceDetailsID',item._id);
      $('.ui.editItem.modal')
        .modal({
          onDeny    : function(){
          return true;
          },
          onApprove : function() {
            var keywordsVar=$form.form('get value', 'keywords');
            var descriptionVar=$form.form('get value', 'description');
            var array=keywordsVar.split(',');
            var resourceDetailsID=Session.get('resourceDetailsID');
            Resources.update(item._id,{$set: {"keywords":array,"description":descriptionVar}});
            return true;
        }
        })
      .modal('show')
      ;
      $('.ui.form')
  .form({
    fields: {
      name: {
        identifier: 'keywords',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter keywords'
          }
        ]
      },
      skills: {
        identifier: 'description',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter description'
          }
        ]
      }
    }
  })
;
    }
    });
