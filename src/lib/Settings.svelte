<script lang="ts">
  let selectVoice = $state(false);
  const { handleSelectChange, voices } = $props();

  console.log({ handleSelectChange });
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

<style>
  select {
    margin-block-start: 1rem;
    padding: 1rem;
    display: block;
    width: 100%;
  }
</style>
