import { taxCalendar2026, TaxDeadline } from '@/config/calendar-2026';

/**
 * Format date as YYYYMMDDTHHmmssZ
 */
const formatIcsDate = (date: Date): string => {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

/**
 * Generate a unique ID for an ICS event
 */
const generateUid = (): string => {
  return Math.random().toString(36).substring(2) + '@opentaxation.id';
};

/**
 * Maps our TaxDeadline entries into actual Date objects for the year 2026.
 * "Setiap tanggal 15" -> 12 events
 * "Setiap tanggal 20" -> 12 events
 * Specific dates (e.g. "31 Maret 2026") -> 1 event
 */
export const generateIcsContent = (): string => {
  const events: string[] = [];
  const year = 2026;

  taxCalendar2026.forEach((deadline: TaxDeadline) => {
    if (deadline.month === 'Setiap Bulan') {
      // It's a monthly recurring event. Extract the day.
      const dayMatch = deadline.date.match(/\d+/);
      const day = dayMatch ? parseInt(dayMatch[0], 10) : 15;

      // Generate an event for each month in 2026
      for (let month = 0; month < 12; month++) {
        const eventDate = new Date(Date.UTC(year, month, day, 9, 0, 0)); // 09:00:00 UTC
        const endDate = new Date(Date.UTC(year, month, day, 10, 0, 0)); // 1 hour duration

        events.push(createIcsEvent({
          start: eventDate,
          end: endDate,
          summary: deadline.title,
          description: `Target: ${deadline.target.join(', ')}\\n\\n${deadline.description}`
        }));
      }
    } else {
      // It's a specific date
      let monthIndex = 0;
      let day = 1;

      if (deadline.date.toLowerCase().includes('maret')) {
        monthIndex = 2; // March
        day = 31;
      } else if (deadline.date.toLowerCase().includes('april')) {
        monthIndex = 3; // April
        day = 30;
      }

      const eventDate = new Date(Date.UTC(year, monthIndex, day, 9, 0, 0));
      const endDate = new Date(Date.UTC(year, monthIndex, day, 10, 0, 0));

      events.push(createIcsEvent({
        start: eventDate,
        end: endDate,
        summary: deadline.title,
        description: `Target: ${deadline.target.join(', ')}\\n\\n${deadline.description}`
      }));
    }
  });

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//OpenTaxation ID//Kalender Pajak 2026//ID',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...events,
    'END:VCALENDAR'
  ].join('\r\n');
};

interface IcsEventData {
  start: Date;
  end: Date;
  summary: string;
  description: string;
}

const createIcsEvent = (data: IcsEventData): string => {
  const dtstamp = formatIcsDate(new Date());
  
  return [
    'BEGIN:VEVENT',
    `UID:${generateUid()}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${formatIcsDate(data.start)}`,
    `DTEND:${formatIcsDate(data.end)}`,
    `SUMMARY:${data.summary}`,
    `DESCRIPTION:${data.description}`,
    'END:VEVENT'
  ].join('\r\n');
};
