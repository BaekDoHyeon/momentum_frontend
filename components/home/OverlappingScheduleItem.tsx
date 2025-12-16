import React from "react";
import { View, Text, Pressable } from "react-native";
import { Schedule } from "@/types/schedule";
import { CATEGORIES } from "@/constants/scheduleConfig";
import { useScheduleProgress } from "@/hooks/useScheduleProgress";

interface OverlappingScheduleItemProps {
  schedule: Schedule;
  onClick: () => void;
}

export default function OverlappingScheduleItem({
  schedule,
  onClick,
}: OverlappingScheduleItemProps) {
  const progressData = useScheduleProgress(schedule.startTime, schedule.endTime);

  const category = schedule.category ? CATEGORIES[schedule.category] : null;

  return (
    <Pressable
      onPress={onClick}
      className="bg-[rgba(167,139,250,0.08)] border border-[rgba(167,139,250,0.2)] rounded-[16px] p-4 w-full"
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-[13px] text-violet-400">{schedule.time}</Text>
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
            <Text className="text-[11px]" style={{ color: category.color }}>
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
