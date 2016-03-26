Template.landingPage.events({
    'click #searchButton': function (event) {
      var searchText=$('#search-box').val();
      var URL=('\\search\\'+searchText);
      window.location = URL;
    }
    });

