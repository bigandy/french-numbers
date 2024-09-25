<script lang="ts">
</script>

<form action="">
  <div class="section">
    <input type="radio" name="optionsToggler" id="voice" checked />
    <label for="voice">Voice</label>
  </div>
  <div class="section disabled">
    <input type="radio" name="optionsToggler" id="visual" disabled />
    <label for="visual">Visual</label>
  </div>
</form>

<style>
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  /* 
  For radio and checkbox inputs in a grid
  the grid places them in the middle of the space that would be 100%
  of the available width allowed e.g. by an input type="text". 
  To position it at the start, use justify-self: start on these inputs.
  Alternatively you can use justify-items: start on the parent 
  */
  input[type="radio"],
  input[type="checkbox"] {
    /* justify-self: start; */
  }

  /* 
  Not yet got this working so making it look different
  */
  .disabled {
    cursor: not-allowed;
    background: rgb(from red r g b / 0.1);

    /* Do this on the children otherwise the cursor will change when
    hovering over input or labels
    */
    * {
      pointer-events: none;
    }
  }
</style>
