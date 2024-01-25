import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';
import type { createForm } from 'svelte-forms-lib';
import type { AnyObject, ObjectSchema } from 'yup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function callOnce<T extends (...args: any[]) => any>(fn: T): T {
  let cache: [ReturnType<T>];

  const t = (...args: Parameters<T>) => {
    if (cache) {
      return cache[0];
    } else {
      cache = [fn(...args)];
      return cache[0];
    }
  };
  return t as T;
}

export function arrayOfUndefs(length: number): undefined[] {
  return new Array(length).fill(undefined);
}

export function roundDownToWhole(n: number, increment: number): number {
  return n - (n % increment);
}

export function filterOutUndefined<T>(param: T | undefined): param is T {
  return param !== undefined;
}

export function compactArray<T>(arr: (T | undefined | null)[]): T[] {
  return arr.filter((obj) => obj !== undefined && obj !== null) as T[];
}

export function distinctArray<T>(arr: T[]): T[] {
  return arr.filter((v, i) => arr.indexOf(v) === i);
}

export function flattenArray<T>(arr: T[][]): T[] {
  return arr.reduce((acc, cur) => acc.concat(cur), []);
}

export function orderedArray(arr: string[]): string[];
export function orderedArray(arr: number[]): number[];
export function orderedArray<T>(arr: T[], cb: (t: T) => string | number): T[];
export function orderedArray<T>(arr: T[], cb?: (t: T) => string | number): T[] {
  return arr.slice().sort((a, b) => {
    if (cb) {
      const c = cb(a),
        d = cb(b);
      if (typeof c === 'number' && typeof d === 'number') {
        return c - d;
      } else if (typeof c === 'string' && typeof d === 'string') {
        return c.localeCompare(d);
      } else {
        throw new Error('Sorting requires same data type return by callback');
      }
    } else {
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      } else if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      } else {
        throw new Error('Sorting requires same data type return by callback');
      }
    }
  });
}

export function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: any = {},
    sourceKeys = Object.keys(obj) as K[];
  keys.filter((key) => sourceKeys.includes(key)).forEach((key) => (out[key] = obj[key]));
  return out;
}

export function delay(n: number): Promise<void> {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve();
    }, n);
  });
}

export function removeOpacity0(e: Event) {
  const el = e.target as HTMLElement;
  el.classList.remove('opacity-0');
  const overlay = el.previousElementSibling as HTMLElement;
  if (overlay?.classList.contains('backdrop')) overlay.classList.remove('opacity-0');
}

type CreateFormResult = typeof createForm<Record<string, unknown>>;
type FormContext = ReturnType<CreateFormResult>;
export type FormContextWithSchema = FormContext & {
  schema: ObjectSchema<AnyObject, unknown>;
};
type ExtendedFormContext = FormContextWithSchema & {
  submitted: Writable<boolean>;
};

const key = {};

export function getFormContext(): ExtendedFormContext {
  return getContext(key);
}

export function setFormContext(context: ExtendedFormContext) {
  return setContext(key, context);
}

export function stripEmptyStringValues<T extends Record<string, unknown>>(values: T): T {
  const out: T = { ...values };
  Object.keys(out).forEach((key) => {
    if (values[key] === '') {
      delete out[key];
    }
  });
  return out;
}

export function extractWrapperProps<T extends Record<string, unknown>>(
  props: T,
): { class?: string } {
  const _class = props['class'];
  return typeof _class === 'string' ? { class: _class } : {};
}
export function extractInputProps<T extends Record<string, unknown>>(props: T): Omit<T, 'class'> {
  const out = { ...props };
  delete out['class'];
  return out;
}

export function pushUniqueValue(acc: string[], value: string | null) {
  if (value && !acc.includes(value)) acc.push(value);
}

export type KeyOf<T extends object> = Extract<keyof T, string>;
