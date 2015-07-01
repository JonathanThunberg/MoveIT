alarmService = function() {
    var alarmdiff = 2;

    var herpa = {
      vibration: 0,
      sound: 0,
      light: 0
    }
    var alarms = {
        vibration: [20,15,10],
        sound: [25,17,5],
        light: [100,100,100]
    };

    this.buildAlarms = function(vibration, sound, light){
        alarms = {
            vibration: vibration,
            sound: sound,
            light: light
        }
    };

    this.setAlarms = function(receivedAlarms){
        alarms = receivedAlarms;
    };
    // TODO: rewrite
    this.checkForAlarms = function(level){
        if(herpa.vibration > alarms.vibration.length && level < alarms.vibration[herpa.vibration]) {
          navigator.vibrate(1000);
          // vibrationAlarm triggered, check for next
          console.log('vibrate alarm nr; ' + herpa.vibration);
          herpa.vibration++;
        }
        if(herpa.sound > alarms.sound.length && level < alarms.sound[herpa.sound]) {

          // soundAlarm triggered, check for next
          console.log('sound alarm nr; ' + herpa.sound);
          herpa.sound++;
        }
        if(herpa.light > alarms.light.length && level < alarms.light[herpa.light]) {

          // soundAlarm triggered, check for next
          console.log('light alarm nr; ' + herpa.light);
          herpa.light++;
        }
    };
    this.levelIncreased = function(level){
      level -= alarmdiff;
      for(i = 0; i < alarms.vibration; i++){
        if(level > alarms.vibration[i]){
          herpa.vibration = i;
          break;
        }
      }
      for(i = 0; i < alarms.sound; i++){
        if(level > alarms.sound[i]){
          herpa.sound = i;
          break;
        }
      }
      for(i = 0; i < alarms.light; i++){
        if(level > alarms.light[i]){
          herpa.light = i;
          break;
        }
      }
    }

    this.getAlarms = function() {
        return alarms;
    };
}
