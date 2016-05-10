Template.quotation.helpers({
  quotationObject: function(activistIndex) {
    var quotationObject = new Object();
    switch (activistIndex) {
      case 1:
        {
          quotationObject.imageName = "martinlutherkingjr.jpeg"
          quotationObject.quotation = "Freedom is never voluntarily given by the oppressor; it must be demanded by the oppressed."
          quotationObject.name = "Martin Luther King, Jr."
          break;
        }
      default:
      {
        quotationObject.imageName = "stevebiko.jpg"
        quotationObject.quotation = "The most potent weapon in the hands of the oppressor is the mind of the oppressed."
        quotationObject.name = "Steve Biko"
        break;
      }
    }
    return quotationObject;
  }
})
