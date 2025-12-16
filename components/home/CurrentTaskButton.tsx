import React from "react";
import { View, Text, Pressable } from "react-native";
import { Schedule } from "@/types/schedule";
import { CATEGORIES } from "@/constants/scheduleConfig";
import { useScheduleProgress } from "@/hooks/useScheduleProgress";

interface CurrentTaskButtonProps {
  schedule: Schedule;
  onClick: () => void;
}

export default function CurrentTaskButton({
  schedule,
  onClick,
}: CurrentTaskButtonProps) {
  const progressData = useScheduleProgress(
    schedule.startTime,
    schedule.endTime,
    schedule.progress
  );

  const category = schedule.category
    ? CATEGORIES[schedule.category]
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
          <Text className="text-[14px] text-violet-400">{schedule.time}</Text>
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

        {/* Title */}
        <Text className="text-[20px] font-semibold text-white mb-4">
          {schedule.title}
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
