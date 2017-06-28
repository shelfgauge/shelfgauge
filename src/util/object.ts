export function ensure<V>(
  obj: { [key: string]: V },
  key: string,
  setter: () => V
): V {
  if (!obj[key]) {
    obj[key] = setter();
  }

  return obj[key];
}
