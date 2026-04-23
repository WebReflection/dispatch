export default function dispatch(targetOrType) {
  'use strict';
  let target = this ?? globalThis, length = arguments.length, type, options;

  if (length === 3) {
    target = targetOrType;
    type = arguments[1];
    options = arguments[2];
  }
  else if (length === 2) {
    if (typeof targetOrType === 'string') {
      type = targetOrType;
      options = arguments[1];
    }
    else {
      target = targetOrType;
      type = arguments[1];
    }
  }
  else if (length === 1) {
    type = targetOrType;
  }

  return target.dispatchEvent(
    options ?
      new ('detail' in options ? CustomEvent : Event)(type, options) :
      new Event(type)
  );
}
