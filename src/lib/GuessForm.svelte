<script lang="ts">
  let input: HTMLInputElement;

  import type { FormState } from "./Types";

  interface Props {
    submitGuess: (value: string) => void;
    answer: string;
    status: FormState;
    handleClearForm: () => void;
  }

  const { submitGuess, answer, status, handleClearForm }: Props = $props();

  let guessValue = $state("");

  function handleFormSubmit(e: SubmitEvent) {
    e.preventDefault();

    submitGuess(guessValue);
  }

  $effect(() => {
    if (answer) {
      clearForm();
    }
  });

  $effect(() => {
    if (status !== "" && guessValue === "") {
      handleClearForm();
    }
  });

  function clearForm() {
    guessValue = "";

    input.focus();

    handleClearForm();
  }
</script>

<form onsubmit={handleFormSubmit} class:error={status === "incorrect"}>
  <input
    type="text"
    id="guess"
    bind:this={input}
    bind:value={guessValue}
    class="text-input"
  />
  <button disabled={guessValue === ""}>Submit Guess</button>

  {#if status === "incorrect"}
      <p class="error">Incorrect guess.</p>
      <button onclick={clearForm} class="error">Try Again?</button>
  {/if}
</form>

<style>
  form {
    border: 1px solid;
    padding: 1em;
    display: grid;
    gap: 1rem;
    margin-block: 1rem;
    border-color: var(--color, inherit);
    color: var(--color);

    input {
      border: 2px solid var(--color, black);
    }
  }

  .error {
    --color: red;
    /* color: var(--color); */
  }

  .text-input {
    padding: 1rem;
    text-align: center;
    font-size: 2rem;
  }

  button {
    border: 2px solid;
    display: block;
    color: var(--color);
  }
</style>
