Template.content_book.onRendered(function () {
  $('.ui.search.dropdown')
    .dropdown()
  ;
});

Template.connectBooks.helpers({
  'allBooks' : function() {
    var books = Resources.find({'type':'book'});
    console.log("ALL BOOKS");
    console.log(books);
    return books;
  }
})