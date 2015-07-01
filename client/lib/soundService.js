soundService = function() {
  var media;
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    media = new Media('www/application/sounds/test.wav', mediaSuccess, [mediaError], [mediaStatus]);
  };
  function mediaSuccess(){

  };
  var test = playSound('/sounds/test.wav');
  this.playSound = function() {
    media.play();
  }

}
