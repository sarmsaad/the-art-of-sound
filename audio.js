var load = require('audio-loader');

var PitchAnalyzer = require('./src/pitch');

load('https://freemusicarchive.org/file/music/dublab/Fulgeance/INTO_INFINITY_an_exploration_of_on_and_on_and_on_and_on/Fulgeance_-_Into_Infinity_ear_loop.mp3').then(function (buffer) {
  console.log(buffer); // => <AudioBuffer> 
  var pitch = new PitchAnalyzer(44100);

  /* Copy samples to the internal buffer */
  pitch.input(buffer);
  /* Process the current input in the internal buffer */
  pitch.process();

  var tone = pitch.findTone();

  if (tone === null) {
    console.log('No tone found!');
  } else {
    console.log('Found a tone, frequency:', tone.freq, 'volume:', tone.db);
  }
});

