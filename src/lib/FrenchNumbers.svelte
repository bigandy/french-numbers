<script lang="ts">
  // Component Imports
  import GuessForm from "./GuessForm.svelte";

  // Other Imports
  import { playSpeach } from "./voices";
  import type { FormState } from "./Types";

  interface Props {
    voice: SpeechSynthesisVoice | undefined;
  }

  // Props
  let { voice }: Props = $props();

  // State
  let min = $state(1);
  let max = $state(100);
  let answer = $state(getNewNumber());
  let guess = $state("");
  let formState: FormState = $state("");
  let showSuccess = $state(false);
  let shouldFocusInput = $state(false);
  
  function submitGuess(guessValue: string) {
    guess = guessValue;

    if (guess === answer) {
      formState = "correct";
      clearForm();
    } else {
      formState = "incorrect";
    }
  }

  function clearForm() {
    guess = "";
  }

  function getNewNumber() {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  }

  function getAnotherNumber(readOutNumber = false) {
    answer = getNewNumber();

    if (readOutNumber) {
      playNumber();
    }
  }

  function playNumber() {
    shouldFocusInput = false;
    if (voice) {
      playSpeach(answer, voice);
    }

    // shouldFocusInput();
    shouldFocusInput = true;
  }

  function onClearForm() {
    formState = "";
  }

  $effect(() => {
    if (formState === "correct" && !showSuccess) {
      getAnotherNumber(true);
    }
  });
</script>

<GuessForm
  {submitGuess}
  {answer}
  status={formState}
  handleClearForm={onClearForm}
  shouldFocusInput={shouldFocusInput}
  handlePlayNumberAgain={playNumber}
/>


<button onclick={playNumber} class="play full btn-primary">Play</button>

<button onclick={() => getAnotherNumber(true)} class="full">
  Another Number Please
</button>

<style>
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

  .btn-primary {
    background: black;
    color: white;
    padding: 1.5rem;

    &:hover,
    &:focus {
      background-color: grey;
    }
  }
</style>
