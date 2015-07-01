soundService = function() {

  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    var media = new Media(src('/sounds/test.wav'), mediaSuccess, [mediaError], [mediaStatus]);
  }
  function getMediaUrl(sound) {
    if (device.platform.toLowerCase() === "android") {
      return cordova.file.applicationDirectory.replace('file://', '') + 'www/application/' + sound.substr(1);
    } else {
      return cordova.file.applicationDirectory.replace('file://', '') + sound.substr(1);
    }
  }
  function playSound(sound) {
    return new Media(
      getMediaUrl(sound),
      function (success) {
        // success
      },
      function (err) {
        // error
      }
    );
  }
  var test = playSound('/sounds/test.wav');
  this.playSound() {
    test.play();
  }
}
