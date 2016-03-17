Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', function () {
  this.render('searchPage');
});

Router.route('/search', {
  name: 'search',
  template: 'searchPage',
  waitOn: function() {
      // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    return [this.subscribe('fileUploads'),
            this.subscribe('fileMeta'),
            this.subscribe('resources'),
            this.subscribe('activities'),
            this.subscribe('curricula')];
  }
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
    return [this.subscribe('fileUploads'),
            this.subscribe('fileMeta'),
            this.subscribe('resources'),
            this.subscribe('options')];
  },
})

//activities
Router.route('/activity/:_id', {
  name: 'activity.view',
  template: 'viewItem',
  path: '/activity/:_id',
  action: function () {
    // render all templates and regions for this route
    this.render();
  },
  data: function() {
      var activity =  Activities.findOne({_id: this.params._id});
      console.log(activity)
      return activity;
  },
  waitOn: function() {
      // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    return [this.subscribe('fileUploads'),
            this.subscribe('fileMeta'),
            this.subscribe('resources'),
            this.subscribe('activities'),
            this.subscribe('curricula')];
  }
});
