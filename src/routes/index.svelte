<script>
  import Steps from '$lib/Steps.svelte'
  import Icon from '../demo-lib/icons/Icon.svelte'
  import { HighlightSvelte } from 'svelte-highlight'
  import atomOneDark from 'svelte-highlight/src/styles/atom-one-dark'

  let demos = [
    {
      title: 'Basic Usage',
      code: `<script>
	import Steps from 'svelte-steps';
	let steps = [
		{ text: 'step one' }, 
		{ text: 'step two' }, 
		{ text: 'the last step' }];
<\/script>

<Steps {steps} />`,
      steps: [
        { text: 'step one' },
        { text: 'step two' },
        { text: 'the last step' },
      ],
      props: {},
    },
    {
      title: 'With Icons',
      code: `let steps = [
	{ text: 'step one', icon: IconMoney },
	{ text: 'step two', icon: IconPaperClip },
	{ text: 'the last step', icon: IconPerson }
]`,
      steps: [
        { text: 'step one', icon: Icon, iconProps: { name: 'money' } },
        {
          text: 'step two',
          icon: Icon,
          iconProps: { name: 'paperclip', direction: 'n' },
        },
        { text: 'the last step', icon: Icon, iconProps: { name: 'person' } },
      ],
      props: {},
    },
    {
      title: 'Square Steps',
      code: `<Steps {steps} borderRadius="0"/>`,
      steps: [
        { text: 'step one', icon: Icon, iconProps: { name: 'money' } },
        {
          text: 'step two',
          icon: Icon,
          iconProps: { name: 'paperclip', direction: 'n' },
        },
        { text: 'the last step', icon: Icon, iconProps: { name: 'person' } },
      ],
      props: { borderRadius: 0 },
    },
    {
      title: 'Custom Color',
      code: `<Steps {steps} primary="#ff0000" secondary="#ffaaaa"/>`,
      steps: [
        { text: 'step one', icon: Icon, iconProps: { name: 'money' } },
        {
          text: 'step two',
          icon: Icon,
          iconProps: { name: 'paperclip', direction: 'n' },
        },
        { text: 'the last step', icon: Icon, iconProps: { name: 'person' } },
      ],
      props: { primary: '#ff0000', secondary: '#ffaaaa' },
    },
    {
      title: 'Custom Size',
      code: `<Steps {steps} size="2em" lineHeight="2px"/>`,
      steps: [
        { text: 'step one', icon: Icon, iconProps: { name: 'money' } },
        {
          text: 'step two',
          icon: Icon,
          iconProps: { name: 'paperclip', direction: 'n' },
        },
        { text: 'the last step', icon: Icon, iconProps: { name: 'person' } },
      ],
      props: { size: '2em', lineHeight: '2px' },
    },
    {
      title: 'No Text',
      code: `let steps = [
	{ icon: IconMoney },
	{ icon: IconPaperClip },
	{ icon: IconPerson }
]`,
      steps: [
        { icon: Icon, iconProps: { name: 'money' } },
        { icon: Icon, iconProps: { name: 'paperclip', direction: 'n' } },
        { icon: Icon, iconProps: { name: 'person' } },
      ],
      props: {},
    },
    {
      title: 'Bar',
      code: `<Steps {steps} size="2rem" lineHeight="2rem"`,
      steps: [
        { text: 'step one', icon: Icon, iconProps: { name: 'money' } },
        {
          text: 'step two',
          icon: Icon,
          iconProps: { name: 'paperclip', direction: 'n' },
        },
        { text: 'the last step', icon: Icon, iconProps: { name: 'person' } },
      ],
      props: { size: '2rem', lineHeight: '2rem' },
    },
  ]

  let current = 1
  let last = 0
</script>

<svelte:head>
  {@html atomOneDark}
</svelte:head>

<div class="container">
  <nav class="d-flex align-items-center justify-content-between mt-5">
    <h1 class="display-4">Svelte Steps</h1>
    <div>
      <a href="https://github.com/shaozi/svelte-steps.git">Github</a>
    </div>
  </nav>
  <hr />
  <div class="text-muted mb-5">
    A customizable step component written in Svelte
  </div>

  <h2>Examples</h2>
  {#each demos as demo}
    <div class="my-4">
      <h3>{demo.title}</h3>
      <HighlightSvelte
        code={demo.code}
        style="padding: 1rem; border-radius: 0.5rem;"
      />
      <Steps steps={demo.steps} {current} {...demo.props} />
    </div>
  {/each}
</div>

<style>
</style>
