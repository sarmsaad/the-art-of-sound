from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types 

const record = require('node-record-lpcm16');

//imports the GCP client library
const Speech = require('@google-cloud/speech');


// const storage = new Speech({
// 	keyFilename: '/Users/LLIU/Downloads/default.json'
// });

//creates a client
const cilent = new speech.SpeechClient();

const encoding = LINEAR16;
const rateHertz = 16000;
const languageCode = en-US;

const request = {
	config: {
		encoding: encoding,
		rateHertz: rateHertz,
		languageCode: languageCode,
	},
	interimResults: false,
	singleUtterance: true,
};

const stream = client
	.streamingRecognize(request)
	.on('error', console.error)
	.on('data', data =>
		process.stdout.write(
			data.results[0] && data.results[0].alternatives[0]
			? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
			: `\n\nReached transcription time limit, press Ctrl+C\n`
			)
		);

record 
	.start({
		rateHertz: rateHertz,
		threshold: 0,
		verbose: false,
		recordProgram: 'rec',
		silence: '10.0',
	})
	.on('error', console.error)
	.pipe(recognizeStream);

console.log('Listening....');



var gcp = require('../config').gcp_api_key

