Router.configure({
  layoutTemplate: 'main',
  loadingTemplate: 'loading'
});

Router.route('/', function () {
  // name:'home',
  // template:'searchBar',
  this.render('landingPage');
  //this.render('searchPage');
});

//***************************************************************************
//********************************* SEARCH **********************************
//***************************************************************************

Router.route('/search', {
  name: 'search',
  template: 'searchPage',
  waitOn: function() {
    return [this.subscribe('fileUploads'),
            this.subscribe('resources-searchpage-data'),
            this.subscribe('activities-searchpage-data'),
            this.subscribe('curricula-searchpage-data')];
  }
});

Router.route('/search/:search_text', {
  name: 'searchText',
  action: function() {
    var template = 'searchPage';
    this.render(template);
  },
  waitOn: function() {
    return [this.subscribe('fileUploads'),
            this.subscribe('resources-searchpage-data'),
            this.subscribe('activities-searchpage-data'),
            this.subscribe('curricula-searchpage-data')];
  }
});

//***************************************************************************
//********************************* EXPLORE *********************************
//***************************************************************************


Router.route('/explore', {
    name: 'explore',
  template: 'explore',
  waitOn: function() {
    return [this.subscribe('activities-explore-data')];
  }
});

//***************************************************************************
//********************************* CREATE **********************************
//***************************************************************************

Router.route('/create', {
  action: function() {
    var template = 'create';
    this.render(template);
  },
  waitOn: function() {
    return [
            this.subscribe('resources-createpage-count'),
            this.subscribe('activities-createpage-count'),
            this.subscribe('curricula-createpage-count')];
  }
});




Router.route('/create/:item_type', {
  name: 'createItem',
  action: function() {
    var template = 'create_' + this.params.item_type;
    this.render(template);
  },
  waitOn: function() {
    if (this.params.item_type == ItemTypeEnum.RESOURCE.toLowerCase()) {
      return [this.subscribe('options'),
              this.subscribe('resources-createpage-count')];
    }

    if (this.params.item_type == ItemTypeEnum.ACTIVITY.toLowerCase()) {
      return [this.subscribe('options'),
              this.subscribe('all-resources')];
    }

    if (this.params.item_type == ItemTypeEnum.CURRICULUM.toLowerCase()) {
      return [this.subscribe('options'),
              this.subscribe('all-activities')];
    }
    return [this.subscribe('options')];

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
  },
  waitOn: function() {
    return [this.subscribe('options')];
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
    return [
            this.subscribe('options'),
            this.subscribe('fileUploads'),
            this.subscribe('all-resources'),
            this.subscribe('all-activities'),
            this.subscribe('all-curricula')];
  }
});

Router.route('/edit/activity/:_id', {
  name: 'activity.edit',
  action: function () {
    this.render('editActivity');
  },
  data: function() {
      var activity =  Activities.findOne({_id: this.params._id});
      return activity;
  },
  waitOn: function() {
    return [
            this.subscribe('options'),
            this.subscribe('fileUploads'),
            this.subscribe('all-resources'),
            this.subscribe('all-activities'),
            this.subscribe('all-curricula')];
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
    return [
            this.subscribe('options'),
            this.subscribe('fileUploads'),
            this.subscribe('all-resources'),
            this.subscribe('all-activities'),
            this.subscribe('all-curricula')];
  }
});

Router.route('/edit/resource/:resource_type/:_id', {
  name: 'resource.edit',
  action: function () {
    this.render('edit_resource_type');
  },
  data: function() {
      var resource =  Resources.findOne({_id: this.params._id});
      return resource;
  },
  waitOn: function() {
    return [
            this.subscribe('options'),
            this.subscribe('fileUploads'),
            this.subscribe('all-resources'),
            this.subscribe('all-activities'),
            this.subscribe('all-curricula')];
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
    return [
            this.subscribe('options'),
            this.subscribe('fileUploads'),
            this.subscribe('all-resources'),
            this.subscribe('all-activities'),
            this.subscribe('all-curricula')];
  }
});

Router.route('/edit/curriculum/:_id', {
  name: 'curriculum.edit',
  action: function () {
    this.render('editCurriculum');
  },
  data: function() {
      var curriculum =  Curricula.findOne({_id: this.params._id});
      return curriculum;
  },
  waitOn: function() {
    return [
            this.subscribe('options'),
            this.subscribe('fileUploads'),
            this.subscribe('all-resources'),
            this.subscribe('all-activities'),
            this.subscribe('all-curricula')];
  }
});
