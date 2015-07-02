testBackground = function(){

  var myService;

  document.addEventListener('deviceready', function() {
     myService = cordova.plugins.myService;;
     go();
  }, true);

  function go() {
     myService.getStatus(function(r){startService(r)}, function(e){handleError(e)});
  };

  function startService(data) {
     if (data.ServiceRunning) {
        enableTimer(data);
     } else {
        myService.startService(function(r){enableTimer(r)}, function(e){handleError(e)});
     }
  }

  function enableTimer(data) {
     if (data.TimerEnabled) {
        allDone();
     } else {
        myService.enableTimer(60000, function(r){allDone(r)}, function(e){handleError(e)});
     }
  }

  function allDone() {
     alert("Service now running");
  }



}
