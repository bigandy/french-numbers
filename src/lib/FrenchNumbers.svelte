<script lang="ts">
  // Svelte Stuff
  import { onMount } from "svelte";

  // Component Imports
  import OptionsToggler from "./OptionsToggler.svelte";
  import CorrectPopover from "./CorrectPopover.svelte";
  import GuessForm from "./GuessForm.svelte";
  // import SelectVoice from "./SelectVoice.svelte";

  // Other Imports
  import { playSpeach, getAvailableFrenchVoices } from "./voices";
  import type { FormState } from "./Types";

  // State

  let answer = $state(getNewNumber());
  let voices: SpeechSynthesisVoice[] = $state([]);
  let voice: SpeechSynthesisVoice | undefined = $state(undefined);
  let guess = $state("");
  let selected: "voice" | "visual" = $state("voice");
  let formState: FormState = $state("");
  let showSuccess = $state(false);

  onMount(async () => {
    voices = await getAvailableFrenchVoices();
    voice = voices.at(-1);
  });

  // $effect(() => {
  //   if (answer) {
  //     playNumber();
  //   }
  // });

  function submitGuess(guessValue: string) {
    guess = guessValue;

    if (guess === answer) {
      formState = "correct";
      clearForm();
      console.log("celebrate?");
    } else {
      formState = "incorrect";
      console.log("try again", guessValue);
      // clearForm();
    }
  }

  $effect(() => {
    if (formState === "correct") {
      if (!showSuccess) {
        getAnotherNumber(true);
        // formState = "";
      }
    }
  });

  function clearForm() {
    guess = "";
  }

  function getNewNumber(min = 1, max = 100) {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  }

  function getAnotherNumber(readOutNumber = false) {
    answer = getNewNumber();

    if (readOutNumber) {
      playNumber();
    }
  }

  function playNumber() {
    console.log("should play the number audibly", answer);

    if (voice) {
      playSpeach(answer, voice);
    }
  }

  function onClearForm() {
    formState = "";
  }

  // function handleVoiceChange(event: any) {
  //   const { target } = event;

  //   voice = voices.find((voice) => voice.name === target.value);
  // }
</script>

<OptionsToggler bind:selected />

{#if selected === "visual"}
  <div class="number">
    {answer}
  </div>
{/if}

<button onclick={playNumber} class="play">Play</button>
<button onclick={getAnotherNumber} class="full"> Another Number Please </button>

<GuessForm {submitGuess} {answer} status={formState} {onClearForm} />

{#if showSuccess}
  <CorrectPopover
    {answer}
    handleFormSubmit={getAnotherNumber}
    show={guess === answer}
  />
{/if}

<!-- <SelectVoice {voices} handleSelectChange={handleVoiceChange} /> -->

<style>
  .number {
    font-size: 10ch;
    font-family: monospace;
  }
  button {
    border: 2px solid;
    display: block;
  }

  .play {
    margin-block: 1rem;
    display: inline-block;
  }

  .full {
    width: 100%;
  }
</style>
