if (Meteor.isClient) {

  var tenMinutes = new Mongo.Collection('tenMinutes', {connection: null});
  var tenMinutesObserver = new PersistentMinimongo(tenMinutes);

  tenMinutes.insert({ id:1, text: "Hello" });
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
      var text = tenMinutes.findOne({id: 30});
      tenMinutes.insert({id: walkingService.getCurrent(), text: "3"});
      console.log(text);
      console.log(JSON.stringify(text));
    }

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });
}
