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

Router.route('/create', {
  // The name of the route.
  // Used to reference the route in path helpers and to find a default template
  // for the route if none is provided in the "template" option. If no name is
  // provided, the router guesses a name based on the path '/post/:_id'
  name: 'create',
  // If the template name is different from the route name you can specify it
  // explicitly here.
  template: 'create',
  //will only render template once subscription is finished
  waitOn: function() {
    return this.subscribe('options');
  },
})
