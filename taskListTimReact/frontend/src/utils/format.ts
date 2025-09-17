
/**
 * Formats a date to mm/dd/yyyy.
 * @param date The Date object or string to format.
 * @returns Formatted date string or empty string if input is invalid.
 */
export const formatDateToMMDDYYYY = (date: Date | string | null | undefined): string => {
    if (!date) return '';
  
    const d = typeof date === 'string' ? new Date(date) : date;
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
  
    return `${month}/${day}/${year}`;
  };
  