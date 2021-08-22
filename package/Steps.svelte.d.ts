/** @typedef {typeof __propDef.props}  StepsProps */
/** @typedef {typeof __propDef.events}  StepsEvents */
/** @typedef {typeof __propDef.slots}  StepsSlots */
/**
 * @name svelte-steps
 *
 *    @description This is the steps component.
 *
 *    @props
 *
 *    - `steps`:
 * - Array of object. Length has to be more than 1
 * - Required
 * - Each item is a step object that can have:
 * 	- `text`: The text displayed below each steps.
 * 	- `icon`: A svelte component displayed inside each steps.
 * 	- `iconProps`: An object that will be passed as props to the `icon` component.
 * - `current`: current step index. Number. Default `0`
 * - `size`: size of the step buttons. String. Default `"3rem"`
 * - `lineHeight`: height of the connecting lines between the step buttons. String. Default `"0.3rem"`
 * - `primary`: Primary color of passed and current steps. String. Default `'var(--bs-primary, #3a86ff)'`
 * - `secondary`: Secondary color of future steps. String. Default `'var(--bs-secondary, #bbbbc0)'`
 * - `light`: Primary color of text color in passed anc current steps. String. Default `'var(--bs-light, white)'`
 * - `dark`: Secondary color of text color in future steps. String. Default `'var(--bs-dark, black)'`
 * - `borderRadius`: Border radius of the step buttons. String. Default `'50%'` (circle)
 * - `fontFamily`: Font family of the component. String. Default `"'Helvetica Neue', Helvetica, Arial, sans-serif"`
 *
 * @events
 *
 * - `on:click(e)`: click event with arg as the clicked step index as `e.detail.current` and last step index as `e.detail.last`
 */
export default class Steps extends SvelteComponentTyped<{
    steps: any;
    current?: number;
    size?: string;
    lineHeight?: string;
    primary?: string;
    secondary?: string;
    light?: string;
    dark?: string;
    borderRadius?: string;
    fontFamily?: string;
}, {
    click: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type StepsProps = typeof __propDef.props;
export type StepsEvents = typeof __propDef.events;
export type StepsSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        steps: any;
        current?: number;
        size?: string;
        lineHeight?: string;
        primary?: string;
        secondary?: string;
        light?: string;
        dark?: string;
        borderRadius?: string;
        fontFamily?: string;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
