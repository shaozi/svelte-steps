/** @typedef {typeof __propDef.props}  CheckProps */
/** @typedef {typeof __propDef.events}  CheckEvents */
/** @typedef {typeof __propDef.slots}  CheckSlots */
export default class Check extends SvelteComponentTyped<{
    stroke?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CheckProps = typeof __propDef.props;
export type CheckEvents = typeof __propDef.events;
export type CheckSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        stroke?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
