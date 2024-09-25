export async function getAvailableFrenchVoices() {
  // if (typeof speechSynthesis === "undefined") {
  //   return;
  // }

  let voicesPromise = new Promise((resolve) => {
    speechSynthesis.addEventListener("voiceschanged", (ev) => {
      resolve(speechSynthesis.getVoices());
    });
  });

  const voices = await voicesPromise;

  console.log({ voices });
  // return [];
  // @ts-expect-error
  return voices.filter((lang) => lang.lang === "fr-FR");
  // );

  // return voices;
}

export function playSpeach(text = "1 2 3", voice) {
  console.log(text, voice);
  const voices = speechSynthesis.getVoices();

  const utterThis = new SpeechSynthesisUtterance(text);

  utterThis.voice = voice || voices[0];

  // Read out the speach
  window.speechSynthesis.cancel(); // for some reason need to cancel before. I was getting a Chrome bug where it was not playing so added this seems to fix it.
  speechSynthesis.speak(utterThis);
}
