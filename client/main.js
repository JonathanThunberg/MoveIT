var walkingService = new walkService();
var soundingService = new soundService();
var alarmingService = new alarmService();

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
    console.log("plus button pressed");
    walkingService.senseMovement();
    Session.set('level', walkingService.getCurrent());
  },
  'click #minus': function () {
    // increment the level when button is clicked
    Session.set('level', walkingService.getCurrent());
  },
  'click #db': function () {
    console.log(walkingService.countCollection());
  },
  'click #cleanCollection': function () {
    walkingService.cleanCollection();
  },
  'click #sound': function () {
    soundingService.playSound();
  },
  'click #test': function () {
    console.log(alarmingService.checkAlarmStatus("vibrationOn"));
  }
});
