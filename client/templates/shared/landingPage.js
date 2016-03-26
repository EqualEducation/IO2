Template.landingPage.events({
    'click #searchButton': function (event) {
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
function decode() {
  var obj = document.getElementById('dencoder');
  var encoded = obj.value;
  obj.value = decodeURIComponent(encoded.replace(/\+/g,  " "));
}
