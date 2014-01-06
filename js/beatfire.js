// Generated by CoffeeScript 1.6.3
(function() {
  var bpm, changeInterval, interval, paused, socket;

  socket = io.connect('http://party.naked.sh:80/consumer');

  interval = void 0;

  bpm = void 0;

  paused = false;

  changeInterval = function(newBpm) {
    console.log("new bpm detected", newBpm);
    if (newBpm != null) {
      bpm = newBpm;
    } else {
      newBpm = bpm;
    }
    if (interval) {
      clearInterval(interval);
    }
    return interval = setInterval(function() {
      if (paused) {
        return;
      }
      return $("body").trigger("beatFireBeat");
    }, 60000 / newBpm);
  };

  socket.on('bpm', changeInterval);

  socket.on("bump", function() {
    $("body").trigger("beatFireBump");
    paused = true;
    return setTimeout(function() {
      return paused = false;
    }, 20000);
  });

}).call(this);
