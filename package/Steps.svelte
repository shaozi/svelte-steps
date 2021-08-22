<!--
    @component 

    @name svelte-steps

    @description This is the steps component.

    @props 
    
    - `steps`: {text: string, icon: component}[] steps 
	- `current`: current step index
    - `size`: size of the circle buttons
    - `lineHeight`: height of the connecting lines between the circle buttons
    - `primary`: Primary color of passed steps
    - `secondary`: Secondary color of future steps
    - `textPrimary`: Primary color of text color in passed steps
    - `textSecondary`: Secondary color of text color in future steps
    - `borderRadius`: Border radius of the  buttons
    - `on:click(e=>{e.detail})`: click event with arg as the clicked step index as e.detail
    
-->
<script>
	// A bootstrap step component
	import { createEventDispatcher } from 'svelte';
	import Check from '$lib/icons/check.svelte';

	export let size = '3rem';
	export let lineHeight = '0.3rem';
	export let primary = 'blue';
	export let secondary = 'gray';
	export let textPrimary = 'white';
	export let textSecondary = 'black';
	export let current = 0;
	export let steps = [];
	export let borderRadius = '50%';
	if (current > steps.length - 1) {
		current = steps.length - 1;
	}
	if (current < 0) {
		current = 0;
	}
	$: total = steps.length;
	$: half = 100 / steps.length / 2;
	const dispatch = createEventDispatcher();
	let onClick = (i) => {
		dispatch('click', i);
	};
</script>

<div
	style={`--size: ${size}; 
--primary: ${primary}; 
--secondary: ${secondary};
--text-primary: ${textPrimary};
--text-secondary: ${textSecondary};
--border-radius: ${borderRadius}`}
>
	<div class="block">
		<div class="background">
			<div class="d-flex align-items-center" style="width: 100%; height: 100%">
				<div style="width: {half}%; height: 100%;" />
				<div class="bg-secondary" style="height: {lineHeight}; width: {100 - half * 2}%;">
					<div class="bg-primary" style="height: 100%; width: {(current * 100) / (total - 1)}%" />
				</div>
				<div style="width: {half}%; height: 100%" />
			</div>
		</div>

		<div class="foreground">
			<div class="d-flex justify-content-space-around">
				{#each steps as step, i}
					<div
						class="btn 
						  {i <= current ? `btn-primary` : `btn-secondary`}
						  "
						on:click={() => {
							onClick(i);
						}}
					>
						{#if step.icon}
							{#if i < current}
								<Check />
							{:else}
								<svelte:component this={step.icon} />
							{/if}
						{:else if i < current}
							<Check />
						{:else}
							{i + 1}
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="d-flex align-items-start">
		{#each steps as step, i}
			{#if typeof step.text != 'undefined'}
				<div class="d-flex justify-content-center" style="width: {100 / total}%;">
					<div class:text-primary={i <= current}>
						{step.text}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.block {
		display: flex;
		flex-flow: row nowrap;
	}
	.block .background,
	.block .foreground {
		box-sizing: border-box;
		width: 100%;
		flex: none;
	}

	.block .foreground {
		margin-left: -100%;
	}
	.btn {
		border-radius: var(--border-radius);
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--size);
		height: var(--size);
		font-size: calc(var(--size) * 0.5);
	}
	.btn:hover {
		cursor: pointer;
		filter: brightness(85%);
	}
	.btn.btn-primary {
		background-color: var(--primary);
		color: var(--text-primary);
	}
	.btn.btn-secondary {
		background-color: var(--secondary);
		color: var(--text-secondary);
	}
	.text-primary {
		color: var(--primary);
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
	.bg-secondary {
		background-color: var(--secondary);
	}
	.bg-primary {
		background-color: var(--primary);
	}
</style>
