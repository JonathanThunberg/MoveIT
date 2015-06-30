  walkService = function(){
    var tenMinutes = new Mongo.Collection('tenMinutes', {connection: null});
    var tenMinutesObserver = new PersistentMinimongo(tenMinutes);

    var alarmingService = new alarmService();

    var currentActivityLevel = 23;
    var totalSteps = 50;
    var stepsSinceLevelUpdate = 1;
    var levelPerStepsThreshold = 1;
    var timeInterval = 3000;
    var updateInterval = 10000;

    function updateCollection() {
        tenMinutes.insert({timestamp: new Date().getTime(), level: currentActivityLevel})
    };

    updateCollectionInterval = Meteor.setInterval(updateCollection, updateInterval);

    timeInterval = Meteor.setInterval(
        function () {
            if(currentActivityLevel > 0){
                currentActivityLevel--;
            }
            alarmingService.checkForAlarms(currentActivityLevel);
            console.log(currentActivityLevel);
            Session.set('level', currentActivityLevel);
        }, timeInterval);


    // return current activity level
    this.getCurrent= function () {
        console.log(currentActivityLevel);
        return currentActivityLevel;
    };
    // Update level only if enough steps have been taken
    this.takeStep= function () {
        totalSteps++;
        stepsSinceLevelUpdate++;
        if(stepsSinceLevelUpdate >
                    levelPerStepsThreshold){
            currentActivityLevel++;
            stepsSinceLevelUpdate = 1;
        }
    };
    this.sendNotification= function () {

    };
    // Clean collection, TODO: remove
    this.cleanCollection= function () {
        tenMinutes.remove({});
    }
    this.countCollection= function() {
        return tenMinutes.find().count();
    }
  }
