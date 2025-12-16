export type CategoryType = "work" | "personal" | "health" | "study" | "meeting";
export type StatusType = "pending" | "completed" | "failed";

export interface Schedule {
  id: number;
  time: string;
  title: string;
  date?: string;
  emoji?: string;
  category?: CategoryType;
  startTime?: string;
  endTime?: string;
  progress?: number;
  remaining?: string;
  status?: StatusType;
}

export interface Category {
  label: string;
  color: string;
}

export interface StatusConfig {
  label: string;
  color: string;
}
