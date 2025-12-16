import React from "react";
import { View, Text, Pressable } from "react-native";
import { Schedule } from "@/types/schedule";
import { CATEGORIES, STATUS_CONFIG } from "@/constants/scheduleConfig";

interface UpcomingScheduleItemProps {
  schedule: Schedule;
  showDivider?: boolean;
  onPress: () => void;
}

export default function UpcomingScheduleItem({
  schedule,
  showDivider = true,
  onPress,
}: UpcomingScheduleItemProps) {
  const category = schedule.category ? CATEGORIES[schedule.category] : null;
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
