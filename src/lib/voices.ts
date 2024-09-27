export async function getAvailableFrenchVoices() {
  const voicesPromise = new Promise((resolve) => {
    speechSynthesis.addEventListener("voiceschanged", () => {
      resolve(speechSynthesis.getVoices());
    });
  });

  const voices: SpeechSynthesisVoice[] =
    (await voicesPromise) as SpeechSynthesisVoice[];

  // only output french voices
  return voices.filter((lang) => lang.lang === "fr-FR");
}

export function playSpeach(text = "1 2 3", voice: SpeechSynthesisVoice) {
  // console.log(text, voice);
  const voices = speechSynthesis.getVoices();

  const utterThis = new SpeechSynthesisUtterance(text);

  utterThis.voice = voice || voices[0];

  // Read out the speach
  window.speechSynthesis.cancel(); // for some reason need to cancel before. I was getting a Chrome bug where it was not playing so added this seems to fix it.
  speechSynthesis.speak(utterThis);
}
