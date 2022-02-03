<!--
    @component 

    @name svelte-steps

    @description This is the steps component.

    @props 
    
    - `steps`:
      - Array of object. Length has to be more than 1
      - Required
      - Each item is a step object that can have:
        - `text`: The text displayed below each steps.
        - `icon`: A svelte component displayed inside each steps.
        - `iconProps`: An object that will be passed as props to the `icon` component.
    - `current`: current step index. Number. Default `0`
    - `size`: size of the step buttons. String. Default `"3rem"`
    - `line`: thickness of the connecting lines between the step buttons. String. Default `"0.3rem"`
    - `primary`: Primary color of passed and current steps. String. Default `'var(--bs-primary, #3a86ff)'`
    - `secondary`: Secondary color of future steps. String. Default `'var(--bs-secondary, #bbbbc0)'`
    - `light`: Primary color of text color in passed anc current steps. String. Default `'var(--bs-light, white)'`
    - `dark`: Secondary color of text color in future steps. String. Default `'var(--bs-dark, black)'`
    - `borderRadius`: Border radius of the step buttons. String. Default `'50%'` (circle)
    - `fontFamily`: Font family of the component. String. Default `"'Helvetica Neue', Helvetica, Arial, sans-serif"`
    - `vertical`: Vertical steps
    - `reverse`: For horizontal steps, reverse the step from right to the left; for vertical steps, reverse puts text labels to the left. Default `false`

  @events

  - `on:click(e)`: click event with arg as the clicked step index as `e.detail.current` and last step index as `e.detail.last`
-->
<script>
  // A bootstrap step component
  import { createEventDispatcher } from 'svelte'
  import Check from './Check.svelte'

  export let steps
  export let current = 0
  export let vertical = false
  export let size = vertical ? '2rem' : '3rem'
  export let line = vertical ? '0.15rem' : '0.3rem'
  export let lineHeight = undefined
  export let primary = 'var(--bs-primary, #3a86ff)'
  export let secondary = 'var(--bs-secondary, #bbbbc0)'
  export let light = 'var(--bs-light, white)'
  export let dark = 'var(--bs-dark, black)'
  export let borderRadius = '50%'
  export let fontFamily = ''
  export let reverse = false

  const minStepSize = '5rem'
  const stepLabelSpace = '1rem'

  //
  if (lineHeight) {
    line = lineHeight
  }
  if (current > steps.length - 1) {
    current = steps.length - 1
  }
  if (current < 0) {
    current = 0
  }

  const dispatch = createEventDispatcher()
  let onClick = (i) => {
    let last = current
    current = i
    dispatch('click', { current, last })
  }
</script>

<div
  class="steps-container"
  style={`--size: ${size}; 
      --line-thickness: ${line};
      --primary: ${primary}; 
      --secondary: ${secondary};
      --light: ${light};
      --dark: ${dark};
      --border-radius: ${borderRadius};
      --font-family: ${
        fontFamily || "'Helvetica Neue', Helvetica, Arial, sans-serif"
      };
      display: flex;
      justify-content: space-between;`}
  style:flex-direction={vertical ? 'column' : reverse ? 'row-reverse' : 'row'}
>
  {#each steps as step, i}
    <!-- step container -->
    <div
      style="display: flex; align-items:center; flex-grow: 10; width: 100%"
      style:flex-direction={vertical
        ? reverse
          ? 'row-reverse'
          : 'row'
        : 'column'}
    >
      <!-- line container -->
      <div
        style="align-self: stretch; 
          display: flex; 
          align-items:center;
          justify-content: center;"
        style:flex-direction={vertical
          ? 'column'
          : reverse
          ? 'row-reverse'
          : 'row'}
        style:min-width={vertical ? 'var(--size)' : minStepSize}
        style:min-height={vertical ? minStepSize : 'var(--size)'}
        style:width={vertical ? 'var(--size)' : null}
        style:height={vertical ? null : 'var(--size)'}
      >
        <!-- first half line -->
        {#if i > 0}
          <div
            class={i <= current ? `bg-primary` : `bg-secondary`}
            style:flex-grow={10}
            style:width={vertical ? 'var(--line-thickness)' : null}
            style:min-width={vertical ? 'var(--line-thickness)' : null}
            style:height={vertical ? null : 'var(--line-thickness)'}
            style:min-height={vertical ? null : 'var(--line-thickness)'}
          />
        {:else}
          <div style:flex-grow={10} />
        {/if}
        <!-- second half line -->
        {#if i < steps.length - 1}
          <div
            class={i < current ? `bg-primary` : `bg-secondary`}
            style:flex-grow={10}
            style:width={vertical ? 'var(--line-thickness)' : null}
            style:min-width={vertical ? 'var(--line-thickness)' : null}
            style:height={vertical ? null : 'var(--line-thickness)'}
            style:min-height={vertical ? null : 'var(--line-thickness)'}
          />
        {:else}
          <div style:flex-grow={10} />
        {/if}
      </div>
      <!-- line container end -->

      <!-- circle and text label -->
      <div
        style="display: flex; align-items: center; "
        style:flex-direction={vertical
          ? reverse
            ? 'row-reverse'
            : 'row'
          : 'column'}
        style:margin-left={vertical ? (reverse ? '0' : '-' + size) : null}
        style:margin-right={vertical ? (reverse ? '-' + size : '0') : null}
        style:margin-top={vertical ? null : '-' + size}
      >
        <!-- circle -->
        <div
          class="step
              {i <= current
            ? `bg-primary text-light`
            : `bg-secondary text-light`}
              "
          class:shadow={i == current}
          on:click={() => {
            onClick(i)
          }}
        >
          {#if step.icon}
            {#if i < current}
              <Check />
            {:else if step.iconProps}
              <svelte:component this={step.icon} {...step.iconProps} />
            {:else}
              <svelte:component this={step.icon} />
            {/if}
          {:else if i < current}
            <Check />
          {:else}
            <span class="steps__number">{i + 1}</span>
          {/if}
        </div>
        <!-- text label -->
        <div
          class="steps__label"
          style:margin-left={vertical
            ? reverse
              ? null
              : stepLabelSpace
            : null}
          style:margin-right={vertical
            ? reverse
              ? stepLabelSpace
              : null
            : null}
          style:margin-top={vertical ? null : stepLabelSpace}
          style:text-align={vertical ? (reverse ? 'right' : 'left') : 'center'}
        >
          {#if typeof step.text != 'undefined'}
            <div
              class:text-primary={i <= current}
              on:click={() => {
                onClick(i)
              }}
            >
              {step.text}
            </div>
          {:else}
            <div />
          {/if}
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .steps-container {
    font-family: var(--font-family);
  }

  .step {
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size);
    min-width: var(--size);
    height: var(--size);
    min-height: var(--size);
    font-size: calc(var(--size) * 0.5);
  }
  .step:hover {
    cursor: pointer;
    filter: brightness(85%);
  }
  .steps__label {
    font-size: larger;
  }
  .steps__label:hover {
    cursor: pointer;
    filter: brightness(85%);
  }

  .text-primary {
    color: var(--primary) !important;
  }
  .text-light {
    color: var(--light) !important;
  }
  .text-dark {
    color: var(--dark) !important;
  }
  .bg-secondary {
    background-color: var(--secondary) !important;
  }
  .bg-primary {
    background-color: var(--primary) !important;
  }
  .shadow {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  }
</style>
