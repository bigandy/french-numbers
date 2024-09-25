<script lang="ts">
  import { Confetti } from "svelte-confetti";

  import OptionsToggler from "./OptionsToggler.svelte";
  import { playSpeach, getAvailableFrenchVoices } from "./voices";

  let number = $state(getRandomNumber());
  let voices = $state(getAvailableFrenchVoices());
  let voice = $state(voices.at(-1));
  let showNumber = $state(false);
  let showConfetti = $state(false);

  let guessValue = $state("");

  function submitGuess(e) {
    e.preventDefault();

    if (guessValue === number) {
      showConfetti = true;
      clearForm();
      getAnotherNumber();
    } else {
      console.log("try again", guessValue);
      clearForm();
    }
  }

  function clearForm() {
    guessValue = "";
  }

  function getRandomNumber(min = 1, max = 100) {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  }

  function getAnotherNumber() {
    number = getRandomNumber();

    // if (showNumber === false) {
    playNumber();
    // }
  }

  function playNumber() {
    console.log("should play the number audibly", number);
    playSpeach(number, voice);
  }

  function handleSelectChange(event) {
    const { target } = event;
    console.log({ event, target, value: target.value });

    voice = voices.find((voice) => voice.name === target.value);
  }
</script>

<OptionsToggler />

{#if showNumber}
  <div class="number">
    {number}
  </div>
{/if}

<select name="voices" id="voices" onchange={handleSelectChange}>
  {#each voices as voice (voice)}
    <option value={voice.name}>{voice.name}</option>
  {/each}
</select>

<button onclick={playNumber} class="play">Play</button>
<button onclick={getAnotherNumber} class="full"> Another Number Please </button>

<form onsubmit={submitGuess}>
  <input type="text" id="guess" bind:value={guessValue} />
  <button onclick={submitGuess}>Submit Guess</button>
</form>

{#if showConfetti}
  <Confetti />
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
</style>
