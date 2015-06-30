alarmService = function() {

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
        if(level < alarms.vibration[0]) {
            console.log('vibrationLevel');
        }
    };
    this.getAlarms = function() {
        return alarms;
    };
}
