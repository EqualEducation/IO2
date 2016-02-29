Template.content_film.onRendered(function () {
  $('.film.ui.dropdown')
    .dropdown()
  ;
});

Template.content_film.helpers({
  'filmTypes' : function() {
    // var books = Resources.find({'type':'book'});
    // console.log("ALL BOOKS");
    // console.log(books);
    // return books;
  }
})
