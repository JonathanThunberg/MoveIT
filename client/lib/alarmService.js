alarmService = function() {
    var soundingService = new soundService();
    var that = this;
    var alarmdiff = 2;
    var alarmBools = new Mongo.Collection('alarmBools', {connection: null});
    var alarmBoolsObserver = new PersistentMinimongo(alarmBools);

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
        return true;
      } else {
        return find[0].on;
      }
    };
    // check if options are set in collection, otherwise set them to true
    var vibrationOn = that.checkAlarmStatus("vibrationOn");
    var soundOn = that.checkAlarmStatus("soundOn");
    var lightOn = that.checkAlarmStatus("lightOn");


    this.buildAlarms = function(vibration, sound, light){
        alarms = {
            vibration: vibration,
            sound: sound,
            light: light
        }
    };
    this.toggleAlarmOption = function (option, bool) {
      if(option !== undefined){
        if(bool !== undefined){
          switch(option){
            case 'vibration':
            vibrationOn = bool;
            break;
            case 'sound':
            soundOn = bool;
            break;
            case 'light':
            lightOn = bool;
            break;
          }
        } else {
          switch(option){
            case 'vibration':
            vibrationOn = !vibrationOn;
            break;
            case 'sound':
            soundOn = !soundOn;
            break;
            case 'light':
            lightOn = !lightOn;
            break;
          }
        }
      } else {
        // TODO: need to supply option
        console.log("option needs to be defined in toggleAlarmOption");
      }
    };
    this.setAlarms = function(receivedAlarms){
        alarms = receivedAlarms;
    };
    // TODO: rewrite



    ;


    this.checkForAlarms = function(level){
        if(Session.get('alarmUseVibration') && alarmTriggerLevel.vibration < alarms.vibration.length && level < alarms.vibration[alarmTriggerLevel.vibration]) {
          //vibrationOn
          navigator.vibrate(1000);
          // vibrationAlarm triggered, check for next
          console.log('vibrate alarm nr; ' + alarmTriggerLevel.vibration);
          alarmTriggerLevel.vibration++;
        }
        if(Session.get('alarmUseSound') && alarmTriggerLevel.sound < alarms.sound.length && level < alarms.sound[alarmTriggerLevel.sound]) {
          //soundOn
          // soundAlarm triggered, check for next
          console.log('sound alarm nr; ' + alarmTriggerLevel.sound);
          alarmTriggerLevel.sound++;
          soundingService.playSound();
        }
        if(Session.get('alarmUseLight') && alarmTriggerLevel.light < alarms.light.length && level < alarms.light[alarmTriggerLevel.light]) {
          //lightOn
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
