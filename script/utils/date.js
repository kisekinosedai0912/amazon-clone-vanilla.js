import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

export function formatDate(date, days) {
    const newDate = new dayjs()
    date = newDate.add(days, 'days')

    return date.format('dddd, MMMM D')
}