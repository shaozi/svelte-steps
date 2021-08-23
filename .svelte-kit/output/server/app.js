import { respond } from "@sveltejs/kit/ssr";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import javascript from "highlight.js/lib/languages/javascript";
import css$3 from "highlight.js/lib/languages/css";
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
Promise.resolve();
const boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function spread(args, classes_to_add) {
  const attributes = Object.assign({}, ...args);
  if (classes_to_add) {
    if (attributes.class == null) {
      attributes.class = classes_to_add;
    } else {
      attributes.class += " " + classes_to_add;
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
const escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key in obj) {
    result[key] = escape_attribute_value(obj[key]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function afterUpdate() {
}
var root_svelte_svelte_type_style_lang = "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}";
const css$2 = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$2);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
let base = "";
let assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
const template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n\n		<link\n			href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"\n			rel="stylesheet"\n			integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"\n			crossorigin="anonymous"\n		/>\n\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
let options = null;
const default_settings = { paths: { "base": "", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-64ceb5e1.js",
      css: [assets + "/_app/assets/start-61d1577b.css"],
      js: [assets + "/_app/start-64ceb5e1.js", assets + "/_app/chunks/vendor-5d68c66f.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: false,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
const empty = () => ({});
const manifest = {
  assets: [{ "file": "demo.png", "size": 80236, "type": "image/png" }, { "file": "favicon.png", "size": 1571, "type": "image/png" }],
  layout: ".svelte-kit/build/components/layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
const get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve }) => resolve(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
const module_lookup = {
  ".svelte-kit/build/components/layout.svelte": () => Promise.resolve().then(function() {
    return layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  })
};
const metadata_lookup = { ".svelte-kit/build/components/layout.svelte": { "entry": "layout.svelte-daef9be3.js", "css": [], "js": ["layout.svelte-daef9be3.js", "chunks/vendor-5d68c66f.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-c2a0b112.js", "css": [], "js": ["error.svelte-c2a0b112.js", "chunks/vendor-5d68c66f.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-6440fc24.js", "css": ["assets/pages/index.svelte-5ac433a4.css"], "js": ["pages/index.svelte-6440fc24.js", "chunks/vendor-5d68c66f.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});
var layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Layout
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load
});
const Check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stroke = "currentColor" } = $$props;
  if ($$props.stroke === void 0 && $$bindings.stroke && stroke !== void 0)
    $$bindings.stroke(stroke);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"1em"}" height="${"1em"}" viewBox="${"0 0 24 24"}" fill="${"none"}"${add_attribute("stroke", stroke, 0)} stroke-width="${"2"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"feather feather-check"}"><polyline points="${"20 6 9 17 4 12"}"></polyline></svg>`;
});
var Steps_svelte_svelte_type_style_lang = ".steps-container.svelte-1g73mtc.svelte-1g73mtc{font-family:var(--font-family)}.block.svelte-1g73mtc.svelte-1g73mtc{display:flex;flex-flow:row nowrap}.block.svelte-1g73mtc .background.svelte-1g73mtc,.block.svelte-1g73mtc .foreground.svelte-1g73mtc{box-sizing:border-box;width:100%;flex:none}.block.svelte-1g73mtc .foreground.svelte-1g73mtc{margin-left:-100%}.step.svelte-1g73mtc.svelte-1g73mtc{border-radius:var(--border-radius);display:flex;align-items:center;justify-content:center;width:var(--size);height:var(--size);font-size:calc(var(--size) * 0.5)}.step.svelte-1g73mtc.svelte-1g73mtc:hover{cursor:pointer;filter:brightness(85%)}.d-flex.svelte-1g73mtc.svelte-1g73mtc{display:flex}.d-flex.align-items-start.svelte-1g73mtc.svelte-1g73mtc{align-items:flex-start}.d-flex.align-items-center.svelte-1g73mtc.svelte-1g73mtc{align-items:center}.d-flex.justify-content-center.svelte-1g73mtc.svelte-1g73mtc{justify-content:center}.d-flex.justify-content-space-around.svelte-1g73mtc.svelte-1g73mtc{justify-content:space-around}.text-primary.svelte-1g73mtc.svelte-1g73mtc{color:var(--primary) !important}.text-light.svelte-1g73mtc.svelte-1g73mtc{color:var(--light) !important}.text-dark.svelte-1g73mtc.svelte-1g73mtc{color:var(--dark) !important}.bg-secondary.svelte-1g73mtc.svelte-1g73mtc{background-color:var(--secondary) !important}.bg-primary.svelte-1g73mtc.svelte-1g73mtc{background-color:var(--primary) !important}.shadow.svelte-1g73mtc.svelte-1g73mtc{box-shadow:0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important}.steps__label.svelte-1g73mtc.svelte-1g73mtc{text-align:center}";
const css$1 = {
  code: ".steps-container.svelte-1g73mtc.svelte-1g73mtc{font-family:var(--font-family)}.block.svelte-1g73mtc.svelte-1g73mtc{display:flex;flex-flow:row nowrap}.block.svelte-1g73mtc .background.svelte-1g73mtc,.block.svelte-1g73mtc .foreground.svelte-1g73mtc{box-sizing:border-box;width:100%;flex:none}.block.svelte-1g73mtc .foreground.svelte-1g73mtc{margin-left:-100%}.step.svelte-1g73mtc.svelte-1g73mtc{border-radius:var(--border-radius);display:flex;align-items:center;justify-content:center;width:var(--size);height:var(--size);font-size:calc(var(--size) * 0.5)}.step.svelte-1g73mtc.svelte-1g73mtc:hover{cursor:pointer;filter:brightness(85%)}.d-flex.svelte-1g73mtc.svelte-1g73mtc{display:flex}.d-flex.align-items-start.svelte-1g73mtc.svelte-1g73mtc{align-items:flex-start}.d-flex.align-items-center.svelte-1g73mtc.svelte-1g73mtc{align-items:center}.d-flex.justify-content-center.svelte-1g73mtc.svelte-1g73mtc{justify-content:center}.d-flex.justify-content-space-around.svelte-1g73mtc.svelte-1g73mtc{justify-content:space-around}.text-primary.svelte-1g73mtc.svelte-1g73mtc{color:var(--primary) !important}.text-light.svelte-1g73mtc.svelte-1g73mtc{color:var(--light) !important}.text-dark.svelte-1g73mtc.svelte-1g73mtc{color:var(--dark) !important}.bg-secondary.svelte-1g73mtc.svelte-1g73mtc{background-color:var(--secondary) !important}.bg-primary.svelte-1g73mtc.svelte-1g73mtc{background-color:var(--primary) !important}.shadow.svelte-1g73mtc.svelte-1g73mtc{box-shadow:0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important}.steps__label.svelte-1g73mtc.svelte-1g73mtc{text-align:center}",
  map: '{"version":3,"file":"Steps.svelte","sources":["Steps.svelte"],"sourcesContent":["<!--\\n    @component \\n\\n    @name svelte-steps\\n\\n    @description This is the steps component.\\n\\n    @props \\n    \\n    - `steps`:\\n\\t- Array of object. Length has to be more than 1\\n\\t- Required\\n\\t- Each item is a step object that can have:\\n\\t\\t- `text`: The text displayed below each steps.\\n\\t\\t- `icon`: A svelte component displayed inside each steps.\\n\\t\\t- `iconProps`: An object that will be passed as props to the `icon` component.\\n\\t- `current`: current step index. Number. Default `0`\\n\\t- `size`: size of the step buttons. String. Default `\\"3rem\\"`\\n\\t- `lineHeight`: height of the connecting lines between the step buttons. String. Default `\\"0.3rem\\"`\\n\\t- `primary`: Primary color of passed and current steps. String. Default `\'var(--bs-primary, #3a86ff)\'`\\n\\t- `secondary`: Secondary color of future steps. String. Default `\'var(--bs-secondary, #bbbbc0)\'`\\n\\t- `light`: Primary color of text color in passed anc current steps. String. Default `\'var(--bs-light, white)\'`\\n\\t- `dark`: Secondary color of text color in future steps. String. Default `\'var(--bs-dark, black)\'`\\n\\t- `borderRadius`: Border radius of the step buttons. String. Default `\'50%\'` (circle)\\n\\t- `fontFamily`: Font family of the component. String. Default `\\"\'Helvetica Neue\', Helvetica, Arial, sans-serif\\"`\\n\\n\\t@events\\n\\n\\t- `on:click(e)`: click event with arg as the clicked step index as `e.detail.current` and last step index as `e.detail.last`\\n-->\\n<script>\\n  // A bootstrap step component\\n  import { createEventDispatcher } from \'svelte\'\\n  import Check from \'./Check.svelte\'\\n\\n  export let steps\\n  export let current = 0\\n  export let size = \'3rem\'\\n  export let lineHeight = \'0.3rem\'\\n  export let primary = \'var(--bs-primary, #3a86ff)\'\\n  export let secondary = \'var(--bs-secondary, #bbbbc0)\'\\n  export let light = \'var(--bs-light, white)\'\\n  export let dark = \'var(--bs-dark, black)\'\\n  export let borderRadius = \'50%\'\\n  export let fontFamily = \'\'\\n\\n  if (current > steps.length - 1) {\\n    current = steps.length - 1\\n  }\\n  if (current < 0) {\\n    current = 0\\n  }\\n  $: total = steps.length\\n  $: half = 100 / steps.length / 2\\n  const dispatch = createEventDispatcher()\\n  let onClick = (i) => {\\n    let last = current\\n    current = i\\n    dispatch(\'click\', { current, last })\\n  }\\n<\/script>\\n\\n<div\\n  class=\\"steps-container\\"\\n  style={`--size: ${size}; \\n\\t\\t\\t--primary: ${primary}; \\n\\t\\t\\t--secondary: ${secondary};\\n\\t\\t\\t--light: ${light};\\n\\t\\t\\t--dark: ${dark};\\n\\t\\t\\t--border-radius: ${borderRadius};\\n\\t\\t\\t--font-family: ${\\n        fontFamily || \\"\'Helvetica Neue\', Helvetica, Arial, sans-serif\\"\\n      };`}\\n>\\n  <div class=\\"block\\">\\n    <div class=\\"background\\">\\n      <div class=\\"d-flex align-items-center\\" style=\\"width: 100%; height: 100%\\">\\n        <div style=\\"width: {half}%; height: 100%;\\" />\\n        <div\\n          class=\\"bg-secondary\\"\\n          style=\\"height: {lineHeight}; width: {100 - half * 2}%;\\"\\n        >\\n          <div\\n            class=\\"bg-primary\\"\\n            style=\\"height: 100%; width: {(current * 100) / (total - 1)}%\\"\\n          />\\n        </div>\\n        <div style=\\"width: {half}%; height: 100%\\" />\\n      </div>\\n    </div>\\n\\n    <div class=\\"foreground\\">\\n      <div class=\\"d-flex justify-content-space-around\\">\\n        {#each steps as step, i}\\n          <div\\n            class=\\"step \\n\\t\\t\\t\\t\\t\\t  {i <= current ? `bg-primary text-light` : `bg-secondary text-light`}\\n\\t\\t\\t\\t\\t\\t  \\"\\n            class:shadow={i == current}\\n            on:click={() => {\\n              onClick(i)\\n            }}\\n          >\\n            {#if step.icon}\\n              {#if i < current}\\n                <Check />\\n              {:else if step.iconProps}\\n                <svelte:component this={step.icon} {...step.iconProps} />\\n              {:else}\\n                <svelte:component this={step.icon} />\\n              {/if}\\n            {:else if i < current}\\n              <Check />\\n            {:else}\\n              <span class=\\"steps__number\\">{i + 1}</span>\\n            {/if}\\n          </div>\\n        {/each}\\n      </div>\\n    </div>\\n  </div>\\n\\n  <div class=\\"d-flex align-items-start\\">\\n    {#each steps as step, i}\\n      {#if typeof step.text != \'undefined\'}\\n        <div\\n          class=\\"d-flex justify-content-center\\"\\n          style=\\"width: {100 / total}%;\\"\\n        >\\n          <div class:text-primary={i <= current} class=\\"steps__label\\">\\n            {step.text}\\n          </div>\\n        </div>\\n      {/if}\\n    {/each}\\n  </div>\\n</div>\\n\\n<style>\\n  .steps-container {\\n    font-family: var(--font-family);\\n  }\\n  .block {\\n    display: flex;\\n    flex-flow: row nowrap;\\n  }\\n  .block .background,\\n  .block .foreground {\\n    box-sizing: border-box;\\n    width: 100%;\\n    flex: none;\\n  }\\n\\n  .block .foreground {\\n    margin-left: -100%;\\n  }\\n  .step {\\n    border-radius: var(--border-radius);\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    width: var(--size);\\n    height: var(--size);\\n    font-size: calc(var(--size) * 0.5);\\n  }\\n  .step:hover {\\n    cursor: pointer;\\n    filter: brightness(85%);\\n  }\\n\\n  .d-flex {\\n    display: flex;\\n  }\\n  .d-flex.align-items-start {\\n    align-items: flex-start;\\n  }\\n  .d-flex.align-items-center {\\n    align-items: center;\\n  }\\n  .d-flex.justify-content-center {\\n    justify-content: center;\\n  }\\n  .d-flex.justify-content-space-around {\\n    justify-content: space-around;\\n  }\\n\\n  .text-primary {\\n    color: var(--primary) !important;\\n  }\\n  .text-light {\\n    color: var(--light) !important;\\n  }\\n  .text-dark {\\n    color: var(--dark) !important;\\n  }\\n  .bg-secondary {\\n    background-color: var(--secondary) !important;\\n  }\\n  .bg-primary {\\n    background-color: var(--primary) !important;\\n  }\\n  .shadow {\\n    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;\\n  }\\n  .steps__label {\\n    text-align: center;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA2IE,gBAAgB,8BAAC,CAAC,AAChB,WAAW,CAAE,IAAI,aAAa,CAAC,AACjC,CAAC,AACD,MAAM,8BAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CAAC,MAAM,AACvB,CAAC,AACD,qBAAM,CAAC,0BAAW,CAClB,qBAAM,CAAC,WAAW,eAAC,CAAC,AAClB,UAAU,CAAE,UAAU,CACtB,KAAK,CAAE,IAAI,CACX,IAAI,CAAE,IAAI,AACZ,CAAC,AAED,qBAAM,CAAC,WAAW,eAAC,CAAC,AAClB,WAAW,CAAE,KAAK,AACpB,CAAC,AACD,KAAK,8BAAC,CAAC,AACL,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,IAAI,MAAM,CAAC,CAClB,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,SAAS,CAAE,KAAK,IAAI,MAAM,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,AACpC,CAAC,AACD,mCAAK,MAAM,AAAC,CAAC,AACX,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,WAAW,GAAG,CAAC,AACzB,CAAC,AAED,OAAO,8BAAC,CAAC,AACP,OAAO,CAAE,IAAI,AACf,CAAC,AACD,OAAO,kBAAkB,8BAAC,CAAC,AACzB,WAAW,CAAE,UAAU,AACzB,CAAC,AACD,OAAO,mBAAmB,8BAAC,CAAC,AAC1B,WAAW,CAAE,MAAM,AACrB,CAAC,AACD,OAAO,uBAAuB,8BAAC,CAAC,AAC9B,eAAe,CAAE,MAAM,AACzB,CAAC,AACD,OAAO,6BAA6B,8BAAC,CAAC,AACpC,eAAe,CAAE,YAAY,AAC/B,CAAC,AAED,aAAa,8BAAC,CAAC,AACb,KAAK,CAAE,IAAI,SAAS,CAAC,CAAC,UAAU,AAClC,CAAC,AACD,WAAW,8BAAC,CAAC,AACX,KAAK,CAAE,IAAI,OAAO,CAAC,CAAC,UAAU,AAChC,CAAC,AACD,UAAU,8BAAC,CAAC,AACV,KAAK,CAAE,IAAI,MAAM,CAAC,CAAC,UAAU,AAC/B,CAAC,AACD,aAAa,8BAAC,CAAC,AACb,gBAAgB,CAAE,IAAI,WAAW,CAAC,CAAC,UAAU,AAC/C,CAAC,AACD,WAAW,8BAAC,CAAC,AACX,gBAAgB,CAAE,IAAI,SAAS,CAAC,CAAC,UAAU,AAC7C,CAAC,AACD,OAAO,8BAAC,CAAC,AACP,UAAU,CAAE,CAAC,CAAC,MAAM,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAAU,AAC1D,CAAC,AACD,aAAa,8BAAC,CAAC,AACb,UAAU,CAAE,MAAM,AACpB,CAAC"}'
};
const Steps = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let total;
  let half;
  let { steps } = $$props;
  let { current: current2 = 0 } = $$props;
  let { size = "3rem" } = $$props;
  let { lineHeight = "0.3rem" } = $$props;
  let { primary = "var(--bs-primary, #3a86ff)" } = $$props;
  let { secondary = "var(--bs-secondary, #bbbbc0)" } = $$props;
  let { light = "var(--bs-light, white)" } = $$props;
  let { dark = "var(--bs-dark, black)" } = $$props;
  let { borderRadius = "50%" } = $$props;
  let { fontFamily = "" } = $$props;
  if (current2 > steps.length - 1) {
    current2 = steps.length - 1;
  }
  if (current2 < 0) {
    current2 = 0;
  }
  createEventDispatcher();
  if ($$props.steps === void 0 && $$bindings.steps && steps !== void 0)
    $$bindings.steps(steps);
  if ($$props.current === void 0 && $$bindings.current && current2 !== void 0)
    $$bindings.current(current2);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.lineHeight === void 0 && $$bindings.lineHeight && lineHeight !== void 0)
    $$bindings.lineHeight(lineHeight);
  if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0)
    $$bindings.primary(primary);
  if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0)
    $$bindings.secondary(secondary);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.dark === void 0 && $$bindings.dark && dark !== void 0)
    $$bindings.dark(dark);
  if ($$props.borderRadius === void 0 && $$bindings.borderRadius && borderRadius !== void 0)
    $$bindings.borderRadius(borderRadius);
  if ($$props.fontFamily === void 0 && $$bindings.fontFamily && fontFamily !== void 0)
    $$bindings.fontFamily(fontFamily);
  $$result.css.add(css$1);
  total = steps.length;
  half = 100 / steps.length / 2;
  return `


<div class="${"steps-container svelte-1g73mtc"}"${add_attribute("style", `--size: ${size}; 
			--primary: ${primary}; 
			--secondary: ${secondary};
			--light: ${light};
			--dark: ${dark};
			--border-radius: ${borderRadius};
			--font-family: ${fontFamily || "'Helvetica Neue', Helvetica, Arial, sans-serif"};`, 0)}><div class="${"block svelte-1g73mtc"}"><div class="${"background svelte-1g73mtc"}"><div class="${"d-flex align-items-center svelte-1g73mtc"}" style="${"width: 100%; height: 100%"}"><div style="${"width: " + escape(half) + "%; height: 100%;"}"></div>
        <div class="${"bg-secondary svelte-1g73mtc"}" style="${"height: " + escape(lineHeight) + "; width: " + escape(100 - half * 2) + "%;"}"><div class="${"bg-primary svelte-1g73mtc"}" style="${"height: 100%; width: " + escape(current2 * 100 / (total - 1)) + "%"}"></div></div>
        <div style="${"width: " + escape(half) + "%; height: 100%"}"></div></div></div>

    <div class="${"foreground svelte-1g73mtc"}"><div class="${"d-flex justify-content-space-around svelte-1g73mtc"}">${each(steps, (step, i) => `<div class="${[
    "step " + escape(i <= current2 ? `bg-primary text-light` : `bg-secondary text-light`) + " svelte-1g73mtc",
    i == current2 ? "shadow" : ""
  ].join(" ").trim()}">${step.icon ? `${i < current2 ? `${validate_component(Check, "Check").$$render($$result, {}, {}, {})}` : `${step.iconProps ? `${validate_component(step.icon || missing_component, "svelte:component").$$render($$result, Object.assign(step.iconProps), {}, {})}` : `${validate_component(step.icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}`}`}` : `${i < current2 ? `${validate_component(Check, "Check").$$render($$result, {}, {}, {})}` : `<span class="${"steps__number"}">${escape(i + 1)}</span>`}`}
          </div>`)}</div></div></div>

  <div class="${"d-flex align-items-start svelte-1g73mtc"}">${each(steps, (step, i) => `${typeof step.text != "undefined" ? `<div class="${"d-flex justify-content-center svelte-1g73mtc"}" style="${"width: " + escape(100 / total) + "%;"}"><div class="${["steps__label svelte-1g73mtc", i <= current2 ? "text-primary" : ""].join(" ").trim()}">${escape(step.text)}</div>
        </div>` : ``}`)}</div>
</div>`;
});
var pathsByName = {
  arrow: [
    "M0.200275 13.2782C0.200275 12.4153 0.89983 11.7157 1.76278 11.7157H23.6378C24.5007 11.7157 25.2003 12.4153 25.2003 13.2782C25.2003 14.1411 24.5007 14.8407 23.6378 14.8407H1.76278C0.89983 14.8407 0.200275 14.1411 0.200275 13.2782Z",
    "M11.5954 1.23584C12.2056 0.62565 13.1949 0.62565 13.8051 1.23584L24.7426 12.1733C25.3528 12.7835 25.3528 13.7729 24.7426 14.3831L13.8051 25.3206C13.1949 25.9307 12.2056 25.9307 11.5954 25.3206C10.9852 24.7104 10.9852 23.721 11.5954 23.1108L21.4281 13.2782L11.5954 3.44555C10.9852 2.83536 10.9852 1.84604 11.5954 1.23584Z"
  ],
  asterisk: [
    "M13.9518 1.05422C13.9518 0.471989 13.4798 0 12.8976 0C12.3154 0 11.8434 0.471989 11.8434 1.05422V10.5617C11.7668 10.6064 11.6947 10.6616 11.6291 10.7272C11.5923 10.764 11.5587 10.8029 11.5285 10.8434H2.05422C1.47199 10.8434 1 11.3154 1 11.8976C1 12.4798 1.47199 12.9518 2.05422 12.9518H11.4635C11.5083 13.0284 11.5634 13.1005 11.6291 13.1661C11.6947 13.2318 11.7668 13.2869 11.8434 13.3316V23.9458C11.8434 24.528 12.3154 25 12.8976 25C13.4798 25 13.9518 24.528 13.9518 23.9458V13.0721C13.9555 13.0685 13.9593 13.0648 13.963 13.0611C13.9977 13.0264 14.0295 12.9899 14.0584 12.9518H23.741C24.3232 12.9518 24.7952 12.4798 24.7952 11.8976C24.7952 11.3154 24.3232 10.8434 23.741 10.8434H13.974L13.963 10.8322L13.9518 10.8212V1.05422ZM21.9718 2.82342C22.3835 3.23512 22.3835 3.90261 21.9718 4.31431L21.5502 4.73582C21.1385 5.14752 20.4711 5.14752 20.0594 4.73582C19.6477 4.32413 19.6477 3.65663 20.0594 3.24494L20.4809 2.82342C20.8926 2.41172 21.5601 2.41172 21.9718 2.82342ZM18.1781 6.61706C18.5898 7.02876 18.5898 7.69625 18.1781 8.10795L17.3351 8.95098C16.9234 9.36267 16.2559 9.36267 15.8442 8.95098C15.4325 8.53928 15.4325 7.87179 15.8442 7.46009L16.6872 6.61706C17.0989 6.20536 17.7664 6.20536 18.1781 6.61706ZM9.74782 15.0474C10.1595 15.4591 10.1595 16.1266 9.74782 16.5383L8.90479 17.3813C8.49309 17.793 7.8256 17.793 7.4139 17.3813C7.0022 16.9696 7.0022 16.3021 7.4139 15.8904L8.25693 15.0474C8.66863 14.6357 9.33612 14.6357 9.74782 15.0474ZM5.53267 19.2625C5.94436 19.6742 5.94436 20.3417 5.53267 20.7534L5.11115 21.1749C4.69945 21.5866 4.03196 21.5866 3.62026 21.1749C3.20856 20.7632 3.20856 20.0957 3.62026 19.684L4.04178 19.2625C4.45347 18.8508 5.12097 18.8508 5.53267 19.2625ZM20.4809 21.0699C20.8926 21.4816 21.5601 21.4816 21.9718 21.0699C22.3835 20.6582 22.3835 19.9907 21.9718 19.579L21.5502 19.1575C21.1385 18.7458 20.4711 18.7458 20.0594 19.1575C19.6477 19.5692 19.6477 20.2367 20.0594 20.6484L20.4809 21.0699ZM16.6872 17.2763C17.0989 17.688 17.7664 17.688 18.1781 17.2763C18.5898 16.8646 18.5898 16.1971 18.1781 15.7854L17.3351 14.9424C16.9234 14.5307 16.2559 14.5307 15.8442 14.9424C15.4325 15.3541 15.4325 16.0216 15.8442 16.4333L16.6872 17.2763ZM8.25693 8.84599C8.66863 9.25769 9.33612 9.25769 9.74782 8.84599C10.1595 8.43429 10.1595 7.7668 9.74782 7.3551L8.90479 6.51207C8.49309 6.10037 7.8256 6.10037 7.4139 6.51207C7.0022 6.92377 7.0022 7.59126 7.4139 8.00296L8.25693 8.84599ZM4.04178 4.63084C4.45347 5.04253 5.12097 5.04253 5.53267 4.63084C5.94436 4.21914 5.94436 3.55165 5.53267 3.13995L5.11115 2.71843C4.69945 2.30674 4.03196 2.30673 3.62026 2.71843C3.20856 3.13013 3.20856 3.79762 3.62026 4.20932L4.04178 4.63084Z"
  ],
  check: [
    "M24.3522 3.64786C23.4883 2.78405 22.0878 2.78405 21.224 3.64786L8.64198 16.2299L3.77601 11.3639C2.9122 10.5001 1.51168 10.5001 0.647861 11.3639C-0.215954 12.2277 -0.215954 13.6283 0.647861 14.4921L7.07791 20.9221C7.94172 21.7859 9.34224 21.7859 10.2061 20.9221L24.3522 6.77601L23.6974 6.12128L24.3522 6.77601C25.216 5.9122 25.216 4.51168 24.3522 3.64786L23.6974 4.30259L24.3522 3.64786Z"
  ],
  coffee: [
    "M6.69069 1.96879C6.69069 1.36848 6.20405 0.881836 5.60374 0.881836C5.00343 0.881836 4.51678 1.36848 4.51678 1.96879V5.22966C4.51678 5.82997 5.00343 6.31662 5.60374 6.31662C6.20405 6.31662 6.69069 5.82997 6.69069 5.22966V1.96879ZM0.168955 9.57749C0.168955 8.97718 0.655602 8.49053 1.25591 8.49053H18.6472H19.7342C21.1756 8.49053 22.5579 9.06312 23.5771 10.0823C24.5964 11.1016 25.169 12.4839 25.169 13.9253C25.169 15.3667 24.5964 16.7491 23.5771 17.7683C22.5579 18.7875 21.1756 19.3601 19.7342 19.3601C19.7342 20.8015 19.1616 22.1838 18.1424 23.2031C17.1231 24.2223 15.7408 24.7949 14.2994 24.7949H5.60374C4.16234 24.7949 2.77998 24.2223 1.76077 23.2031C0.741547 22.1838 0.168955 20.8015 0.168955 19.3601V9.57749ZM19.7342 17.1862V10.6644C20.599 10.6644 21.4284 11.008 22.04 11.6195C22.6515 12.2311 22.995 13.0605 22.995 13.9253C22.995 14.7901 22.6515 15.6196 22.04 16.2311C21.4284 16.8426 20.599 17.1862 19.7342 17.1862ZM17.5603 10.6644V18.2731V19.3601C17.5603 20.2249 17.2167 21.0543 16.6052 21.6659C15.9936 22.2774 15.1642 22.621 14.2994 22.621H5.60374C4.7389 22.621 3.90949 22.2774 3.29795 21.6659C2.68642 21.0543 2.34287 20.2249 2.34287 19.3601V10.6644H17.5603ZM9.95156 0.881836C10.5519 0.881836 11.0385 1.36848 11.0385 1.96879V5.22966C11.0385 5.82997 10.5519 6.31662 9.95156 6.31662C9.35125 6.31662 8.86461 5.82997 8.86461 5.22966V1.96879C8.86461 1.36848 9.35125 0.881836 9.95156 0.881836ZM15.3863 1.96879C15.3863 1.36848 14.8997 0.881836 14.2994 0.881836C13.6991 0.881836 13.2124 1.36848 13.2124 1.96879V5.22966C13.2124 5.82997 13.6991 6.31662 14.2994 6.31662C14.8997 6.31662 15.3863 5.82997 15.3863 5.22966V1.96879Z"
  ],
  copy: [
    "M2.98325 3.58322C3.19636 3.37011 3.48539 3.25039 3.78678 3.25039H14.014C14.3154 3.25039 14.6045 3.37011 14.8176 3.58322C15.0307 3.79633 15.1504 4.08537 15.1504 4.38675V5.52312C15.1504 6.15071 15.6592 6.65948 16.2868 6.65948C16.9144 6.65948 17.4231 6.15071 17.4231 5.52312V4.38675C17.4231 3.4826 17.064 2.61549 16.4246 1.97616C15.7853 1.33683 14.9182 0.977661 14.014 0.977661H3.78678C2.88263 0.977661 2.01551 1.33683 1.37619 1.97616C0.736856 2.61549 0.377686 3.4826 0.377686 4.38675V14.614C0.377686 15.5182 0.736857 16.3853 1.37619 17.0246C2.01551 17.6639 2.88263 18.0231 3.78678 18.0231H4.92314C5.55074 18.0231 6.0595 17.5143 6.0595 16.8868C6.0595 16.2592 5.55074 15.7504 4.92314 15.7504H3.78678C3.48539 15.7504 3.19636 15.6307 2.98325 15.4176C2.77014 15.2044 2.65041 14.9154 2.65041 14.614V4.38675C2.65041 4.08537 2.77014 3.79633 2.98325 3.58322ZM10.605 12.3413C10.605 11.7137 11.1137 11.2049 11.7413 11.2049H21.9686C22.5962 11.2049 23.105 11.7137 23.105 12.3413V22.5686C23.105 23.1962 22.5962 23.7049 21.9686 23.7049H11.7413C11.1137 23.7049 10.605 23.1962 10.605 22.5686V12.3413ZM11.7413 8.93221C9.85853 8.93221 8.33223 10.4585 8.33223 12.3413V22.5686C8.33223 24.4514 9.85853 25.9777 11.7413 25.9777H21.9686C23.8514 25.9777 25.3777 24.4514 25.3777 22.5686V12.3413C25.3777 10.4585 23.8514 8.93221 21.9686 8.93221H11.7413Z"
  ],
  download: [
    "M2.21191 15.4277C2.90227 15.4277 3.46191 15.9874 3.46191 16.6777V21.6777C3.46191 22.0093 3.59361 22.3272 3.82803 22.5616C4.06245 22.796 4.38039 22.9277 4.71191 22.9277H22.2119C22.5434 22.9277 22.8614 22.796 23.0958 22.5616C23.3302 22.3272 23.4619 22.0093 23.4619 21.6777V16.6777C23.4619 15.9874 24.0216 15.4277 24.7119 15.4277C25.4023 15.4277 25.9619 15.9874 25.9619 16.6777V21.6777C25.9619 22.6723 25.5668 23.6261 24.8636 24.3294C24.1603 25.0326 23.2065 25.4277 22.2119 25.4277H4.71191C3.71735 25.4277 2.76352 25.0326 2.06026 24.3294C1.357 23.6261 0.961914 22.6723 0.961914 21.6777V16.6777C0.961914 15.9874 1.52156 15.4277 2.21191 15.4277Z",
    "M6.32803 9.54385C6.81619 9.0557 7.60764 9.0557 8.0958 9.54385L13.4619 14.91L18.828 9.54385C19.3162 9.0557 20.1076 9.0557 20.5958 9.54385C21.084 10.032 21.084 10.8235 20.5958 11.3116L14.3458 17.5616C13.8576 18.0498 13.0662 18.0498 12.578 17.5616L6.32803 11.3116C5.83988 10.8235 5.83988 10.032 6.32803 9.54385Z",
    "M13.4619 0.427734C14.1523 0.427734 14.7119 0.987378 14.7119 1.67773V16.6777C14.7119 17.3681 14.1523 17.9277 13.4619 17.9277C12.7716 17.9277 12.2119 17.3681 12.2119 16.6777V1.67773C12.2119 0.987378 12.7716 0.427734 13.4619 0.427734Z"
  ],
  external: [
    "M25.3673 1.28312C25.3077 1.13904 25.22 1.00384 25.1042 0.88591C25.0988 0.88042 25.0933 0.87498 25.0878 0.86959C24.8623 0.648163 24.5532 0.511597 24.2122 0.511597H24.2119H16.7122C16.0218 0.511597 15.4622 1.07124 15.4622 1.7616C15.4622 2.45195 16.0218 3.0116 16.7122 3.0116H21.1944L9.57827 14.6277C9.09012 15.1159 9.09012 15.9073 9.57827 16.3955C10.0664 16.8836 10.8579 16.8836 11.346 16.3955L22.9622 4.77936V9.2616C22.9622 9.95195 23.5218 10.5116 24.2122 10.5116C24.9025 10.5116 25.4622 9.95195 25.4622 9.2616V1.76269C25.4622 1.75848 25.4621 1.75427 25.4621 1.75006C25.4606 1.59108 25.429 1.43233 25.3673 1.28312ZM4.21216 6.7616C3.88064 6.7616 3.5627 6.89329 3.32827 7.12771C3.09385 7.36213 2.96216 7.68008 2.96216 8.0116V21.7616C2.96216 22.0931 3.09385 22.4111 3.32827 22.6455C3.5627 22.8799 3.88064 23.0116 4.21216 23.0116H17.9622C18.2937 23.0116 18.6116 22.8799 18.846 22.6455C19.0805 22.4111 19.2122 22.0931 19.2122 21.7616V14.2616C19.2122 13.5712 19.7718 13.0116 20.4622 13.0116C21.1525 13.0116 21.7122 13.5712 21.7122 14.2616V21.7616C21.7122 22.7562 21.3171 23.71 20.6138 24.4132C19.9105 25.1165 18.9567 25.5116 17.9622 25.5116H4.21216C3.2176 25.5116 2.26377 25.1165 1.56051 24.4132C0.857246 23.71 0.462158 22.7562 0.462158 21.7616V8.0116C0.462158 7.01704 0.857246 6.06321 1.56051 5.35995C2.26377 4.65668 3.2176 4.2616 4.21216 4.2616H11.7122C12.4025 4.2616 12.9622 4.82124 12.9622 5.5116C12.9622 6.20195 12.4025 6.7616 11.7122 6.7616H4.21216Z"
  ],
  file: [
    "M4.00045 1.63229C4.63978 0.99296 5.5069 0.633789 6.41104 0.633789H14.3656C14.667 0.633789 14.956 0.753513 15.1691 0.966622L23.1237 8.92117C23.3368 9.13428 23.4565 9.42332 23.4565 9.7247V22.2247C23.4565 23.1288 23.0973 23.996 22.458 24.6353C21.8187 25.2746 20.9516 25.6338 20.0474 25.6338H6.41104C5.5069 25.6338 4.63978 25.2746 4.00045 24.6353C3.36112 23.996 3.00195 23.1288 3.00195 22.2247V4.04288C3.00195 3.13873 3.36112 2.27162 4.00045 1.63229ZM6.41104 2.90652C6.10966 2.90652 5.82062 3.02624 5.60751 3.23935C5.3944 3.45246 5.27468 3.7415 5.27468 4.04288V22.2247C5.27468 22.5261 5.3944 22.8151 5.60751 23.0282C5.82062 23.2413 6.10966 23.3611 6.41104 23.3611H20.0474C20.3488 23.3611 20.6378 23.2413 20.8509 23.0282C21.064 22.8151 21.1838 22.5261 21.1838 22.2247V10.1954L13.8949 2.90652H6.41104Z",
    "M14.3656 0.633789C14.9932 0.633789 15.502 1.14256 15.502 1.77015V8.58833H22.3202C22.9478 8.58833 23.4565 9.0971 23.4565 9.7247C23.4565 10.3523 22.9478 10.8611 22.3202 10.8611H14.3656C13.738 10.8611 13.2292 10.3523 13.2292 9.7247V1.77015C13.2292 1.14256 13.738 0.633789 14.3656 0.633789Z"
  ],
  list: [
    "M0 10.25C0 9.55964 0.559644 9 1.25 9H18.75C19.4404 9 20 9.55964 20 10.25C20 10.9404 19.4404 11.5 18.75 11.5H1.25C0.559644 11.5 0 10.9404 0 10.25Z",
    "M0 5.25C0 4.55964 0.559644 4 1.25 4H23.75C24.4404 4 25 4.55964 25 5.25C25 5.94036 24.4404 6.5 23.75 6.5H1.25C0.559644 6.5 0 5.94036 0 5.25Z",
    "M0 15.25C0 14.5596 0.559644 14 1.25 14H23.75C24.4404 14 25 14.5596 25 15.25C25 15.9404 24.4404 16.5 23.75 16.5H1.25C0.559644 16.5 0 15.9404 0 15.25Z",
    "M0 20.25C0 19.5596 0.559644 19 1.25 19H18.75C19.4404 19 20 19.5596 20 20.25C20 20.9404 19.4404 21.5 18.75 21.5H1.25C0.559644 21.5 0 20.9404 0 20.25Z"
  ],
  money: [
    "M13.2917 0C13.867 0 14.3333 0.46637 14.3333 1.04167V23.9583C14.3333 24.5336 13.867 25 13.2917 25C12.7164 25 12.25 24.5336 12.25 23.9583V1.04167C12.25 0.46637 12.7164 0 13.2917 0Z",
    "M7.37294 5.53956C8.25201 4.66049 9.4443 4.16663 10.6875 4.16663H18.5C19.0753 4.16663 19.5417 4.633 19.5417 5.20829C19.5417 5.78359 19.0753 6.24996 18.5 6.24996H10.6875C9.99683 6.24996 9.33445 6.52433 8.84608 7.0127C8.3577 7.50108 8.08333 8.16346 8.08333 8.85413C8.08333 9.54479 8.3577 10.2072 8.84608 10.6955C9.33445 11.1839 9.99683 11.4583 10.6875 11.4583H15.8958C17.139 11.4583 18.3313 11.9522 19.2104 12.8312C20.0895 13.7103 20.5833 14.9026 20.5833 16.1458C20.5833 17.389 20.0895 18.5813 19.2104 19.4604C18.3313 20.3394 17.139 20.8333 15.8958 20.8333H7.04167C6.46637 20.8333 6 20.3669 6 19.7916C6 19.2163 6.46637 18.75 7.04167 18.75H15.8958C16.5865 18.75 17.2489 18.4756 17.7373 17.9872C18.2256 17.4988 18.5 16.8365 18.5 16.1458C18.5 15.4551 18.2256 14.7927 17.7373 14.3044C17.2489 13.816 16.5865 13.5416 15.8958 13.5416H10.6875C9.4443 13.5416 8.25201 13.0478 7.37294 12.1687C6.49386 11.2896 6 10.0973 6 8.85413C6 7.61092 6.49386 6.41864 7.37294 5.53956Z"
  ],
  paperclip: [
    "M17.5359 2.82806C16.6555 2.82806 15.8112 3.17779 15.1886 3.80031L5.02747 13.9615C3.99 14.999 3.40716 16.4061 3.40716 17.8733C3.40716 19.3405 3.99 20.7476 5.02747 21.785C6.06493 22.8225 7.47204 23.4053 8.93924 23.4053C10.4064 23.4053 11.8135 22.8225 12.851 21.785L23.0122 11.6239C23.444 11.1921 24.1441 11.1921 24.5759 11.6239C25.0076 12.0556 25.0076 12.7557 24.5759 13.1875L14.4147 23.3487C12.9625 24.8009 10.9929 25.6167 8.93924 25.6167C6.88555 25.6167 4.91598 24.8009 3.4638 23.3487C2.01162 21.8965 1.1958 19.9269 1.1958 17.8733C1.1958 15.8196 2.01162 13.85 3.4638 12.3978L13.625 2.23665C14.6622 1.19941 16.069 0.616699 17.5359 0.616699C19.0028 0.616699 20.4095 1.19941 21.4468 2.23665C22.484 3.27388 23.0667 4.68068 23.0667 6.14755C23.0667 7.61442 22.484 9.02121 21.4468 10.0584L11.2745 20.2196C10.6523 20.8419 9.80824 21.1915 8.92818 21.1915C8.04812 21.1915 7.20411 20.8419 6.58181 20.2196C5.95952 19.5973 5.60992 18.7533 5.60992 17.8733C5.60992 16.9932 5.95952 16.1492 6.58181 15.5269L15.9695 6.15029C16.4015 5.71875 17.1016 5.71916 17.5331 6.15121C17.9647 6.58326 17.9643 7.28333 17.5322 7.71487L8.14548 17.0906C7.93818 17.2981 7.82127 17.5799 7.82127 17.8733C7.82127 18.1668 7.93789 18.4484 8.14548 18.656C8.35306 18.8636 8.63461 18.9802 8.92818 18.9802C9.22175 18.9802 9.50329 18.8636 9.71088 18.656L19.8831 8.49479C20.5054 7.8723 20.8554 7.02773 20.8554 6.14755C20.8554 5.26716 20.5056 4.42284 19.8831 3.80031C19.2606 3.17779 18.4163 2.82806 17.5359 2.82806Z"
  ],
  person: [
    "M3.04927 16.6449C4.23321 15.4462 5.83898 14.7727 7.51333 14.7727H17.6143C19.2887 14.7727 20.8945 15.4462 22.0784 16.6449C23.2623 17.8436 23.9275 19.4695 23.9275 21.1648V23.7216C23.9275 24.4276 23.3622 25 22.6648 25C21.9675 25 21.4022 24.4276 21.4022 23.7216V21.1648C21.4022 20.1476 21.0031 19.1721 20.2928 18.4528C19.5824 17.7336 18.6189 17.3295 17.6143 17.3295H7.51333C6.50872 17.3295 5.54526 17.7336 4.83489 18.4528C4.12453 19.1721 3.72545 20.1476 3.72545 21.1648V23.7216C3.72545 24.4276 3.16015 25 2.46282 25C1.76549 25 1.2002 24.4276 1.2002 23.7216V21.1648C1.2002 19.4695 1.86533 17.8436 3.04927 16.6449Z",
    "M11.9956 2.5C9.92454 2.5 8.24561 4.17893 8.24561 6.25C8.24561 8.32107 9.92454 10 11.9956 10C14.0667 10 15.7456 8.32107 15.7456 6.25C15.7456 4.17893 14.0667 2.5 11.9956 2.5ZM5.74561 6.25C5.74561 2.79822 8.54383 0 11.9956 0C15.4474 0 18.2456 2.79822 18.2456 6.25C18.2456 9.70178 15.4474 12.5 11.9956 12.5C8.54383 12.5 5.74561 9.70178 5.74561 6.25Z"
  ],
  refresh: [
    "M6.97937 3.40529C8.70577 2.45337 10.6948 2.08834 12.6467 2.36521C14.5986 2.64207 16.4076 3.54582 17.8012 4.94028C17.8093 4.94841 17.8176 4.95642 17.8259 4.9643L21.0026 7.95574H17.048C16.4203 7.95574 15.9115 8.4646 15.9115 9.09231C15.9115 9.72002 16.4203 10.2289 17.048 10.2289H23.8643H23.8675C24.0269 10.2289 24.1787 10.196 24.3165 10.1367C24.4544 10.0775 24.5828 9.98985 24.6925 9.874C24.7014 9.86462 24.7102 9.85508 24.7187 9.8454C24.9095 9.62998 25.0041 9.36088 25.004 9.09232C25.004 9.09121 25.004 9.09009 25.004 9.08898V2.27288C25.004 1.64517 24.4952 1.13631 23.8675 1.13631C23.2397 1.13631 22.7309 1.64517 22.7309 2.27288V6.46082L19.3966 3.32095C17.6563 1.58497 15.4 0.45984 12.9659 0.11459C10.526 -0.231487 8.03977 0.224801 5.88178 1.4147C3.72379 2.60459 2.01099 4.46363 1.00148 6.71166C-0.00803095 8.9597 -0.259554 11.4749 0.284811 13.8784C0.829176 16.2818 2.13994 18.4432 4.01957 20.0368C5.89921 21.6305 8.24589 22.5701 10.706 22.714C13.1661 22.8579 15.6063 22.1984 17.6589 20.8347C19.7116 19.4711 21.2654 17.4773 22.0863 15.1538C22.2954 14.5619 21.9851 13.9126 21.3933 13.7035C20.8014 13.4944 20.1521 13.8047 19.943 14.3966C19.2863 16.2554 18.0432 17.8504 16.4011 18.9413C14.759 20.0322 12.8068 20.5599 10.8387 20.4447C8.87066 20.3296 6.99332 19.5779 5.48961 18.303C3.9859 17.0281 2.93729 15.299 2.5018 13.3762C2.06631 11.4535 2.26753 9.44129 3.07513 7.64286C3.88274 5.84443 5.25298 4.35721 6.97937 3.40529Z"
  ],
  swoop: [
    "M17.6488 0.406796C17.1064 -0.135599 16.227 -0.135599 15.6846 0.406796C15.1422 0.949191 15.1422 1.82859 15.6846 2.37098L20.258 6.94444H6.94444C5.10266 6.94444 3.33632 7.67609 2.03398 8.97843C0.731644 10.2808 0 12.0471 0 13.8889V23.6111C0 24.3782 0.621827 25 1.38889 25C2.15595 25 2.77778 24.3782 2.77778 23.6111V13.8889C2.77778 12.7838 3.21676 11.724 3.99817 10.9426C4.77957 10.1612 5.83938 9.72222 6.94444 9.72222H20.258L15.6846 14.2957C15.1422 14.8381 15.1422 15.7175 15.6846 16.2599C16.227 16.8023 17.1064 16.8023 17.6488 16.2599L24.5932 9.31543C24.8611 9.04749 24.9967 8.69732 24.9999 8.34616C25 8.34189 25 8.33761 25 8.33333C25 8.32906 25 8.32478 24.9999 8.32051C24.9983 8.13686 24.961 7.96173 24.8946 7.80169C24.8268 7.63788 24.7264 7.4844 24.5932 7.35124L17.6488 0.406796Z"
  ],
  twitter: [
    "M21.351 2.5026C20.4177 1.5026 19.0844 0.835938 17.6177 0.835938C14.8177 0.835938 12.4844 3.16927 12.4844 6.1026C12.4844 6.5026 12.551 6.9026 12.6177 7.3026C8.35104 7.1026 4.61771 4.96927 2.08438 1.83594C1.61771 2.63594 1.41771 3.5026 1.41771 4.5026C1.41771 6.3026 2.35104 7.9026 3.68437 8.9026C2.81771 8.9026 2.08437 8.63594 1.35104 8.23594V8.3026C1.35104 10.8359 3.08438 12.9693 5.48438 13.4359C5.08438 13.5693 4.61771 13.6359 4.15104 13.6359C3.81771 13.6359 3.48438 13.6359 3.21771 13.5693C3.88438 15.6359 5.75104 17.1693 8.01771 17.2359C6.28438 18.6359 4.08438 19.5026 1.68438 19.5026C1.28438 19.5026 0.884375 19.5026 0.484375 19.4359C2.75104 20.9026 5.41771 21.7693 8.35104 21.7693C17.751 21.7693 22.951 13.7693 22.951 6.83594V6.16927C23.951 5.43594 24.8177 4.5026 25.4844 3.43594C24.551 3.83594 23.551 4.16927 22.551 4.23594C23.4177 3.5026 24.2177 2.5026 24.6177 1.23594C23.6177 1.83594 22.551 2.3026 21.351 2.5026Z"
  ]
};
var Icon_svelte_svelte_type_style_lang = ".c.svelte-17320wy{width:1em;height:1em;fill:currentColor;transition:all 0.3s ease-out;overflow:visible}";
const css = {
  code: ".c.svelte-17320wy{width:1em;height:1em;fill:currentColor;transition:all 0.3s ease-out;overflow:visible}",
  map: `{"version":3,"file":"Icon.svelte","sources":["Icon.svelte"],"sourcesContent":["<script context=\\"module\\">\\n\\timport pathsByName from './icon-paths';\\n\\texport const iconOptions = Object.keys(pathsByName);\\n\\texport const directions = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];\\n<\/script>\\n\\n<script>\\n\\texport let name = 'arrow';\\n\\texport let direction = 'n';\\n\\n\\t$: paths = pathsByName[name] || [];\\n\\t$: rotation = directions.indexOf(direction) * 45;\\n<\/script>\\n\\n<svg\\n\\tclass=\\"c\\"\\n\\tviewBox=\\"0 0 25 25\\"\\n\\tfill-rule=\\"evenodd\\"\\n\\tclip-rule=\\"evenodd\\"\\n\\tstyle={\`transform: rotate(\${rotation}deg)\`}\\n>\\n\\t{#each paths as path}\\n\\t\\t<path d={path} />\\n\\t{/each}\\n</svg>\\n\\n<style>\\n\\t.c {\\n\\t\\twidth: 1em;\\n\\t\\theight: 1em;\\n\\t\\tfill: currentColor;\\n\\t\\ttransition: all 0.3s ease-out;\\n\\t\\toverflow: visible;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA2BC,EAAE,eAAC,CAAC,AACH,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,IAAI,CAAE,YAAY,CAClB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,QAAQ,CAC7B,QAAQ,CAAE,OAAO,AAClB,CAAC"}`
};
const directions = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let paths;
  let rotation;
  let { name = "arrow" } = $$props;
  let { direction = "n" } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
    $$bindings.direction(direction);
  $$result.css.add(css);
  paths = pathsByName[name] || [];
  rotation = directions.indexOf(direction) * 45;
  return `<svg class="${"c svelte-17320wy"}" viewBox="${"0 0 25 25"}" fill-rule="${"evenodd"}" clip-rule="${"evenodd"}"${add_attribute("style", `transform: rotate(${rotation}deg)`, 0)}>${each(paths, (path) => `<path${add_attribute("d", path, 0)}></path>`)}</svg>`;
});
const HighlightSvelte = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let highlighted;
  let $$restProps = compute_rest_props($$props, ["code"]);
  let { code = void 0 } = $$props;
  createEventDispatcher();
  hljs.registerLanguage("xml", xml);
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("css", css$3);
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  highlighted = hljs.highlightAuto(code).value;
  return `${slots.default ? slots.default({ highlighted }) : `
  <pre${spread([escape_object($$restProps)], "hljs")}><code><!-- HTML_TAG_START -->${highlighted}<!-- HTML_TAG_END --></code></pre>
