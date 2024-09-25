export function getAvailableFrenchVoices() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  const voices = speechSynthesis
    .getVoices()
    .filter((lang) => lang.lang === "fr-FR");

  return voices;
}

export function playSpeach(text = "1 2 3", voice) {
  const voices = speechSynthesis.getVoices();

  const utterThis = new SpeechSynthesisUtterance(text);

  utterThis.voice = voice || voices[0];

  // Read out the speach
  speechSynthesis.speak(utterThis);
}
