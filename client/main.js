var walkingService = new walkService();
var soundingService = new soundService();
var alarmingService = new alarmService();

// counter starts at 0
Session.setDefault('level', walkingService.getCurrent());
/*
if(Meteor.isCordova){

  var myService;

  function getStatus() {
     myService.getStatus(function(r){displayResult(r)}, function(e){displayError(e)});
  }

  function displayResult(data) {
     alert("Is service running: " + data.ServiceRunning);
  }

  function displayError(data) {
     console.log("We have an error");
     console.log(json.EJSON.stringify(data, {indent: true}));
  }
  function updateHandler(data) {
    if (data.LatestResult != null) {
       try {
          var resultMessage = document.getElementById("resultMessage");
          resultMessage.innerHTML = data.LatestResult.Message;
       } catch (err) {
       }
     }
   }


  function go() {
    myService.getStatus(function(r){startService(r)}, function(e){displayError(e)});
  };

  function startService(data) {
   if (data.ServiceRunning) {
      enableTimer(data);
   } else {
      myService.startService(function(r){enableTimer(r)}, function(e){displayError(e)});
   }
  }

  function enableTimer(data) {
   if (data.TimerEnabled) {
      registerForUpdates(data);
   } else {
      myService.enableTimer(5000, function(r){registerForUpdates(r)}, function(e){displayError(e)});
   }
  }

  function registerForUpdates(data) {
   if (!data.RegisteredForUpdates) {
      myService.registerForUpdates(function(r){updateHandler(r)}, function(e){handleError(e)});
   }
  }

  document.addEventListener('deviceready', function() {
      var serviceName = 'com.red_folder.phonegap.plugin.backgroundservice.MyService';
      var factory = cordova.require('com.red_folder.phonegap.plugin.backgroundservice.BackgroundService')
      myService = factory.create(serviceName);

      go();
      }, true);
 } */

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
