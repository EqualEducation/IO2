Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', function () {
  this.render('searchPage');
});

//***************************************************************************
//********************************* SEARCH **********************************
//***************************************************************************

Router.route('/search', {
  name: 'search',
  template: 'searchPage',
  waitOn: function() {
    return [this.subscribe('fileUploads'),
            this.subscribe('fileMeta'),
            this.subscribe('resources-searchpage-data'),
            this.subscribe('activities-searchpage-data'),
            this.subscribe('curricula-searchpage-data')];
  }
});

//***************************************************************************
//********************************* EXPLORE *********************************
//***************************************************************************


Router.route('/explore', function () {
  this.render('explore');
});

//***************************************************************************
//********************************* CREATE **********************************
//***************************************************************************

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

Router.route('/create/resource/:resource_type', {
  action: function() {
    this.render('create_resource_type');
  },
  data: function() {
    var data = new Object();
    data.type = this.params.resource_type;
    data.pageTitle =  data.type.substr(0, 1).toUpperCase() + data.type.substr(1);
    return data;
  }
});


//***************************************************************************
//********************************* ACTIVITY ********************************
//***************************************************************************

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

Router.route('/activity/edit/:_id', {
  name: 'activity.edit',
  action: function () {
    this.render('editActivity');
  },
  data: function() {
      var activity =  Activities.findOne({_id: this.params._id});
      return activity;
  },
  waitOn: function() {
    return [this.subscribe('fileUploads'),
            this.subscribe('fileMeta'),
            this.subscribe('resources'),
            this.subscribe('activities'),
            this.subscribe('curricula')];
  }
});
//***************************************************************************
//********************************* RESOURCE ********************************
//***************************************************************************

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
            this.subscribe('fileMeta')];
  }
});

Router.route('/resource/edit/:_id', {
  name: 'resource.edit',
  action: function () {
    this.render('edit_resource_type');
  },
  data: function() {
      var resoure =  Resources.findOne({_id: this.params._id});
      return resource;
  },
  waitOn: function() {
    return [this.subscribe('fileUploads'),
            this.subscribe('fileMeta'),
            this.subscribe('resources'),
            this.subscribe('activities'),
            this.subscribe('curricula')];
  }
});

//***************************************************************************
//******************************* CURRICULUM ********************************
//***************************************************************************

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

Router.route('/curriculum/edit/:_id', {
  name: 'curriculum.edit',
  action: function () {
    this.render('editCurriculum');
  },
  data: function() {
      var resoure =  Curricula.findOne({_id: this.params._id});
      return resource;
  },
  waitOn: function() {
    return [this.subscribe('fileUploads'),
            this.subscribe('fileMeta'),
            this.subscribe('resources'),
            this.subscribe('activities'),
            this.subscribe('curricula')];
  }
});
