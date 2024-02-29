<script>
  import { Steps } from '$lib'
  import Icon from '../demo-lib/icons/Icon.svelte'
  import { HighlightAuto } from 'svelte-highlight'
  import atomOneDark from 'svelte-highlight/styles/atom-one-dark'

  let showCode = true
  let vertical = false

  const oldIcon = {
    text: 'step two',
    icon: Icon,
    iconProps: { name: 'paperclip', direction: 'ne' },
  }
  const newIcon = {
    text: 'step two Updated',
    icon: Icon,
    iconProps: { name: 'github', direction: 'n', color: 'lightgreen' },
  }
  const oldIconNoText = {
    icon: Icon,
    iconProps: { name: 'paperclip', direction: 'ne' },
  }
  const newIconNoText = {
    icon: Icon,
    iconProps: { name: 'github', direction: 'n', color: 'lightgreen' },
  }
  const updateIcon2 = () => {
    stepsTextAndIcons[1] = stepsTextAndIcons[1] == oldIcon ? newIcon : oldIcon
    stepsIconsOnly[1] =
      stepsIconsOnly[1] == oldIconNoText ? newIconNoText : oldIconNoText
  }
  const stepsTextOnly = [
    { text: 'Step one' },
    { text: 'Step two' },
    { text: 'Step three' },
  ]
  const stepsIconsOnly = [
    { icon: Icon, iconProps: { name: 'money' } },
    oldIconNoText,
    { icon: Icon, iconProps: { name: 'person' } },
  ]
  let stepsTextAndIcons = [
    {
      text: 'step one',
      icon: Icon,
      iconProps: { name: 'money' },
    },
    oldIcon,
    { text: 'the last step', icon: Icon, iconProps: { name: 'person' } },
  ]

  $: demos = [
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
      steps: stepsTextOnly,
      props: {},
    },
    {
      title: 'With Icons',
      code: `let steps = [
        { text: 'step one', icon: IconMoney },
        { text: 'step two', icon: IconPaperClip },
        { text: 'the last step', icon: IconPerson }
    ]`,
      steps: stepsTextAndIcons,
      props: {},
    },
    {
      title: 'Square Steps',
      code: `<Steps {steps} borderRadius="0"/>`,
      steps: stepsTextAndIcons,
      props: { borderRadius: '0' },
    },
    {
      title: 'Custom Color',
      code: `<Steps {steps} primary="#ff0000" secondary="#ffaaaa"/>`,
      steps: stepsTextAndIcons,
      props: { primary: '#ff0000', secondary: '#ffaaaa' },
    },
    {
      title: 'Custom Size',
      code: `<Steps {steps} size="2em" line="2px"/>`,
      steps: stepsTextAndIcons,
      props: { size: '2em', line: '2px' },
    },
    {
      title: 'No Text',
      code: `let steps = [
        { icon: IconMoney },
        { icon: IconPaperClip },
        { icon: IconPerson }
    ]`,
      steps: stepsIconsOnly,
      props: {},
    },
    {
      title: 'Bar',
      code: `<Steps {steps} size="2rem" line="2rem"/>`,
      steps: stepsTextAndIcons,
      props: { size: '2rem', line: '2rem' },
    },
    {
      title: 'Steps - Reversed',
      code: `<Steps reverse {steps} />`,
      steps: stepsTextAndIcons,
      props: { reverse: true },
    },
    {
      title: 'Steps - Not clickable',
      code: `<Steps clickable={false} {steps}/>`,
      steps: stepsTextAndIcons,
      props: { clickable: false },
    },
    {
      title: 'Vertical Steps',
      code: `<Steps vertical {steps} />`,
      steps: stepsTextAndIcons,
      props: { vertical: true },
    },
    {
      title: 'Vertical Steps - Reversed',
      code: `<Steps vertical reverse {steps} />`,
      steps: stepsTextAndIcons,
      props: { vertical: true, reverse: true },
    },
  ]

  let current = 1

  let currentStep = 0
  let lastStep = 0
  const onClick = (
    /** @type {{ detail: { current: number; last: number; }; }} */ e
  ) => {
    currentStep = e.detail.current
    lastStep = e.detail.last
  }
</script>

<svelte:head>
  {@html atomOneDark}
</svelte:head>

