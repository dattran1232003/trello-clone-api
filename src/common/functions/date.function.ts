/**
 * @description check whether start date is anterior to end date
 * @returns true if start date is anterior to end date. Otherwise false
 */
export function isDateAnterior(
  startDate: Date | string,
  endDate: Date | string,
): boolean {
  return new Date(startDate)?.getTime() < new Date(endDate)?.getTime()
}
