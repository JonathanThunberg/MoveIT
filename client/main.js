var walkingService = new walkService();

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("onDeviceReady");
    console.log(JSON.stringify(navigator.accelerometer));
    var watchID = navigator.accelerometer.watchAcceleration(
      function(acceleration){
        console.log('Acceleration X: ' + acceleration.x +" : " +
           'Acceleration Y: ' + acceleration.y + " : " +
           'Acceleration Z: ' + acceleration.z + " : " +
           'Timestamp: '      + acceleration.timestamp );
      },
      function(){

      },{ frequency: 3000 });
}
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
    console.log(walkingService.countCollection());
  },
  'click #cleanCollection': function () {
    walkingService.cleanCollection();
  }

});
