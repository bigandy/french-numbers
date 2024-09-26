<script lang="ts">
  interface Props {
    voices: SpeechSynthesisVoice[];
    handleSelectChange: () => void;
  }
  let selectVoice = $state(false);
  const { handleSelectChange, voices }: Props = $props();
</script>

<label for="selectVoice">Select Voice?</label><input
  type="checkbox"
  id="selectVoice"
  bind:checked={selectVoice}
/>

{#if selectVoice && voices?.length > 0}
  <select name="voices" id="voices" onchange={handleSelectChange}>
    {#each voices as voice (voice)}
      <option value={voice.name}>{voice.name}</option>
    {/each}
  </select>
{/if}

<style>
  select {
    margin-block-start: 1rem;
    padding: 1rem;
    display: block;
  }
</style>
