/**
 * Dispatches a DOM {@link Event} (or {@link CustomEvent} when `options` includes `detail`) on an {@link EventTarget}.
 *
 * **Target selection when the first argument is `type` (string)**
 * The event target is **`this`** when the function is invoked with an explicit receiver
 * (`Function.prototype.call`, `Function.prototype.apply`, or a **bound** function from `Function.prototype.bind`).
 * Otherwise **`this` is `undefined`** in typical module / strict unbound calls, and the implementation uses **`globalThis`**
 * (e.g. `window` in browsers), so unbound `dispatch(type, …)` dispatches on the global object.
 *
 * For the **`type`‑first** overloads, the public type uses **`this: DispatchThis`** (`EventTarget | void`): **`EventTarget`** for a `.call`/`.apply` receiver or a **`.bind(target)`** result, and **`void`** (the usual module top-level **`this`**) for a typical unbound call (runtime still falls back to **`globalThis`** when `this` is nullish).
 * The two‑argument **`(target, type, …)`** overloads intentionally omit `this`; the explicit `target` argument makes the receiver unrelated to `this`.
 * For **`dispatch.bind(target)`** with a second `init` argument, use the exported **`DispatchCurried`** type if `bind`’s inferred arity is too narrow.
 *
 * @overload
 * @param {EventTarget} target
 * @param {string} type
 * @param {(Init|null)=} [options]
 * @returns {boolean} `true` unless the event was canceled (e.g. `preventDefault()`), same as `EventTarget.prototype.dispatchEvent`.
 */
export default function dispatch(target: EventTarget, type: string, options?: (Init | null) | undefined): boolean;
/**
 * @overload
 * @param {EventTarget} target
 * @param {string} type
 * @returns {boolean}
 */
export default function dispatch(target: EventTarget, type: string): boolean;
/**
 * @overload
 * @this {DispatchThis}
 * @param {string} type
 * @param {(Init|null)=} [options]
 * @returns {boolean}
 */
export default function dispatch(this: DispatchThis, type: string, options?: (Init | null) | undefined): boolean;
/**
 * @overload
 * @this {DispatchThis}
 * @param {string} type
 * @returns {boolean}
 */
export default function dispatch(this: DispatchThis, type: string): boolean;
export type Init = EventInit | CustomEventInit;
export type Options = Init | undefined | null;
export type DispatchThis = EventTarget | void;

/**
 * Callable shape after fixing `this` with {@link Function.prototype.bind `dispatch.bind(target)`}.
 * Use for typing when you pass event `init` on a bound dispatcher — TypeScript’s `bind` inference
 * does not always preserve optional parameters across overloads.
 */
export type DispatchCurried = (type: string, options?: (Init | null)) => boolean;
