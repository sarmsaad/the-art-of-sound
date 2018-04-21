var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var colors = [
  "aqua",
  "azure",
  "beige",
  "bisque",
  "black",
  "blue",
  "brown",
  "chocolate",
  "coral",
  "crimson",
  "cyan",
  "fuchsia",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lime",
  "linen",
  "magenta",
  "maroon",
  "moccasin",
  "navy",
  "olive",
  "orange",
  "orchid",
  "peru",
  "pink",
  "plum",
  "purple",
  "red",
  "salmon",
  "sienna",
  "silver",
  "snow",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "white",
  "yellow"
];
var grammar =
  "#JSGF V1.0; grammar colors; public <color> = " + colors.join(" | ") + " ;";

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onnomatch = function(event) {
  //   diagnostic.textContent = "I didn't recognise that color.";
  console.log("I didn't recognise that color.");
};

recognition.onerror = function(event) {
  console.log("Error occurred in recognition: " + event.error);
};

class ColorRecognizer {
  constructor(callback) {
    this.cb = callback;
    var _this = this;
    recognition.onresult = function(event) {
      // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
      // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
      // It has a getter so it can be accessed like an array
      // The [last] returns the SpeechRecognitionResult at the last position.
      // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
      // These also have getters so they can be accessed like arrays.
      // The [0] returns the SpeechRecognitionAlternative at position 0.
      // We then return the transcript property of the SpeechRecognitionAlternative object

      var last = event.results.length - 1;

      var color = event.results[last][0].transcript;

      console.log(event);

      _this.cb(color);

      // diagnostic.textContent = 'Result received: ' + color + '.';
      // bg.style.backgroundColor = color;
      // console.log('Confidence: ' + event.results[0][0].confidence);
    };

    recognition.onspeechend = function() {
    //   _this.cb("Ended");
      recognition.stop();
    };

    recognition.onerror = function(event) {
      _this.cb("No speech");
      console.log("Error occurred in recognition: " + event.error);
    };
  }

  start() {
    recognition.start();
  }
}

export default ColorRecognizer;
