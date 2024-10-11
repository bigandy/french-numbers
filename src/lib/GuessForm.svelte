<script lang="ts">
  let input: HTMLInputElement;
  const inputId = "guess";

  import type { FormState } from "./Types";

  interface Props {
    submitGuess: (value: string) => void;
    answer: string;
    status: FormState;
    handleClearForm: () => void;
    handlePlayNumberAgain: () => void;
    shouldFocusInput?: boolean;
  }

  const {
    submitGuess,
    answer,
    status,
    handleClearForm,
    shouldFocusInput,
    handlePlayNumberAgain,
  }: Props = $props();

  let guessValue = $state("");

  function handleFormSubmit(e: SubmitEvent) {
    e.preventDefault();

    submitGuess(String(guessValue));
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

  $effect(() => {
    if (shouldFocusInput) {
      focusInput();
    }
  });

  function clearForm() {
    guessValue = "";

    focusInput();
  }

  function playNumberAgain() {
    clearForm();

    handleClearForm();
    handlePlayNumberAgain();
  }

  function focusInput() {
    input.focus();
  }
</script>

{#if status !== "complete"}
  <form onsubmit={handleFormSubmit} class:error={status === "incorrect"}>
    <input
      min="0"
      type="number"
      id={inputId}
      bind:this={input}
      bind:value={guessValue}
      class="text-input"
    />

    {#if status !== "incorrect"}
      <button disabled={guessValue === ""}>Submit Guess</button>
    {/if}

    {#if status === "incorrect"}
      <button onclick={playNumberAgain} class="error">Play Number Again?</button
      >
      <p class="error">Incorrect guess.</p>
    {/if}
  </form>
{/if}

{#if status === "complete"}
  <p>Completed. Well done!</p>
{/if}

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

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .error {
    --color: red;
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
