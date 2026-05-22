interface Dateable {
  startDate: string;
  endDate: string | null;
}

export const sortChronologically = (a: Dateable, b: Dateable) => {
  const parseDate = (d: string | null) => {
    if (!d || d.toLowerCase() === 'present') {
      return new Date().toISOString()
    }
    return d
  }

  const aEnd = parseDate(a.endDate)
  const bEnd = parseDate(b.endDate)

  if (aEnd !== bEnd) {
    return bEnd.localeCompare(aEnd)
  }
  return b.startDate.localeCompare(a.startDate)
}
