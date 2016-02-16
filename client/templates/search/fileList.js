function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts="";
  if (searchText===undefined)
  {}
  else
  {
    parts = searchText.trim().split(/[ \-]+/);
  }
  //define regExp with flags (case insensitive + global search)
  return new RegExp("(" + parts.join('|') + ")", "ig");
}


Template.fileList.onCreated( function() {
  this.currentTab = new ReactiveVar( "all" );
});

Template.fileList.onRendered(function(){
  $('.menu .item')
  .tab({
  });
  Session.set('searchText',"")
})
Template.fileList.helpers({
tab: function() {
  // console.log('tab');
  // console.log(Template.instance().currentTab.get());
    return Template.instance().currentTab.get();
  },
  tabData: function() {
    var text=Session.get('searchText');
    var options = {sort: {"details.title": 1}, limit: 20};
    var regExp = buildRegExp(text);
    var selector=selector={$or: [
      {"details.title": regExp},
      {"details.description": regExp},
      {"details.keywords": regExp}
    ]};
    var filteredData=(fileDetails.find(selector, options).fetch());
    // console.log(filteredData);
    var tab = Template.instance().currentTab.get();
    // console.log(tab);
    var data = {
       "all": [
       Resources.find(selector, options).fetch(),
          // { "name": "Seeking Wisdom: From Darwin to Munger", "description": "Peter Bevelin" }
        ],
        "activities": [
          Resources.find({$and: [{type:"activity"},selector]},options).fetch(),
        ],
        "readings": [
        Resources.find({$and: [{type:"shortReading"},selector]},options).fetch(),
        ],
        "curriculums": [
          Resources.find({$and: [{type:"curriculum"},selector]},options).fetch(),
        ],
        "books": [
        Resources.find({$and: [{type:"book"},selector]},options).fetch(),
          // fileDetails.find().fetch(),
        ],
        "films": [
          Resources.find({$and: [{type:"film"},selector]},options).fetch(),
        ],
        "other": [
        Resources.find({$and: [{type:"other"},selector]},options).fetch(),
        ]
    };
    // console.log(data[tab])
    // console.log(data[tab][0])
    var numResults=(data[tab][0].length);
     return {contentType: tab, numResults: numResults,items: data[tab][0]};
  }

})
Template.fileList.events({
    "keyup #search-box": _.throttle(function(e) {
      var text="";
      if($(e.target).val()==undefined)
      {
          text = "";
      }
      else
    { text = $(e.target).val().trim();
    }

    Session.set('searchText',text);
    // console.log(data[tab][0]);
  // fileSearch.search(text);
  // console.log(this.name)
    //if nothing is returned
  //   if(fileSearch.getData()==""){
  //     //compute fuzzy search (look for closest match)
  //     var tempCursor = fileDetails.find({}, { name: true ,description:true});
  //     var bestName = mostSimilarString(tempCursor, "name", text, -1, false);
  //     console.log('did you mean');
  //     var bestDescription = mostSimilarString(tempCursor, "description", text, -1, false);
  //     console.log(bestName+", "+bestDescription);
  //     fileSearch.cleanHistory();
  //     fileSearch.search(bestName+bestDescription);
  //   }
  //   else{
  //   console.log("FOUND");
  // }
  }, 200),

    'click .item': function(event,template){
      var currentTab=($( event.target ).attr("data-tab"));
      var currentTabStatus=$( event.target );
      currentTabStatus.addClass( "active" );
      $( ".menu a" ).not( currentTabStatus ).removeClass( "active" );
      template.currentTab.set(currentTab);
    },
    'click #resourceName': function (event) {
      //var fsId= this._id;
      //var resourceDetailsID=this._id;
      //console.log('click');
      var resource=this;
      //console.log(resource);
      //var fileDetailsID=fileDetails.findOne({fileId:fsId})._id;
      //var fileDetailsName=fileDetails.findOne({fileId:fsId}).name;
      var resourceKeywords=resource.keywords;
      //console.log(resourceKeywords)
      var resourceDescription=resource.description;
      //console.log(resourceDescription)
      //var description=fileDetailsDescription;
      $form=$('.ui.form');
      //$form.form('set value', 'description',description);
      //document.getElementById("description").value = description;
      var keywords=resourceKeywords;//.join()
      //document.getElementById("keywords").value = keywords;
      //$form.form('set value', 'keywords',keywords);
      //Session.set('resourceDetailsID',resourceDetailsID);
      Session.set('resourceDetailsID',resource._id);
      // Session.set('fileSearch',fileSearch.getData());
      $('.ui.resourceDetail.modal')
        .modal({
          onDeny    : function(){
          return true;
          },
          onApprove : function() {
            var keywordsVar=$form.form('get value', 'keywords');
            var descriptionVar=$form.form('get value', 'description');
            var array=keywordsVar.split(',');
            var resourceDetailsID=Session.get('resourceDetailsID');
            Resources.update(resource._id,{$set: {"keywords":array,"description":descriptionVar}});
            //fileDetails.update(fileDetailsID,{$set: {"keywords":array,"description":descriptionVar}});
            //Session.set('filesToReturn',fileSearch.getData());
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
    },



     'submit .keyword-form': function(event,template){
        event.preventDefault();
    }
    ,
     'submit .description-form': function(event,template){
        event.preventDefault();
    }
  });
