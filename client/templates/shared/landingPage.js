Template.landingPage.events({
    'submit .landingSearch':function(event) {
    // Prevent default browser form submit
    console.log('pressed Submit');
    event.preventDefault();
    var searchText=$('#search-box').val();
    var encodedText=encode(searchText)
    var URL=('\\search\\'+encodedText);
    window.location = URL;
  }
    });



function encode(text) {
  var unencoded = text;
  return encodeURIComponent(unencoded).replace(/'/g,"%27").replace(/"/g,"%22");
}
