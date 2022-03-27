export function isNotNullAndNotUndefined(value: any): boolean {
  return value !== undefined && value !== null
}

export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined
}
