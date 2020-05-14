export function resolveObjectPath(obj, path) {
  if (path.indexOf(".") === -1) {
    return obj[path];
  }
  const keys = path.split(".");
  const value = keys.reduce((prev, curr) => prev[curr], obj);
  return value;
}
