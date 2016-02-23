Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', function () {
  this.render('fileList');
});

Router.route('/search', function () {
  this.render('fileList');
});

Router.route('/explore', function () {
  this.render('explore');
});

Router.route('/create', function () {
  this.render('create');
});



//
// Router.route('/items/:_id', function () {
//   var item = Items.findOne({_id: this.params._id});
//   this.render('ShowItem', {data: item});
// });
//
// Router.route('/files/:filename', function () {
//   this.response.end('hi from the server\n');
// }, {where: 'server'});
//
// Router.route('/restful', {where: 'server'})
//   .get(function () {
//     this.response.end('get request\n');
//   })
//   .post(function () {
//     this.response.end('post request\n');
//   });
