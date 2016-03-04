function buildRegExp(searchText) {
  // this is a dumb implementation
  console.log('searching')
  var parts=[""];
  if (searchText===undefined)
  {}
  else
  {
    parts = searchText.trim().split(/[ \-]+/);
  }
  //define regExp with flags (case insensitive + global search)
  return new RegExp("(" + parts.join('|') + ")", "ig");
}


Template.searchPage.onCreated( function() {
  this.currentTab = new ReactiveVar( "all" );
});

Template.searchPage.onRendered(function(){
  $('.menu .item')
  .tab({
  });
  Session.set('searchText',"")
})

Template.searchPage.helpers({
tab: function() {
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
    var tab = Template.instance().currentTab.get();
    var data = {
       "all": [
       _.union(Resources.find(selector, options).fetch(),
       Activities.find(selector, options).fetch(),
       Curricula.find(selector, options).fetch()),
          // { "name": "Seeking Wisdom: From Darwin to Munger", "description": "Peter Bevelin" }
        ],
        "activities": [
          Activities.find(selector, options).fetch(),
        ],
        "curricula": [
          Curricula.find(selector, options).fetch(),
        ],
        "resources": [
        Resources.find(selector, options).fetch(),
          // fileDetails.find().fetch(),
        ],
        "allResources": [
        Resources.find(selector, options).fetch(),
          // fileDetails.find().fetch(),
        ],
        "book": [
        Resources.find({$and: [{type:"book"},selector]},options).fetch(),
          // fileDetails.find().fetch(),
        ],
        "film": [
        Resources.find({$and: [{type:"resource"},selector]},options).fetch(),
          // fileDetails.find().fetch(),
        ],
        "shortreading": [
        Resources.find({$and: [{type:"resource"},selector]},options).fetch(),
          // fileDetails.find().fetch(),
        ],
        "icebreaker": [
        Resources.find({$and: [{type:"resource"},selector]},options).fetch(),
          // fileDetails.find().fetch(),
        ],
        "other": [
        Resources.find({$and: [{type:"resource"},selector]},options).fetch(),
          // fileDetails.find().fetch(),
        ]
    };
    var numResults=(data[tab][0].length);
     return {contentType: tab, numResults: numResults,items: data[tab][0]};
  }

})


Template.searchPage.events({
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
    //USER CLICKS ON ITEM IN SEARCH RESULTS:
    'click #itemName': function (event) {
      var item=this;
      var itemKeywords=item.keywords;
      var itemDescription=item.description;
      $form=$('.ui.form');
      var keywords=itemKeywords;//.join()
      Session.set('resourceDetailsID',item._id);
      $('.ui.viewItem.modal')
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
    },


     'submit .keyword-form': function(event,template){
        event.preventDefault();
    }
    ,
     'submit .description-form': function(event,template){
        event.preventDefault();
    }
  });
