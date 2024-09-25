<script lang="ts">
  import OptionsToggler from "./OptionsToggler.svelte";

  let selected = $state("voice");

  function handleChange(e) {
    console.log("handle change", e.target.value);
    selected = e.target.value;
  }
</script>

<div>
  {selected}
</div>
