export function isPresent(o: any) {
  return o !== null && o !== undefined;
}

export function isBlank(o: any) {
  return o === null || o === undefined;
}
