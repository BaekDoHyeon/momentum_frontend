import { CategoryType, StatusType, Category, StatusConfig } from "@/types/schedule";

export const CATEGORIES: Record<CategoryType, Category> = {
  work: { label: "업무", color: "#ad46ff" },
  personal: { label: "개인", color: "#ff6b6b" },
  health: { label: "건강", color: "#51cf66" },
  study: { label: "학습", color: "#ffd43b" },
  meeting: { label: "회의", color: "#339af0" },
} as const;

export const STATUS_CONFIG: Record<StatusType, StatusConfig> = {
  pending: { label: "진행전", color: "#6a7282" },
  completed: { label: "완료", color: "#51cf66" },
  failed: { label: "실패", color: "#ff6b6b" },
} as const;

export const CATEGORY_OPTIONS = [
  { value: "work" as const, label: "업무" },
  { value: "personal" as const, label: "개인" },
  { value: "health" as const, label: "건강" },
  { value: "study" as const, label: "학습" },
  { value: "meeting" as const, label: "회의" },
] as const;

export const STATUS_OPTIONS = [
  { value: "pending" as const, label: "대기 중" },
  { value: "completed" as const, label: "완료" },
  { value: "failed" as const, label: "실패" },
] as const;

export const NOTIFICATION_OPTIONS = [
  { value: "none", label: "알림 없음" },
  { value: "5min", label: "5분 전" },
  { value: "10min", label: "10분 전" },
  { value: "30min", label: "30분 전" },
  { value: "1hour", label: "1시간 전" },
] as const;
