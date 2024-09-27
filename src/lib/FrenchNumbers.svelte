<script lang="ts">
  // Svelte Stuff

  // Component Imports
  import OptionsToggler from "./OptionsToggler.svelte";
  import CorrectPopover from "./CorrectPopover.svelte";
  import GuessForm from "./GuessForm.svelte";

  // Other Imports
  import { playSpeach } from "./voices";
  import type { FormState } from "./Types";

  interface Props {
    voice: SpeechSynthesisVoice | undefined;
    min: number;
    max: number;
  }

  let { voice, min: minFromProps, max: maxFromProps }: Props = $props();

  // State
  let answer = $state(getNewNumber());
  let guess = $state("");
  let selected: "voice" | "visual" = $state("voice");
  let formState: FormState = $state("");
  let showSuccess = $state(false);

  $effect(() => {
    answer = getNewNumber(minFromProps, maxFromProps);
  });

  function submitGuess(guessValue: string) {
    guess = guessValue;

    if (guess === answer) {
      formState = "correct";
      clearForm();
    } else {
      formState = "incorrect";
    }
  }

  $effect(() => {
    if (formState === "correct") {
      if (!showSuccess) {
        getAnotherNumber(true);
      }
    }
  });

  function clearForm() {
    guess = "";
  }

  function getNewNumber(min = minFromProps, max = maxFromProps) {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  }

  function getAnotherNumber(readOutNumber = false) {
    answer = getNewNumber();

    if (readOutNumber) {
      playNumber();
    }
  }

  function playNumber() {
    if (voice) {
      playSpeach(answer, voice);
    }
  }

  function onClearForm() {
    formState = "";
  }
</script>

<OptionsToggler bind:selected />

{#if selected === "visual"}
  <div class="number">
    {answer}
  </div>
{/if}

<button onclick={playNumber} class="play full btn-primary">Play</button>

<GuessForm
  {submitGuess}
  {answer}
  status={formState}
  handleClearForm={onClearForm}
/>

<button onclick={() => getAnotherNumber(true)} class="full">
  Another Number Please
</button>

{#if showSuccess}
  <CorrectPopover
    {answer}
    handleFormSubmit={getAnotherNumber}
    show={guess === answer}
  />
{/if}

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
