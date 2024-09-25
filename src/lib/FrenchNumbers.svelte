<script lang="ts">
  import OptionsToggler from "./OptionsToggler.svelte";
  import { playSpeach, getAvailableFrenchVoices } from "./voices";

  let number = $state(getRandomNumber());
  let voices = $state(getAvailableFrenchVoices());
  let voice = $state(voices.at(-1));
  let selectVoice = $state(false);

  let guessValue = $state("");
  let selected = $state("voice");

  function submitGuess(e) {
    e.preventDefault();

    if (guessValue === number) {
      clearForm();
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

    if (guessValue !== "") {
      guessValue = "";
    }

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

<OptionsToggler bind:selected />

{#if selected === "visual"}
  <div class="number">
    {number}
  </div>
{/if}

<button onclick={playNumber} class="play">Play</button>
<button onclick={getAnotherNumber} class="full"> Another Number Please </button>

<form onsubmit={submitGuess}>
  <input type="text" id="guess" bind:value={guessValue} class="text-input" />
  <button onclick={submitGuess}>Submit Guess</button>
</form>

{#if guessValue === number}
  <div class="popover">
    <h2>Correct Answer</h2>
    <p>Successfully answered with <span class="number">{number}</span></p>
    <button onclick={getAnotherNumber}>Try another?</button>
  </div>
{/if}

<label for="selectVoice">Select Voice?</label><input
  type="checkbox"
  id="selectVoice"
  bind:checked={selectVoice}
/>

{#if selectVoice}
  <select name="voices" id="voices" onchange={handleSelectChange}>
    {#each voices as voice (voice)}
      <option value={voice.name}>{voice.name}</option>
    {/each}
  </select>
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

  select {
    margin-block-start: 1rem;
    padding: 1rem;
    display: block;
  }

  .play {
    margin-block: 1rem;
    display: inline-block;
  }

  .full {
    width: 100%;
  }

  form {
    border: 1px solid;

    padding: 1em;
    display: grid;
    gap: 1rem;
    margin-block: 1rem;
  }

  .text-input {
    padding: 1em;
  }

  .popover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    padding: 4rem;
    text-align: center;
    color: white;

    .number {
      display: block;
    }

    button {
      display: inline-block;
    }
  }
</style>
