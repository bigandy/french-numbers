<script lang="ts">
  let selectVoice = $state(false);
  interface Props {
    voices: SpeechSynthesisVoice[]
    handleSelectChange: (voice: SpeechSynthesisVoice) => void;
    handleNumberSubmit: ({min, max}: {min: number, max: number}) => void;
  }
  const { handleSelectChange, voices, handleNumberSubmit }: Props = $props();

  let min = $state(1);
  let max = $state(100);


  function onNumberSubmit() {
    handleNumberSubmit({min, max});
  }

</script>

<div>
  <label for="selectVoice">Select Voice?</label><input
    type="checkbox"
    id="selectVoice"
    bind:checked={selectVoice}
  />

  {#if selectVoice}
    <select name="voices" id="voices" onchange={handleSelectChange as any}>
      {#each voices as voice (voice)}
        <option value={voice.name}>{voice.name}</option>
      {/each}
    </select>
  {/if}
</div>

<div>
  <label for="min">Min</label><input bind:value={min} type="number" id="min" />
  <label for="max">Max</label><input bind:value={max} type="number" id="max" />
  <button onclick={onNumberSubmit}>Submit</button>
</div>

<style>
  select {
    margin-block-start: 1rem;
    padding: 1rem;
    display: block;
    width: 100%;
  }
</style>
