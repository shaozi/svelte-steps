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
 *    - `steps`: {text: string, icon: component}[] steps
 * - `current`: current step index
 *    - `size`: size of the circle buttons
 *    - `lineHeight`: height of the connecting lines between the circle buttons
 *    - `primary`: Primary color of passed steps
 *    - `secondary`: Secondary color of future steps
 *    - `textPrimary`: Primary color of text color in passed steps
 *    - `textSecondary`: Secondary color of text color in future steps
 *    - `borderRadius`: Border radius of the  buttons
 *    - `on:click(e=>{e.detail})`: click event with arg as the clicked step index as e.detail
 */
export default class Steps extends SvelteComponentTyped<{
    size?: string;
    lineHeight?: string;
    primary?: string;
    secondary?: string;
    textPrimary?: string;
    textSecondary?: string;
    current?: number;
    steps?: any[];
    borderRadius?: string;
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
        size?: string;
        lineHeight?: string;
        primary?: string;
        secondary?: string;
        textPrimary?: string;
        textSecondary?: string;
        current?: number;
        steps?: any[];
        borderRadius?: string;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
