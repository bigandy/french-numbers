<script lang="ts">
  import { onMount } from "svelte";

  import FrenchNumbers from "./lib/FrenchNumbers.svelte";

  import Settings from "./lib/Settings.svelte";

  import { getAvailableFrenchVoices } from "./lib/voices";

  let voices: SpeechSynthesisVoice[] = $state([]);
  let voice: SpeechSynthesisVoice | undefined = $state(undefined);

  let min = $state(1);
  let max = $state(100);

  onMount(async () => {
    voices = await getAvailableFrenchVoices();
    voice = voices.at(-1);
  });

  function handleVoiceChange(event: any) {
    const { target } = event;

    voice = voices.find((voice) => voice.name === target.value);
  }

  function handleNumberSubmit(numbers: { min: number; max: number }) {
    const { min: minValue, max: maxValue } = numbers;

    min = minValue;
    max = maxValue;
  }
</script>

<main>
  <FrenchNumbers {voice} {min} {max} />

  <Settings
    {voices}
    handleSelectChange={handleVoiceChange}
    {handleNumberSubmit}
  />
</main>
