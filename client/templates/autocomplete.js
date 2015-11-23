
Template.autocomplete.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.subscribe("files");
  this.subscribe("fileMeta");
  Keywords = new Mongo.Collection(null);

});

Template.autocomplete.onRendered(function () {
var keywords = [];
//console.log(fileDetails.find().fetch())
_.each(fileDetails.find().fetch(), function(k){
 
   _.each(k.keywords, function(kw) {
      keywords.push(kw);
  });

});

var data = _.map(_.countBy(keywords), function(value, key){
    return {
        keyword: key,
        count: value
    };
});

_.each(data,function(k){
  Keywords.insert({keyword:k.keyword, count: k.count});
});

console.log(Keywords.find().fetch());
});
Template.autocomplete.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [

        {
          //token: '!',
          collection: Keywords,
          field: "keyword",
          options: '',
          matchAll: true,
          //filter: { type: "autocomplete" }
          template: Template.userPill
        }
      ]
    };
  }
});