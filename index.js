const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.getElementById('rate');
const rateValue = document.getElementById('rate-value');
const pitch = document.getElementById('pitch')
const pitchValue = document.getElementById('pitch-value');

var isFirefox = typeof InstallTrigger !== 'undefined';

var isChrome = !!window.chrome;

let voices = [];

function getVoices() {
  voices = synth.getVoices();
  voices.forEach(voice => {
    voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = voice.name + '(' + voice.lang + ')';
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
})
}

if (isFirefox) {
    getVoices();
}

if (isChrome) {
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = getVoices;
    }
}

function pollySpeaks() {
  if (synth.speaking) {
    console.error('Polly want a cracker');
    return;
  }

  if(textInput.value !== '') {

  var speakText = new SpeechSynthesisUtterance(textInput.value);

  speakText.addEventListener('ended', event => {
    console.log('Done speaking');
  });

  speakText.addEventListener('error', event => {
    console.error('Polly wants another cracker');
  })

  const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

  voices.forEach(voice => {
    if(voice.name === selectedVoice) {
      speakText.voice = voice;
    }
  });

  speakText.rate = rate.value;
  speakText.pitch = pitch.value;

  synth.speak(speakText);

  }
}

textForm.addEventListener('submit', event => {
  event.preventDefault();
  pollySpeaks();
  textInput.blur();
});

rate.addEventListener('change', event => {
  rateValue.textContent = rate.value;
})

pitch.addEventListener('change', event => {
  pitchValue.textContent = pitch.value;
})

voiceSelect.addEventListener('change', event => {
  pollySpeaks();
})
