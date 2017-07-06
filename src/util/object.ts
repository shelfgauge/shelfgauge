export function createFromKeys<R>(keys: string[], val: (key?: string) => R) {
  const ret = {} as { [key: string]: R };
  for (const key of keys) {
    ret[key] = val(key);
  }
  return ret;
}
