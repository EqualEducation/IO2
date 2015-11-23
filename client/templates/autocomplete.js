Template.autocomplete.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.subscribe("files");
  this.subscribe("fileMeta");
});

var keywords = [];
console.log(fileDetails.find().fetch())
_.each(fileDetails.find().fetch(), function(k){
 
   _.each(k.keywords, function(kw) {
      keywords.push(kw);
      console.log(kw);
  });

});
console.log(keywords)
var distinctKeywords = _.unique(keywords);
console.log(distinctKeywords);
Template.autocomplete.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [

        {
          token: '!',
          collection: fileDetails,
          field: "keywords",
          options: '',
          matchAll: true,
          //filter: { type: "autocomplete" },
          template: Template.dataPiece
        }
      ]
    };
  }
});