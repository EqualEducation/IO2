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

//CREATE
Router.route('/create', function () {
  this.render('create');
});

Router.route('/create/:item_type', {
  name: 'createItem',
  action: function() {
    var template = 'create_' + this.params.item_type;
    this.render(template);
  }
});


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

//resources
Router.route('/resource/:_id', {
  name: 'resource.view',
  template: 'viewItem',
  path: '/resource/:_id',
  action: function () {
    // render all templates and regions for this route
    this.render();
  },
  data: function() {
      var resource =  Resources.findOne({_id: this.params._id});
      console.log(resource)
      return resource;
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

//curricula
Router.route('/curriculum/:_id', {
  name: 'curriculum.view',
  template: 'viewItem',
  path: '/curriculum/:_id',
  action: function () {
    // render all templates and regions for this route
    this.render();
  },
  data: function() {
      var curriculum =  Curricula.findOne({_id: this.params._id});
      console.log(curriculum)
      return curriculum;
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
