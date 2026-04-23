# @webreflection/dispatch

[![Coverage Status](https://coveralls.io/repos/github/WebReflection/dispatch/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/dispatch?branch=main)

<sup>**Social Media Photo by [Mika Baumeister](https://unsplash.com/@kommumikation) on [Unsplash](https://unsplash.com/)**</sup>

Small utility to dispatch native `Event` or `CustomEvent` (when `options` includes `detail`) on an `EventTarget`. The return value is the same as `dispatchEvent`: `false` if the event was canceled, otherwise `true`.

**Call shapes**

- `dispatch(target, type, options?)` — explicit target; `this` is ignored.
- `dispatch(type, options?)` — target is `this` when set via `.call`/`.apply`/`.bind(target)`; otherwise `this` is usually `undefined` in modules and the implementation uses `globalThis` (e.g. `window` in browsers).

Invalid arity, non-string `type`, or a non-`EventTarget` target throws `TypeError` with a clear message. Types and full overload/`this` behavior are in `index.d.ts`; behavior is exercised in `test.js`.

**Performance**

For hot paths where arguments are already validated, use the same API without those checks:

```js
import dispatch from '@webreflection/dispatch/fast';
// alias:
import dispatch from '@webreflection/dispatch/yolo';
```

`dispatch/fast` and `dispatch/yolo` are the same module; prefer whichever name fits your codebase. Only use them when you guarantee correct `(target, type, options?)` usage.
