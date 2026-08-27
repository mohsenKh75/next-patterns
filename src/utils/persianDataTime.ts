/**
 * Formats a date into Persian (Jalali) datetime string.
 *
 * Output format:
 *   HH:mm. YYYY/MM/DD
 * Example:
 *    ۱۴۰۳/۰۸/۰۸. ۲۳:۵۸
 *
 * Notes:
 * - Uses `fa-IR` locale → Persian digits + Jalali calendar
 * - 24-hour format (hour12: false)
 * - Accepts both Date object and date string
 */
export function formatPersianDateTime(input: string | Date, showTime = true): string {
    const date = new Date(input)
  
    const time = date.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  
    const datePart = date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  
    return showTime ? `${time} .${datePart}` : `${datePart}`
  }
  