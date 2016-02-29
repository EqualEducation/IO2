Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', function () {
  this.render('searchPage');
});

Router.route('/search', function () {
  this.render('searchPage');
});

Router.route('/explore', function () {
  this.render('explore');
});

// Router.route('/create', function () {
//   this.render('create');
// });

Router.route('/create', {
  // The name of the route.
  // Used to reference the route in path helpers and to find a default template
  // for the route if none is provided in the "template" option. If no name is
  // provided, the router guesses a name based on the path '/post/:_id'
  name: 'create',
  // If the template name is different from the route name you can specify it
  // explicitly here.
  template: 'create',
  // a place to put your subscriptions
  subscriptions: function() {
    this.subscribe('keywords');
    this.subscribe('filmTypes');
    this.subscribe('mainTopics');
    this.subscribe('subTopics');
    this.subscribe('methods');
    this.subscribe('audiences');
    this.subscribe('materials');
  },
})
