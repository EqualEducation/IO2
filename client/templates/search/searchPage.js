function decode(text) {
  var encoded = text;
  return decodeURIComponent(encoded.replace(/\+/g,  " "));
}


Template.searchPage.onCreated( function() {
  Session.set('selectedPageSize', 10);
  Session.set('selectedPageNumber', 1);

  if (this.currentTab === undefined) {
    this.currentTab = new ReactiveVar( "all" );
  }
});

Template.searchPage.onRendered(function(){
  $('.menu .item')
  .tab({
  });

  var searchText = Session.get('searchText');
  $('#searchBox').val(searchText);
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
    var pageSize = Session.get('selectedPageSize');
    var pageNumber = Session.get('selectedPageNumber');
    if (pageNumber === undefined) {
      Session.set('selectedPageNumber', 1);
      pageNumber = Session.get('selectedPageNumber');
    }


    Modules.both.searchItems({searchString: searchTerm, tab: currentTab, pageSize: pageSize, pageNumber: pageNumber}, function(err, data) {
      var numResults = data.searchResults.length;
      var totalNumResults = data.total;
      var numPages = Math.ceil(totalNumResults/pageSize);
      var firstVisible = parseInt(pageSize)*(pageNumber-1) + 1;
      var lastVisible = parseInt(pageSize)*(pageNumber-1) + parseInt(pageSize)
      if (lastVisible > totalNumResults) {
        lastVisible = totalNumResults;
      }
      console.log('NUM PAGES: ' + numPages)
      Session.set('isLoading', false)
      Session.set('tabData', {
                                contentType: currentTab,
                                numResults: numResults,
                                items: data.searchResults,
                                pageSize: pageSize,
                                pageNumber: pageNumber,
                                numPages: numPages,
                                total: totalNumResults,
                                firstVisible: firstVisible,
                                lastVisible: lastVisible
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
      Session.set('selectedPageNumber', 1);
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
