Template.searchBar.events({
    "click #searchButton": function(event, template) {
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

    Session.set('searchText', text);
  }
})
