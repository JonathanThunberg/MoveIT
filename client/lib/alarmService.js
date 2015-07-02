alarmService = function() {
    var alarmdiff = 2;
    var alarmBools = new Mongo.Collection('alarmBools', {connection: null});
    var alarmBoolsObserver = new PersistentMinimongo(alarmBools);



    var vibrationOn = true;
    var soundOn;
    var lightOn;

    var alarmTriggerLevel = {
      vibration: 0,
      sound: 0,
      light: 0
    }
    var alarms = {
        vibration: [20,15,10],
        sound: [25,17,5],
        light: [100,100,100]
    };
    this.checkAlarmStatus = function(option){
      var find = alarmBools.find({alarm: option}).fetch();
      if(find.length == 0) {
        alarmBools.insert({alarm: option, on: true});
        console.log("nothing found");
        return true;
      } else {
        console.log("else");
        console.log(find);
        return true;
      }
    }
    this.buildAlarms = function(vibration, sound, light){
        alarms = {
            vibration: vibration,
            sound: sound,
            light: light
        }
    };
    this.toggleVibration = function (bool) {
      if(bool !== undefined){
        vibrationOn = bool;
      } else {
        vibrationOn = !vibrationOn;
      }
    };
    this.toggleSound = function (bool) {
      if(bool !== undefined){
        soundOn = bool;
      } else {
        soundOn = !soundOn;
      }
    };
    this.toggleLight = function (bool) {
      if(bool !== undefined){
        lightOn = bool;
      } else {
        lightOn = !lightOn;
      }
    };
    this.setAlarms = function(receivedAlarms){
        alarms = receivedAlarms;
    };
    // TODO: rewrite
    this.checkForAlarms = function(level){
        if(vibrationOn && alarmTriggerLevel.vibration > alarms.vibration.length && level < alarms.vibration[alarmTriggerLevel.vibration]) {
          navigator.vibrate(1000);
          // vibrationAlarm triggered, check for next
          console.log('vibrate alarm nr; ' + alarmTriggerLevel.vibration);
          alarmTriggerLevel.vibration++;
        }
        if(soundOn && alarmTriggerLevel.sound > alarms.sound.length && level < alarms.sound[alarmTriggerLevel.sound]) {

          // soundAlarm triggered, check for next
          console.log('sound alarm nr; ' + alarmTriggerLevel.sound);
          alarmTriggerLevel.sound++;
        }
        if(lightOn && alarmTriggerLevel.light > alarms.light.length && level < alarms.light[alarmTriggerLevel.light]) {

          // soundAlarm triggered, check for next
          console.log('light alarm nr; ' + alarmTriggerLevel.light);
          alarmTriggerLevel.light++;
        }
    };
    this.levelIncreased = function(level){
      level -= alarmdiff;
      for(i = 0; i < alarms.vibration; i++){
        if(level > alarms.vibration[i]){
          alarmTriggerLevel.vibration = i;
          break;
        }
      }
      for(i = 0; i < alarms.sound; i++){
        if(level > alarms.sound[i]){
          alarmTriggerLevel.sound = i;
          break;
        }
      }
      for(i = 0; i < alarms.light; i++){
        if(level > alarms.light[i]){
          alarmTriggerLevel.light = i;
          break;
        }
      }
    }

    this.getAlarms = function() {
        return alarms;
    };
}
