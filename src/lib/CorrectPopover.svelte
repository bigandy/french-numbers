<script lang="ts">
  interface Props {
    answer: string;
    show: boolean;
    handleFormSubmit: () => void;
  }
  const { answer, handleFormSubmit, show }: Props = $props();

  $effect(() => {
    if (show) {
      const dialog = document.querySelector("dialog");
      dialog?.showModal();
    }
  });
  /* 
  Turning the form into a dialog form by using method="dialog"
  Submits the form and closes the dialog. Viola!
  */
</script>

<dialog class="popover">
  <form onsubmit={handleFormSubmit} method="dialog">
    <h2>Correct Answer</h2>

    <p>Successfully answered with <span class="number">{answer}</span></p>
    <button onclick={handleFormSubmit}>Try another?</button>
  </form>
</dialog>

<style>
  .popover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
