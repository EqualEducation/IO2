Template.content_video.onRendered(function () {
  $('.video.ui.dropdown')
    .dropdown()
  ;
});

Template.content_video.helpers({
  'videoTypes' : function() {
    // var books = Resources.find({'type':'book'});
    // console.log("ALL BOOKS");
    // console.log(books);
    // return books;
  }
})
