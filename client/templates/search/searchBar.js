Template.searchBar.events({
    "click #searchButton": function(event, template) {
      event.preventDefault();
      console.log('search');
      var text="";
      if(template.find("#searchBox")==undefined)
      {
          text = "";
      }
      else
      {
        var searchBox = template.find("#searchBox");
        text = $(searchBox).val().trim();
      }

      analytics.track("Search tapped", {
          "Search term": text
      });

    Session.set('searchText', text);
    var params = {'search_text': text};
    Router.go('search' , params);

  },
  'keypress input': function(event, template) {
    if (event.keyCode == 13) {
        event.stopPropagation();
        var text="";

        if(template.find("#searchBox")==undefined)
        {
            text = "";
        }
        else
        {
          var searchBox = template.find("#searchBox");
          text = $(searchBox).val().trim();
        }

        analytics.track("Search tapped", {
            "Search term": text
        });

      Session.set('searchText', text);
      var params = {'search_text': text};
      Router.go('search' , params);
      return false;
    }
}
})
