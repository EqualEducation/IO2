function decode(text) {
  var encoded = text;
  return decodeURIComponent(encoded.replace(/\+/g,  " "));
}


Template.searchPage.onCreated( function() {
  this.currentTab = new ReactiveVar( "all" );
//
});

Template.searchPage.onRendered(function(){
  $('.menu .item')
  .tab({
  });
  var url=window.location.href;
  var urlArray=url.split('/');
  var searchText=urlArray[urlArray.length-1];
  //console.log(searchText);
  if (searchText=="search")
  {
    console.log('search page');
    Session.set('searchText',"");
  }
  else
  {
    //console.log('search string:');
    var searchText=decode(searchText);
    Session.set('searchText',searchText)
    //console.log(searchText);
    // $('#search-box').val(searchText);
    // $("#search-box").keyup();
  }
})

Template.searchPage.helpers({
  isResource: function() {
    var tab = Template.instance().currentTab.get();
    if (tab != "activities" && tab != "curricula" && tab != "all") {
      return true;
    }
    return false;
  },
  tab: function() {
    var tab = Template.instance().currentTab.get();
    return tab;
  },
  tabData: function() {
    Session.set('isLoading', true)
    var currentTab = Template.instance().currentTab.get();
    var searchTerm = Session.get("searchText");
    var pageSize = 10;
    var pageNumber = 1;
    Modules.both.searchItems({searchString: searchTerm, tab: currentTab, pageSize: pageSize, pageNumber: pageNumber}, function(err, data) {
      var numResults = data.searchResults.length;
      var totalNumResults = data.total;
      console.log('NUM RESULTS: ' + numResults)
      console.log('TOTAL: ' + totalNumResults)

      Session.set('isLoading', false)
      Session.set('tabData', {
                                contentType: currentTab,
                                numResults: numResults,
                                items: data.searchResults,
                                pageSize: pageSize,
                                pageNumber: pageNumber,
                                total: totalNumResults
                              })
    });
  }

})

Template.searchPage.events({
    'click .item': function(event,template){
      var currentTab=($( event.target ).attr("data-tab"));
      var currentTabStatus=$( event.target );
      currentTabStatus.addClass( "active" );
      $( ".menu a" ).not( currentTabStatus ).removeClass( "active" );
      template.currentTab.set(currentTab);
    },
    //USER CLICKS ON ITEM IN SEARCH RESULTS:
    'click #itemName': function (event) {
      var item = this;
    },
     'submit .keyword-form': function(event,template){
        event.preventDefault();
    }
    ,
     'submit .description-form': function(event,template){
        event.preventDefault();
    }
  });