`}`;
});
const atomOneDark = `<style>pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#abb2bf;background:#282c34}.hljs-comment,.hljs-quote{color:#5c6370;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#c678dd}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e06c75}.hljs-literal{color:#56b6c2}.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#98c379}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#d19a66}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#61aeee}.hljs-built_in,.hljs-class .hljs-title,.hljs-title.class_{color:#e6c07b}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}</style>`;
var atomOneDark$1 = atomOneDark;
let current = 1;
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let demos = [
    {
      title: "Basic Usage",
      code: `<script>
	import { Steps } from 'svelte-steps';
	let steps = [
		{ text: 'step one' }, 
		{ text: 'step two' }, 
		{ text: 'the last step' }];
<\/script>

<Steps {steps} />`,
      steps: [
        { text: "steppingstone one" },
        { text: "step two" },
        { text: "the last step" }
      ],
      props: {}
    },
    {
      title: "With Icons",
      code: `let steps = [
	{ text: 'step one', icon: IconMoney },
	{ text: 'step two', icon: IconPaperClip },
	{ text: 'the last step', icon: IconPerson }
]`,
      steps: [
        {
          text: "step one",
          icon: Icon,
          iconProps: { name: "money" }
        },
        {
          text: "step two",
          icon: Icon,
          iconProps: { name: "paperclip", direction: "n" }
        },
        {
          text: "the last step",
          icon: Icon,
          iconProps: { name: "person" }
        }
      ],
      props: {}
    },
    {
      title: "Square Steps",
      code: `<Steps {steps} borderRadius="0"/>`,
      steps: [
        {
          text: "step one",
          icon: Icon,
          iconProps: { name: "money" }
        },
        {
          text: "step two",
          icon: Icon,
          iconProps: { name: "paperclip", direction: "n" }
        },
        {
          text: "the last step",
          icon: Icon,
          iconProps: { name: "person" }
        }
      ],
      props: { borderRadius: 0 }
    },
    {
      title: "Custom Color",
      code: `<Steps {steps} primary="#ff0000" secondary="#ffaaaa"/>`,
      steps: [
        {
          text: "step one",
          icon: Icon,
          iconProps: { name: "money" }
        },
        {
          text: "step two",
          icon: Icon,
          iconProps: { name: "paperclip", direction: "n" }
        },
        {
          text: "the last step",
          icon: Icon,
          iconProps: { name: "person" }
        }
      ],
      props: { primary: "#ff0000", secondary: "#ffaaaa" }
    },
    {
      title: "Custom Size",
      code: `<Steps {steps} size="2em" lineHeight="2px"/>`,
      steps: [
        {
          text: "step one",
          icon: Icon,
          iconProps: { name: "money" }
        },
        {
          text: "step two",
          icon: Icon,
          iconProps: { name: "paperclip", direction: "n" }
        },
        {
          text: "the last step",
          icon: Icon,
          iconProps: { name: "person" }
        }
      ],
      props: { size: "2em", lineHeight: "2px" }
    },
    {
      title: "No Text",
      code: `let steps = [
	{ icon: IconMoney },
	{ icon: IconPaperClip },
	{ icon: IconPerson }
]`,
      steps: [
        { icon: Icon, iconProps: { name: "money" } },
        {
          icon: Icon,
          iconProps: { name: "paperclip", direction: "n" }
        },
        {
          icon: Icon,
          iconProps: { name: "person" }
        }
      ],
      props: {}
    },
    {
      title: "Bar",
      code: `<Steps {steps} size="2rem" lineHeight="2rem"`,
      steps: [
        {
          text: "step one",
          icon: Icon,
          iconProps: { name: "money" }
        },
        {
          text: "step two",
          icon: Icon,
          iconProps: { name: "paperclip", direction: "n" }
        },
        {
          text: "the last step",
          icon: Icon,
          iconProps: { name: "person" }
        }
      ],
      props: { size: "2rem", lineHeight: "2rem" }
    }
  ];
  return `${$$result.head += `<!-- HTML_TAG_START -->${atomOneDark$1}<!-- HTML_TAG_END -->`, ""}

<div class="${"container"}"><nav class="${"d-flex align-items-center justify-content-between mt-5"}"><h1 class="${"display-4"}">Svelte Steps</h1>
    <div><a href="${"https://github.com/shaozi/svelte-steps.git"}">Github</a></div></nav>
  <hr>
  <div class="${"text-muted mb-5"}">A customizable step component written in Svelte
  </div>

  <h2>Examples</h2>
  ${each(demos, (demo) => `<div class="${"my-4"}"><h3>${escape(demo.title)}</h3>
      <div class="${"row"}"><div class="${"col-md-6"}">${validate_component(HighlightSvelte, "HighlightSvelte").$$render($$result, {
    code: demo.code,
    style: "padding: 1rem; border-radius: 0.5rem;"
  }, {}, {})}</div>
        <div class="${"col-md-6"}">${validate_component(Steps, "Steps").$$render($$result, Object.assign({ steps: demo.steps }, { current }, demo.props), {}, {})}
        </div></div>
    </div>`)}
</div>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
export { init, render };