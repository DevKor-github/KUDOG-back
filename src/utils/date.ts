const DAY_IN_MILLISECONDS = 86400000;
const HOUR_IN_MILLISECONDS = 3600000;
const MINUTE_IN_MILLISECONDS = 60000;
export function getHHMMdate(): string {
  let timestamp = Date.now() + 9 * HOUR_IN_MILLISECONDS;
  timestamp %= DAY_IN_MILLISECONDS;
  timestamp /= MINUTE_IN_MILLISECONDS;
  const hours = Math.floor(timestamp / 60);
  const minutes = Math.floor(timestamp % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function yesterdayTimeStamp(): number {
  return Date.now() - DAY_IN_MILLISECONDS;
}
