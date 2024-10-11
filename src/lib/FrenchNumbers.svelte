<script lang="ts">
  // Component Imports
  import GuessForm from "./GuessForm.svelte";

  // Other Imports
  import { playSpeach } from "./voices";
  import type { FormState } from "./Types";
  // import { createNumbersObject } from "./helpers";

  interface Props {
    voice: SpeechSynthesisVoice | undefined;
  }

  // Props
  let { voice }: Props = $props();

  // State
  let min = $state(13);
  let max = $state(23);
  let possibleAnswers = $state(createNumbersObject(min, max));

  let correctAnswers = $derived.by(() => {
    const out: any = [];
    Object.entries(possibleAnswers).map(([key, value]) => {
      {
        // @ts-expect-error
        if (value.status === "correct") {
          out.push(key);
        }
      }
    });

    return out;
  });

  let inCorrectAnswers = $derived.by(() => {
    const out: any = [];
    Object.entries(possibleAnswers).map(([key, value]) => {
      {
        // @ts-expect-error
        if (value.status === "incorrect") {
          out.push(key);
        }
      }
    });

    return out;
  });

  let unanswered = $derived.by(() => {
    const out: any = [];
    Object.entries(possibleAnswers).map(([key, value]) => {
      {
        // @ts-expect-error
        if (value.status === "undefined") {
          out.push(key);
        }
      }
    });

    return out;
  });

  let totalQuestionsCount = $derived.by(() => {
    return Object.entries(possibleAnswers).length;
  });

  let answer = $state(getNewNumber());
  let guess = $state("");
  let formState: FormState = $state("");
  let shouldFocusInput = $state(false);

  function createNumbersObject(min: number, max: number) {
    // array of numbers from min to max
    const maxValue = Math.max(min, max);

    const minValue = Math.min(min, max);
    const diff = maxValue - minValue;

    const arrayOutput = Array(diff + 1)
      .fill("")
      .map((_, i) => i + min);
    const outputObj = {};
    for (const item of arrayOutput) {
      // @ts-expect-error
      outputObj[item] = {
        status: "undefined",
      };
    }

    return outputObj;
  }

  function submitGuess(guessValue: string) {
    guess = guessValue;
    const oldState = { ...possibleAnswers };

    if (guess === answer) {
      formState = "correct";

      // @ts-expect-error
      oldState[String(guess)].status = "correct";

      possibleAnswers = oldState;

      if (unanswered.length === 0 && inCorrectAnswers === 0) {
        formState = "complete";
      }

      // update state
      clearForm();
    } else {
      formState = "incorrect";
      // @ts-expect-error
      oldState[String(guess)].status = "incorrect";

      clearForm();
    }
  }

  function clearForm() {
    guess = "";
  }

  function getNewNumber() {
    let number = "";
    if (unanswered.length > 0) {
      number = unanswered[(Math.random() * unanswered.length) | 0];
    } else if (inCorrectAnswers.length > 0) {
      console.log({ inCorrectAnswers, correctAnswers });
      number = inCorrectAnswers[(Math.random() * unanswered.length) | 0];
    } else {
      console.log("SHOULD HAVE ALL CORRECT");
      formState = "complete";
    }
    return number;
  }

  function getAnotherNumber(readOutNumber = false) {
    answer = getNewNumber();

    if (readOutNumber && answer !== "") {
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

  function resetGame() {
    possibleAnswers = createNumbersObject(min, max);
    answer = getNewNumber();
    formState = "";
  }

  $effect(() => {
    if (formState === "correct") {
      getAnotherNumber(true);
    }
  });
</script>

<h1>{answer}</h1>

{#if formState !== "complete"}
  <h2>Unanswered: {unanswered.length}</h2>
  <h2>correct Answers: {correctAnswers.length}</h2>
  <h2>incorrect Answers: {inCorrectAnswers.length}</h2>
  <h2>Total Questions: {totalQuestionsCount}</h2>

  <GuessForm
    {submitGuess}
    {answer}
    status={formState}
    handleClearForm={onClearForm}
    {shouldFocusInput}
    handlePlayNumberAgain={playNumber}
  />

  <button onclick={playNumber} class="play full btn-primary">Play</button>

  <button onclick={() => getAnotherNumber(true)} class="full">
    Another Number Please
  </button>
{/if}

{#if formState === "complete"}
  <h1>Completed, well done!</h1>
  <button onclick={resetGame}>Reset</button>
{/if}

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
