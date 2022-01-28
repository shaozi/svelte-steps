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
	- `size`: size of the step buttons. String. Default `"2rem"`
	- `line`: thickness of the connecting lines between the step buttons. String. Default `"0.15rem"`
	- `primary`: Primary color of passed and current steps. String. Default `'var(--bs-primary, #3a86ff)'`
	- `secondary`: Secondary color of future steps. String. Default `'var(--bs-secondary, #bbbbc0)'`
	- `light`: Primary color of text color in passed anc current steps. String. Default `'var(--bs-light, white)'`
	- `dark`: Secondary color of text color in future steps. String. Default `'var(--bs-dark, black)'`
	- `borderRadius`: Border radius of the step buttons. String. Default `'50%'` (circle)
	- `fontFamily`: Font family of the component. String. Default `"'Helvetica Neue', Helvetica, Arial, sans-serif"`

	@events

	- `on:click(e)`: click event with arg as the clicked step index as `e.detail.current` and last step index as `e.detail.last`
-->
<script>
  // A bootstrap step component
  import { createEventDispatcher } from 'svelte'
  import Check from './Check.svelte'

  export let steps
  export let current = 0
  export let size = '2rem'
  export let lineHeight = undefined // for backward compatibility
  export let line = '0.15rem'
  export let primary = 'var(--bs-primary, #3a86ff)'
  export let secondary = 'var(--bs-secondary, #bbbbc0)'
  export let light = 'var(--bs-light, white)'
  export let dark = 'var(--bs-dark, black)'
  export let borderRadius = '50%'
  export let fontFamily = ''
  export let reverse = false

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

  $: half = 100 / steps.length / 2
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
      };`}
>
  {#each steps as step, i}
    <div
      style="display: flex; align-items:center; min-height: 5rem;"
      style:flex-direction={reverse ? 'row-reverse' : 'row'}
    >
      <div
        style="display: flex; align-items: center; 
        align-self: stretch; "
      >
        <div
          style="min-width: var(--size); align-self: stretch; display: flex; 
          flex-direction: column; align-items:center;
          justify-content: center;"
        >
          {#if i > 0}
            <div class="bar {i <= current ? `bg-primary` : `bg-secondary`}" />
          {:else}
            <div class="bar" />
          {/if}
          {#if i < steps.length - 1}
            <div class="bar {i < current ? `bg-primary` : `bg-secondary`}" />
          {:else}
            <div class="bar" />
          {/if}
        </div>
      </div>
      <div
        style="display: flex; align-items: center; "
        style:flex-direction={reverse ? 'row-reverse' : 'row'}
        style:margin-left={reverse ? '0' : '-' + size}
        style:margin-right={reverse ? '-' + size : '0'}
      >
        <div
          class="step
						  {i <= current ? `bg-primary text-light` : `bg-secondary text-light`}
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

        <div
          class="steps__label"
          style:margin-left={reverse ? '' : '1rem'}
          style:margin-right={reverse ? '1rem' : ''}
          style:text-align={reverse ? 'right' : 'left'}
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
  .block {
    display: flex;
    flex-flow: row nowrap;
  }

  .bar {
    flex-grow: 10;
    width: var(--line-thickness);
    max-width: var(--line-thickness);
  }
  .step {
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size);
    min-width: var(--size);
    height: var(--size);
    font-size: calc(var(--size) * 0.5);
  }
  .step:hover {
    cursor: pointer;
    filter: brightness(85%);
  }
  .steps__label {
    cursor: pointer;
    font-size: larger;
  }
  .d-flex {
    display: flex;
  }
  .d-flex.align-items-start {
    align-items: flex-start;
  }
  .d-flex.align-items-center {
    align-items: center;
  }
  .d-flex.justify-content-center {
    justify-content: center;
  }
  .d-flex.justify-content-space-around {
    justify-content: space-around;
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

  .text-center {
    text-align: center;
  }

  .progress-bar {
    background-color: var(--primary);
    border-right: 1px solid white;
  }
</style>
