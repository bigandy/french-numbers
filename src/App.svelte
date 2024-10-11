<script lang="ts">
  import { onMount } from "svelte";

  import FrenchNumbers from "./lib/FrenchNumbers.svelte";

  import { getAvailableFrenchVoices } from "./lib/voices";

  let voices: SpeechSynthesisVoice[] = $state([]);
  let voice: SpeechSynthesisVoice | undefined = $state(undefined);

  

  onMount(async () => {
    voices = await getAvailableFrenchVoices();
    voice = voices.at(-1);
  });
</script>

<main>
  <FrenchNumbers {voice}  />
</main>