<div class="container">
  <nav
    class="d-flex align-items-center justify-content-between mt-5 border-bottom"
  >
    <h1 class="display-4">Svelte Steps</h1>
    <div class="">
      <a
        href="https://github.com/shaozi/svelte-steps.git"
        class="d-flex align-items-center ms-1"
      >
        <Icon name="github" />
        <span class="ms-1">GitHub</span>
      </a>
    </div>
  </nav>

  <div class="text-muted mb-5">
    A customizable step component written in Svelte
  </div>

  <h2>Install</h2>
  <HighlightAuto code={`npm install --save-dev svelte-steps`} />
  <h2>
    Usag<span
      on:click={() => {
        showCode = !showCode
      }}
      on:keydown={() => {}}>e</span
    ><span
      on:click={() => {
        vertical = !vertical
      }}
      on:keydown={() => {}}>:</span
    >
  </h2>

  <div class="row d-flex align-items-center my-4">
    {#each demos as demo}
      <div class="{showCode ? 'col-12' : 'col-md-6 text-end'} ms-auto">
        <h4>{demo.title}</h4>
      </div>
      {#if showCode}
        <div class="col-md-6 my-3">
          <HighlightAuto code={demo.code} />
        </div>
      {/if}
      <div class="col-md-6 my-3">
        <Steps steps={demo.steps} bind:current {vertical} {...demo.props} />
      </div>
    {/each}

    <div class="col-12 my-3">
      <h4>Events</h4>
    </div>
    <div class="col-md-6 my-3">
      <HighlightAuto
        code={`<script>
  const onClick = (e) => {
    current = e.detail.current
    last = e.detail.last
  }
<\/script>
<Steps on:click={onClick} {steps} />
<div>Clicked: {current}</div>
<div>Last: {last}</div>
`}
      />
    </div>
    <div class="col-md-6 my-3">
      <Steps bind:current on:click={onClick} steps={stepsTextAndIcons} />
      <div class="mt-2 alert alert-info">
        <div class="text-center">Clicked: <code>{currentStep}</code></div>
        <div class="text-center">Last: <code>{lastStep}</code></div>
      </div>
    </div>

    <div>
      <h4>Change Step Icon Programmatically</h4>
      <button class="btn btn-primary" on:click={updateIcon2}
        >Change step 2 icon</button
      >
    </div>

    <div class="col-12 my-3">
      <h4>Use with Bootstrap</h4>
    </div>

    <div class="col-md-6 my-3">
      It by default uses <code>--bs-primary</code>, <code>--bs-secondary</code>,
      <code>--bs-danger</code>
      <code>--bs-light</code>, and <code>--bs-dark</code> css variables if they are
      defined. These css vars are defined in bootstrap css:
    </div>
    <div class="col-md-6 my-3">
      <HighlightAuto
        code={`<!-- Include Bootstrap css in app.html <head></head> -->
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
/>`}
      />
    </div>
  </div>

  <h2>Component Details</h2>
  <h4>Props</h4>
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
      <code>"3rem"</code> (<code>"2rem"</code> for vertical steps)
    </li>
    <li>
      <code>line</code>: thickness of the connecting lines between the step
      buttons. String. Default <code>"0.3rem"</code> (<code>"0.15rem"</code> for
      vertical steps)
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
    <li>
      <code>vertical</code>: Vertical steps. Default: <code>false</code>
    </li>
    <li>
      <code>reverse</code>: For horizontal steps, reverse the step from right to
      the left; for vertical steps, reverse puts text labels to the left.
      Default: <code>false</code>
    </li>
    <li>
      <code>clickable</code>: When set to <code>false</code>, Clicking icons and
      labels will not change step. You have to change <code>current</code> to
      change step. Default <code>true</code>
    </li>
    <li>
      <code>checkIcon</code>: User defined check icon for passed steps. If not
      specified, use the default check mark. Set to <code>null</code> if you don't
      want a check icon.
    </li>
    <li>
      <code>alertIcon</code>: User defined alert icon for passed steps that has
      truthful <code>alert</code> property. If not specified, use the default
      alert icon. Set to <code>null</code> if you don't want an alert icon.
    </li>
    <li>
      <code>alertColor</code>: User defined bg color for passed steps that has
      truthful <code>alert</code> property. Default
      <code>'var(--bs-danger, #dc3545)'</code>
    </li>
  </ul>

  <h4>Events</h4>
  <ul>
    <li>
      <code>on:click(e)</code>: click event. Event detail object has two keys:
      <ul>
        <li>
          <code>e.detail.current</code>: the index of current step
        </li>
        <li>
          <code>e.detail.last</code>: the index of last step
        </li>
      </ul>
    </li>
  </ul>

  <footer
    class="d-flex justify-content-between align-items-center my-3 py-2 border-top"
  >
    <div />
    <div class="text-secondary small">
      Built with
      <span class="text-danger h5"><Icon name="svelte" /></span>
      <a href="https://kit.svelte.dev">SvelteKit</a>
    </div>
    <div />
  </footer>
</div>

<style>
  :global(.hljs) {
    border-radius: 0.4rem;
  }
</style>
