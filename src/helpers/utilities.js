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