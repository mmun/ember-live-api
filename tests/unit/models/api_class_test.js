import ApiClass from 'appkit/models/api_class';

var sampleClass = 'Ember.ControllerMixin',
    sampleDataUrl = '', 
    apiStore, apiClass;

if (typeof __karma__ !== 'undefined')
  sampleDataUrl = '/base';

sampleDataUrl = sampleDataUrl + '/tests/support/api.json';

module("Unit - ApiClass", {
  setup: function(){
    stop();

    Ember.$.getJSON(sampleDataUrl)
    .then(function(data){
      var classinfo = data.classes[sampleClass];

      classinfo.classitems = data['classitems'].filterBy('class',sampleClass);
      
      apiClass   = ApiClass.create({data: classinfo});
      return true;
    })
    .then(start);
  }
});

test("it exists", function(){
  ok(apiClass);
  ok(apiClass instanceof ApiClass);

});

test("it knows about the classes methods", function(){
  var methods = apiClass.get('methods');

  ok(methods instanceof Array, 'methods is an array');
  ok(methods.length > 0, 'expected methods to contain items');

  expect(methods.length + 2);

  methods.forEach(function(method){
    equal(method.itemtype, 'method');
  });
});

test("it can access the classes properties", function(){
  var properties = apiClass.get('properties');

  ok(properties instanceof Array, 'properties is an array');
  ok(properties.length > 0, 'expected properties to contain items');

  expect(properties.length + 2);

  properties.forEach(function(property){
    equal(property.itemtype, 'property');
  });
});


test("it can access the its properties", function(){
  equal(apiClass.get('name'), 'Ember.ControllerMixin');
  equal(apiClass.get('shortname'), 'Ember.ControllerMixin');
  equal(apiClass.get('module'), 'ember');
  equal(apiClass.get('submodule'), 'ember-views');
  equal(apiClass.get('namespace'), 'Ember');
  ok(apiClass.get('extension_for') instanceof Array);
});
