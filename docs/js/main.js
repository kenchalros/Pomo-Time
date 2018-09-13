(function() {
  'use strict';

  var timer = document.getElementById('timer');
  var pomo = document.getElementById('pomo');
  var breakTimer = document.getElementById('break');
  var start = document.getElementById('start');

  var startTime;
  var timeLeft;
  var timeToCountDown;
  var timerId;
  var isRunning = false;
  var pomoTime = 25 * 60 * 1000;
  var breakTime = 5 * 60 * 1000;
  timer.textContent = "25:00.000";
  timeToCountDown = pomoTime;

  function updateTimer(t) {
    var d = new Date(t);
    var m = d.getMinutes();
    var s = d.getSeconds();
    var ms = d.getMilliseconds();
    var timerString;
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('00' + ms).slice(-3);
    timerString = m + ':'+ s + '.' + ms;
    timer.textContent = timerString;
  }

  function countDown() {
    timerId = setTimeout(function() {
      timeLeft = timeToCountDown - (Date.now() - startTime);
      if (timeLeft < 0) {
        isRunning = false;
        start.textContent = 'Start'
        clearTimeout(timerId);
        timeLeft = 0;
        timeToCountDown = 0;
        updateTimer(timeLeft);
        return;
      }
      updateTimer(timeLeft);
      countDown();
    }, 10);
  }

  start.addEventListener('click', function(){
    if (isRunning === false){
      isRunning = true;
      start.textContent = 'Stop';
      startTime = Date.now();
      countDown();
    } else {
      isRunning = false;
      start.textContent = 'Start';
      timeToCountDown = timeLeft;
      clearTimeout(timerId);
    }
  });

  pomo.addEventListener('click', function() {
    if (isRunning === false) {
      timeToCountDown = pomoTime;
      startTime = Date.now();
      updateTimer(timeToCountDown);
    }
  });

  breakTimer.addEventListener('click', function() {
    if (isRunning === false) {
      timeToCountDown = breakTime;
      startTime = Date.now();
      updateTimer(timeToCountDown)
    }
  });

})();
