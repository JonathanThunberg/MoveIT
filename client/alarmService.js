alarmService = function() {

    var alarms = {
        vibration: [20,15,10],
        sound: [25,17,5]
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
