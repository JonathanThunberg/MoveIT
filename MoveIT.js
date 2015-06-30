if (Meteor.isClient) {
  var TenMinutes = new Mongo.Collection('tenMinutes');
  TenMinutes.insert({ id:1, text: "Hello" });

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });
  Template.hello.events({
    'click #plus': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    },
    'click #minus': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') - 1);
    },
    'click #db': function () {
      // increment the counter when button is clicked
      var text = TenMinutes.find();
      console.log(text);
      console.log(JSON.stringify(text));
      walkService.takeStep();
    }

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    var TenMinutes = new Mongo.Collection('tenMinutes');

  });
}
