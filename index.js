/**
 * @param {unknown} cause
 * @returns
 */
const due = cause => ({ cause });

/**
 * 
 * @param {string} ref
 * @param {unknown} cause
 * @returns
 */
const error = (ref, cause) => new TypeError(`Invalid dispatch ${ref}`, due(cause));

/** @typedef {EventInit|CustomEventInit} Init */
/** @typedef {Init|undefined|null} Options */
/** @typedef {EventTarget|void} DispatchThis */

/**
 * Callable shape after fixing `this` with {@link Function.prototype.bind `dispatch.bind(target)`}.
 * Use for typing when you pass event `init` on a bound dispatcher — TypeScript’s `bind` inference
 * does not always preserve optional parameters across overloads.
 * @typedef {(type: string, options?: (Init|null)) => boolean} DispatchCurried
 */

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

/**
 * @overload
 * @param {EventTarget} target
 * @param {string} type
 * @returns {boolean}
 */

/**
 * @overload
 * @this {DispatchThis}
 * @param {string} type
 * @param {(Init|null)=} [options]
 * @returns {boolean}
 */

/**
 * @overload
 * @this {DispatchThis}
 * @param {string} type
 * @returns {boolean}
 */

/**
 * @this {EventTarget | null | undefined}
 * @param {EventTarget|string} [targetOrType]
 * @param {string|Init} [typeOrOptions]
 * @param {Options} [options]
 * @returns {boolean}
 */
export default function dispatch(targetOrType) {
  let target = /** @type {EventTarget} */ (this ?? globalThis);

  /** @type {string} */
  let type;

  /** @type {Options} */
  let eventInit;

  /** @type {Event} */
  let event;

  switch (arguments.length) {
    case 3:
      target = /** @type {EventTarget} */ (targetOrType);
      type = /** @type {string} */ (arguments[1]);
      eventInit = arguments[2];
      break;
    case 2:
      if (typeof targetOrType === 'string') {
        type = targetOrType;
        eventInit = /** @type {Options} */ (arguments[1]);
      }
      else {
        target = /** @type {EventTarget} */ (targetOrType);
        type = /** @type {string} */ (arguments[1]);
      }
      break;
    case 1:
      type = /** @type {string} */ (targetOrType);
      break;
    default:
      throw error('arguments', arguments);
  }

  if (typeof type !== 'string')
    throw error('type', type);

  if (!(target instanceof EventTarget))
    throw error('target', target);

  if (eventInit) {
    const Class = 'detail' in eventInit ? CustomEvent : Event;
    event = new Class(type, eventInit);
  }
  else
    event = new Event(type);

  return target.dispatchEvent(event);
}
