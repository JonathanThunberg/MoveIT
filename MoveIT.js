if (Meteor.isClient) {

  var TenMinutes = new Mongo.Collection('tenMinutes');
  TenMinutes.insert({ id:1, text: "Hello" });
  var walkingService = new walkService();

  // counter starts at 0
  Session.setDefault('level', walkingService.getCurrent());

  Template.hello.helpers({
    level: function () {
      return Session.get('level');
    }
  });
  Template.hello.events({
    'click #plus': function () {
      // increment the level when button is clicked
      walkingService.takeStep();
      Session.set('level', walkingService.getCurrent());
    },
    'click #minus': function () {
      // increment the level when button is clicked
      walkingService.lowerLevel();
      Session.set('level', walkingService.getCurrent());
    },
    'click #db': function () {
      // increment the level when button is clicked
      var text = TenMinutes.find();
      console.log(text);
      console.log(JSON.stringify(text));
      walkingService.takeStep();
    }

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    var TenMinutes = new Mongo.Collection('tenMinutes');

  });
}
