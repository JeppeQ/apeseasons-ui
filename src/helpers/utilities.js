import { differenceInCalendarDays } from 'date-fns';

export function ellipseAddress(address, start, end) {
  return `${address.slice(0, start)}...${address.slice(-end)}`.toUpperCase();
}

export function formatTime(date, now) {
  const { days, hours, minutes } = date.diff(now, ['days', 'hours', 'minutes'])
  
  let string = ''
  if (days > 0) {
    string += days + 'd '
  }

  string += hours + 'h '
  string += Math.round(minutes) + 'm'

  return string
}

export function dateDiff(date1, date2) {
  return differenceInCalendarDays(date1, date2)
}

export function getSignificantDecimals(price) {
  if (price <= 0.01) return 1
  if (price <= 0.1) return 2
  if (price <= 1) return 3
  if (price <= 10) return 4
  if (price <= 100) return 5
  if (price <= 1000) return 6
  if (price <= 10000) return 7
  if (price <= 100000) return 8
  if (price <= 1000000) return 9
  if (price <= 10000000) return 10
  return 11
}

export function roundNumber(x, price) {
  if (!x || !price) {
    return 0
  }

  const power = 10 ** getSignificantDecimals(price)
  
  return Math.round(x * power) / power
}