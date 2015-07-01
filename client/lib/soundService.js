soundService = function() {
  var media;
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    var uri=cordova.file.applicationDirectory.replace('file://', '') + 'www/application/sounds/tmp.wav';
    media = new Media(uri);
  };

  this.playSound = function() {
    media.play();
    console.log("playing media");
  }

}
