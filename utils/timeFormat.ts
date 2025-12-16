/**
 * Formats total seconds into HH:MM:SS format
 * @param totalSeconds - Total seconds to format
 * @returns Formatted time string (e.g., "02:35:45")
 */
export const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

/**
 * Formats total seconds into daily time format (e.g., "2h 35m")
 * @param totalSeconds - Total seconds to format
 * @returns Formatted time string (e.g., "2h 35m")
 */
export const formatDailyTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

/**
 * Formats total seconds into deep work time format (e.g., "2시간 35분")
 * @param totalSeconds - Total seconds to format
 * @returns Formatted time string in Korean (e.g., "2시간 35분")
 */
export const formatDeepWorkTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes}분`;
  }
  if (minutes === 0) {
    return `${hours}시간`;
  }
  return `${hours}시간 ${minutes}분`;
};

/**
 * Calculates progress percentage and remaining time for a schedule
 * @param startTime - Start time in HH:MM format
 * @param endTime - End time in HH:MM format
 * @returns Object containing progress percentage and remaining time string
 */
export const calculateProgress = (
  startTime: string,
  endTime: string
): { progress: number; remaining: string } => {
  const now = new Date();
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const start = new Date(now);
  start.setHours(startHour, startMinute, 0, 0);

  const end = new Date(now);
  end.setHours(endHour, endMinute, 0, 0);

  const total = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();

  const progress = Math.min(Math.max((elapsed / total) * 100, 0), 100);
  const remainingMs = end.getTime() - now.getTime();
  const remainingMinutes = Math.max(Math.floor(remainingMs / 60000), 0);

  return {
    progress: Math.round(progress),
    remaining: `${remainingMinutes}분 남음`,
  };
};
