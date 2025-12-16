import { useState, useEffect } from "react";
import { calculateProgress } from "@/utils/timeFormat";

interface ProgressData {
  progress: number;
  remaining: string;
}

/**
 * Custom hook to track schedule progress in real-time
 * Updates every minute with current progress percentage and remaining time
 */
export function useScheduleProgress(
  startTime?: string,
  endTime?: string,
  initialProgress = 0
): ProgressData {
  const [progressData, setProgressData] = useState<ProgressData>({
    progress: initialProgress,
    remaining: "0분 남음",
  });

  useEffect(() => {
    if (!startTime || !endTime) return;

    const updateProgress = () => {
      const data = calculateProgress(startTime, endTime);
      setProgressData(data);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return progressData;
}
