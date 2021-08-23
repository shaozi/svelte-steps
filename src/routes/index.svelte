<script>
  import Steps from '$lib/Steps.svelte'
  import Icon from '../demo-lib/icons/Icon.svelte'
  import { HighlightSvelte } from 'svelte-highlight'
  import atomOneDark from 'svelte-highlight/src/styles/atom-one-dark'

  let demos = [
    {
      title: 'Basic Usage',
      code: `<script>
    import { Steps } from 'svelte-steps';
    let steps = [
        { text: 'step one' }, 
        { text: 'step two' }, 
        { text: 'the last step' }
    ];
<\/script>

<Steps {steps} />`,
      steps: [
        { text: 'steppingstone one' },
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
      code: `<Steps {steps} size="2rem" lineHeight="2rem"/>`,
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
  <nav
    class="d-flex align-items-center justify-content-between mt-5 border-bottom"
  >
    <h1 class="display-4">Svelte Steps</h1>
    <div>
      <a href="https://github.com/shaozi/svelte-steps.git">Github</a>
    </div>
  </nav>

  <div class="text-muted mb-5">
    A customizable step component written in Svelte
  </div>

  <h2>Install</h2>
  <HighlightSvelte
    code={`npm install --save-dev svelte-steps`}
    style="padding: 1rem; border-radius: 0.5rem;"
  />
  <h2>Usage</h2>
  {#each demos as demo}
    <div class="my-4">
      <h3>{demo.title}</h3>
      <div class="row">
        <div class="col-md-6">
          <HighlightSvelte
            code={demo.code}
            style="padding: 1rem; border-radius: 0.5rem;"
          />
        </div>
        <div class="col-md-6">
          <Steps steps={demo.steps} {current} {...demo.props} />
        </div>
      </div>
    </div>
  {/each}
  <h3>Use with Bootstrap</h3>
  <p>
    It by default uses <code>--bs-primary</code>, <code>--bs-secondary</code>,
    <code>--bs-light</code>, and <code>--bs-dark</code> css variables if they are
    defined. These css vars are defined in bootstrap css:
  </p>
  <HighlightSvelte
    code={`<!-- Include Bootstrap css in app.html <head></head> -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
    />`}
    style="padding: 1rem; border-radius: 0.5rem;"
  />

  <h2>Component Details</h2>
  <h3>Props</h3>
  <ul>
    <li>
      <code>steps</code>:
      <ul>
        <li>Array of object. Length has to be more than 1</li>
        <li>Required</li>
        <li>
          Each item is a step object that can have:
          <ul>
            <li><code>text</code>: The text displayed below each steps.</li>
            <li>
              <code>icon</code>: A svelte component displayed inside each steps.
            </li>
            <li>
              <code>iconProps</code>: An object that will be passed as props to
              the <code>icon</code> component.
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <code>current</code>: current step index. Number. Default <code>0</code>
    </li>
    <li>
      <code>size</code>: size of the step buttons. String. Default
      <code>"3rem"</code>
    </li>
    <li>
      <code>lineHeight</code>: height of the connecting lines between the step
      buttons. String. Default <code>"0.3rem"</code>
    </li>
    <li>
      <code>primary</code>: Primary color of passed and current steps. String.
      Default <code>'var(--bs-primary, #3a86ff)'</code>
    </li>
    <li>
      <code>secondary</code>: Secondary color of future steps. String. Default
      <code>'var(--bs-secondary, #bbbbc0)'</code>
    </li>
    <li>
      <code>light</code>: Primary color of text color in passed anc current
      steps. String. Default <code>'var(--bs-light, white)'</code>
    </li>
    <li>
      <code>dark</code>: Secondary color of text color in future steps. String.
      Default <code>'var(--bs-dark, black)'</code>
    </li>
    <li>
      <code>borderRadius</code>: Border radius of the step buttons. String.
      Default <code>'50%'</code> (circle)
    </li>
    <li>
      <code>fontFamily</code>: Font family of the component. String. Default
      <code>"'Helvetica Neue', Helvetica, Arial, sans-serif"</code>
    </li>
  </ul>
  <h3>Events</h3>
  <ul>
    <li>
      <code>on:click(e)</code>: click event with arg as the clicked step index
      as <code>e.detail.current</code> and last step index as
      <code>e.detail.last</code>
    </li>
  </ul>

  <footer
    class="d-flex justify-content-between align-items-center my-3 py-2 border-top"
  >
    <div class="text-secondary small">
      Built with <a href="https://kit.svelte.dev">SvelteKit</a>
    </div>
    <div><a href="https://github.com/shaozi/svelte-steps.git">Github</a></div>
    <div />
  </footer>
</div>

<style>
</style>
