soundService = function() {
  var media;
  if(Meteor.isCordova){
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      var uri=cordova.file.applicationDirectory.replace('file://', '') + 'www/application/sounds/tmp.wav';
      media = new Media(uri);
    };
  }

  this.playSound = function() {
    if(Meteor.isCordova){
      media.play();
    }
    console.log("playing media");
  }

}
