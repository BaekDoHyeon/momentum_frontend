import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Schedule } from "@/types/schedule";
import {
  currentTask,
  overlappingCurrentTasks,
  upcomingSchedules,
} from "@/mocks/scheduleData";
import DeepWorkToggle from "@/components/DeepWorkToggle";
import EditScheduleDialog from "@/components/EditScheduleDialog";
import FABButton from "@/components/FABButton";
import CurrentTaskButton from "@/components/home/CurrentTaskButton";
import OverlappingScheduleItem from "@/components/home/OverlappingScheduleItem";
import UpcomingScheduleItem from "@/components/home/UpcomingScheduleItem";

export default function HomePage() {
  const router = useRouter();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const hasRetrospective = true;

  const handleScheduleClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
  };

  const handleCurrentTaskClick = () => {
    setSelectedSchedule(currentTask);
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
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        {/* Deep Work Toggle */}
        <View className="mb-6">
          <DeepWorkToggle />
        </View>

        {/* Current Schedule Section */}
        <View className="mb-6">
          <Text className="text-[13px] text-[#4a5565] mb-3">현재 일정</Text>
          <CurrentTaskButton
            schedule={currentTask}
            onClick={handleCurrentTaskClick}
          />

          {/* Overlapping Current Schedules */}
          {overlappingCurrentTasks.length > 0 && (
            <View className="gap-3 mt-3">
              {overlappingCurrentTasks.map((schedule) => (
                <OverlappingScheduleItem
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
            <UpcomingScheduleItem
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
