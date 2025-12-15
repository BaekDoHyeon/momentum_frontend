import { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import DeepWorkToggle from "@/components/DeepWorkToggle";
import EditScheduleDialog from "@/components/EditScheduleDialog";
import FABButton from "@/components/FABButton";

// Helper function to calculate progress and remaining time
function calculateProgress(startTime: string, endTime: string) {
  const now = new Date();
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  const start = new Date(now);
  start.setHours(startHour, startMin, 0, 0);

  const end = new Date(now);
  end.setHours(endHour, endMin, 0, 0);

  const totalDuration = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();

  const progress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
  const remainingMs = end.getTime() - now.getTime();
  const remainingMinutes = Math.max(0, Math.floor(remainingMs / 60000));

  return {
    progress: Math.round(progress),
    remaining: remainingMinutes > 60
      ? `${Math.floor(remainingMinutes / 60)}시간 ${remainingMinutes % 60}분 남음`
      : `${remainingMinutes}분 남음`
  };
}

const CATEGORIES = {
  work: { label: "업무", color: "#ad46ff" },
  personal: { label: "개인", color: "#ff6b6b" },
  health: { label: "건강", color: "#51cf66" },
  study: { label: "학습", color: "#ffd43b" },
  meeting: { label: "회의", color: "#339af0" },
};

const STATUS_CONFIG = {
  pending: { label: "진행전", color: "#6a7282" },
  completed: { label: "완료", color: "#51cf66" },
  failed: { label: "실패", color: "#ff6b6b" },
};

interface Schedule {
  id: number;
  time: string;
  title: string;
  emoji?: string;
  category?: string;
  startTime?: string;
  endTime?: string;
  progress?: number;
  remaining?: string;
  status?: "pending" | "completed" | "failed";
}

const currentTask: Schedule = {
  id: 0,
  time: "15:00 - 16:00",
  title: "기획 회의",
  emoji: "💼",
  progress: 45,
  remaining: "28분 남음",
  startTime: "15:00",
  endTime: "16:00",
  category: "work",
  status: "pending",
};

// 겹치는 현재 일정들
const overlappingCurrentTasks: Schedule[] = [
  {
    id: 100,
    time: "15:00 - 18:00",
    title: "프로젝트 개발",
    startTime: "15:00",
    endTime: "18:00",
    category: "work",
    status: "pending",
  },
  {
    id: 101,
    time: "15:00 - 20:00",
    title: "딥워크 세션",
    startTime: "15:00",
    endTime: "20:00",
    category: "study",
    status: "pending",
  },
];

const upcomingSchedules: Schedule[] = [
  {
    id: 1,
    time: "08:00 - 09:00",
    title: "아침 식사",
    category: "personal",
    startTime: "08:00",
    endTime: "09:00",
    status: "pending",
  },
  {
    id: 2,
    time: "09:00 - 10:30",
    title: "팀워크: 프로젝트 회의",
    category: "work",
    startTime: "09:00",
    endTime: "10:30",
    status: "pending",
  },
  {
    id: 3,
    time: "10:45 - 11:00",
    title: "휴식 & 스트레칭",
    category: "health",
    startTime: "10:45",
    endTime: "11:00",
    status: "completed",
  },
  {
    id: 4,
    time: "11:00 - 12:00",
    title: "이메일 확인",
    category: "work",
    startTime: "11:00",
    endTime: "12:00",
    status: "pending",
  },
  {
    id: 5,
    time: "13:00 - 14:00",
    title: "점심 약속",
    category: "personal",
    startTime: "13:00",
    endTime: "14:00",
    status: "pending",
  },
  {
    id: 6,
    time: "15:00 - 16:30",
    title: "프로젝트 리뷰",
    category: "work",
    startTime: "15:00",
    endTime: "16:30",
    status: "failed",
  },
  {
    id: 7,
    time: "17:00 - 18:00",
    title: "운동",
    category: "health",
    startTime: "17:00",
    endTime: "18:00",
    status: "pending",
  },
  {
    id: 8,
    time: "19:00 - 20:00",
    title: "저녁 식사",
    category: "personal",
    startTime: "19:00",
    endTime: "20:00",
    status: "pending",
  },
];

function CurrentTaskButton({ onClick }: { onClick: () => void }) {
  const [progressData, setProgressData] = useState({ progress: 45, remaining: "28분 남음" });

  useEffect(() => {
    const updateProgress = () => {
      if (currentTask.startTime && currentTask.endTime) {
        const data = calculateProgress(currentTask.startTime, currentTask.endTime);
        setProgressData(data);
      }
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const category = currentTask.category
    ? CATEGORIES[currentTask.category as keyof typeof CATEGORIES]
    : null;

  return (
    <Pressable
      onPress={onClick}
      className="bg-[rgba(167,139,250,0.08)] h-[183px] rounded-[24px] w-full border border-[rgba(167,139,250,0.2)]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 40,
        elevation: 10,
      }}
    >
      <View className="h-[183px] relative w-full p-[21px]">
        {/* Time and Category Row */}
        <View className="flex-row justify-between items-start mb-4">
          <Text className="text-[14px] text-violet-400">
            {currentTask.time}
          </Text>
          {category && (
            <View
              className="px-[12px] py-[4px] rounded-[6px]"
              style={{
                backgroundColor: `${category.color}30`,
                borderColor: `${category.color}50`,
                borderWidth: 1,
              }}
            >
              <Text
                className="text-[11px]"
                style={{ color: category.color }}
              >
                {category.label}
              </Text>
            </View>
          )}
        </View>

        {/* Title */}
        <Text className="text-[20px] font-semibold text-white mb-4">
          {currentTask.title}
        </Text>

        {/* Progress Bar */}
        <View className="bg-[rgba(255,255,255,0.1)] h-[8px] rounded-full overflow-hidden mb-2">
          <View
            className="h-[8px] bg-gradient-to-r from-[#a78bfa] to-[#818cf8]"
            style={{ width: `${progressData.progress}%` }}
          />
        </View>

        {/* Remaining Time */}
        <Text className="text-[14px] text-[#707070] text-right">
          {progressData.remaining}
        </Text>
      </View>
    </Pressable>
  );
}

// 겹치는 현재 일정 아이템
function OverlappingCurrentScheduleItem({
  schedule,
  onClick,
}: {
  schedule: Schedule;
  onClick: () => void;
}) {
  const [progressData, setProgressData] = useState({ progress: 30, remaining: "" });

  useEffect(() => {
    const updateProgress = () => {
      if (schedule.startTime && schedule.endTime) {
        const data = calculateProgress(schedule.startTime, schedule.endTime);
        setProgressData(data);
      }
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [schedule.startTime, schedule.endTime]);

  const category = schedule.category
    ? CATEGORIES[schedule.category as keyof typeof CATEGORIES]
    : null;

  return (
    <Pressable
      onPress={onClick}
      className="bg-[rgba(167,139,250,0.08)] border border-[rgba(167,139,250,0.2)] rounded-[16px] p-4 w-full"
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-[13px] text-violet-400">
            {schedule.time}
          </Text>
          <Text className="text-[15px] font-semibold text-white mt-1">
            {schedule.title}
          </Text>
        </View>
        {category && (
          <View
            className="px-[12px] py-[4px] rounded-[6px]"
            style={{
              backgroundColor: `${category.color}30`,
              borderColor: `${category.color}50`,
              borderWidth: 1,
            }}
          >
            <Text
              className="text-[11px]"
              style={{ color: category.color }}
            >
              {category.label}
            </Text>
          </View>
        )}
      </View>

      {/* Progress Bar */}
      <View className="bg-[rgba(255,255,255,0.1)] h-[6px] rounded-full overflow-hidden w-full">
        <View
          className="h-full bg-gradient-to-r from-[#a78bfa] to-[#818cf8]"
          style={{ width: `${progressData.progress}%` }}
        />
      </View>
    </Pressable>
  );
}

function ScheduleItem({
  schedule,
  showDivider = true,
  onPress,
}: {
  schedule: Schedule;
  showDivider?: boolean;
  onPress: () => void;
}) {
  const category = schedule.category
    ? CATEGORIES[schedule.category as keyof typeof CATEGORIES]
    : null;
  const status = schedule.status ? STATUS_CONFIG[schedule.status] : null;

  return (
    <View className="w-full">
      <Pressable
        onPress={onPress}
        className="py-3 flex-row justify-between items-center"
      >
        <View className="flex-1 min-w-0">
          <Text className="text-[13px] text-[#6a7282] mb-1">
            {schedule.time}
          </Text>
          <Text className="text-[15px] text-[#d1d5dc]" numberOfLines={1}>
            {schedule.title}
          </Text>
        </View>
        <View className="flex-row gap-[6px] items-center">
          {category && (
            <View
              className="px-[10px] py-[4px] rounded-[6px]"
              style={{
                backgroundColor: `${category.color}30`,
                borderColor: `${category.color}50`,
                borderWidth: 1,
              }}
            >
              <Text className="text-[11px]" style={{ color: category.color }}>
                {category.label}
              </Text>
            </View>
          )}
          {status && (
            <View
              className="px-[10px] py-[4px] rounded-[6px]"
              style={{
                backgroundColor: `${status.color}30`,
                borderColor: `${status.color}50`,
                borderWidth: 1,
              }}
            >
              <Text className="text-[11px]" style={{ color: status.color }}>
                {status.label}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
      {showDivider && <View className="bg-[#1e2939] h-[1px]" />}
    </View>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const hasRetrospective = true;

  const handleScheduleClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    // TODO: Open EditScheduleDialog
  };

  const handleCurrentTaskClick = () => {
    setSelectedSchedule(currentTask);
    // TODO: Open EditScheduleDialog
  };

  return (
    <View className="bg-neutral-950 flex-1">
      {/* Header */}
      <View className="bg-[#1a1a1a] px-6 pt-14 pb-4 border-b border-[rgba(30,41,57,0.5)]">
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-[20px] font-semibold">Momentum</Text>
          <View className="flex-row items-center gap-3">
            {/* Streak Badge */}
            <View className="bg-gradient-to-r from-[rgba(126,42,12,0.4)] to-[rgba(159,45,0,0.4)] rounded-[10px] border border-[rgba(202,53,0,0.3)]">
              <View className="flex-row items-center px-[13px] py-[2px] gap-[6px]">
                <Text className="text-[16px]">🔥</Text>
                <Text className="text-[13px] text-[#ff8904]">7일</Text>
              </View>
            </View>

            {/* Notification Button */}
            <Pressable
              onPress={() => router.push("/notifications")}
              className="relative p-2 rounded-[10px] active:bg-[rgba(167,139,250,0.1)]"
            >
              <Text className="text-[20px]">🔔</Text>
              {/* Notification Badge */}
              <View className="absolute top-1 right-1 w-2 h-2 bg-[#ff6b6b] rounded-full" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Deep Work Toggle */}
        <View className="mb-6">
          <DeepWorkToggle />
        </View>

        {/* Current Schedule Section */}
        <View className="mb-6">
          <Text className="text-[13px] text-[#4a5565] mb-3">현재 일정</Text>
          <CurrentTaskButton onClick={handleCurrentTaskClick} />

          {/* Overlapping Current Schedules */}
          {overlappingCurrentTasks.length > 0 && (
            <View className="gap-3 mt-3">
              {overlappingCurrentTasks.map((schedule) => (
                <OverlappingCurrentScheduleItem
                  key={schedule.id}
                  schedule={schedule}
                  onClick={() => handleScheduleClick(schedule)}
                />
              ))}
            </View>
          )}
        </View>

        {/* Upcoming Schedules */}
        <View className="mb-4">
          <Text className="text-[13px] text-[#4a5565] mb-2">다음 일정</Text>
          {upcomingSchedules.map((schedule, index) => (
            <ScheduleItem
              key={schedule.id}
              schedule={schedule}
              showDivider={index < upcomingSchedules.length - 1}
              onPress={() => handleScheduleClick(schedule)}
            />
          ))}
        </View>

        {/* Retrospective Button */}
        <Pressable
          onPress={() => router.push("/reflection")}
          className="bg-[#1a1a1a] rounded-[16px] border border-[#1e2939] p-4"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Text className="text-[20px]">📝</Text>
              <Text className="text-[15px] text-white">오늘의 회고</Text>
            </View>
            {hasRetrospective ? (
              <View className="flex-row items-center gap-2">
                <View className="w-[20px] h-[20px] rounded-full bg-[#51cf66] items-center justify-center">
                  <Text className="text-white text-[12px]">✓</Text>
                </View>
                <Text className="text-[13px] text-[#51cf66]">작성 완료</Text>
              </View>
            ) : (
              <View className="flex-row items-center gap-2">
                <View className="w-[20px] h-[20px] rounded-full bg-[#6a7282] items-center justify-center">
                  <Text className="text-white text-[12px]">!</Text>
                </View>
                <Text className="text-[13px] text-[#6a7282]">미작성</Text>
              </View>
            )}
          </View>
        </Pressable>
      </ScrollView>

      {/* FAB Button */}
      <FABButton />

      {/* Edit Schedule Dialog */}
      {selectedSchedule && (
        <EditScheduleDialog
          schedule={selectedSchedule}
          isOpen={!!selectedSchedule}
          onClose={() => setSelectedSchedule(null)}
        />
      )}
    </View>
  );
}
