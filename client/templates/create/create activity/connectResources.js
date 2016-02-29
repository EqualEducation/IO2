Template.connectBooks.helpers({
  'allBooks' : function() {
    var books = Resources.find({'type':'book'});
    return books;
  }
})
