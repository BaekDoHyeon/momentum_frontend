import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Schedule } from "@/types/schedule";
import { CATEGORIES, STATUS_CONFIG } from "@/constants/scheduleConfig";
import EditScheduleDialog from "@/components/EditScheduleDialog";
import FABButton from "@/components/FABButton";

const mockSchedules: Schedule[] = [
  { id: 1, date: "2025-12-13", time: "09:00 - 10:30", title: "팀워크 프로젝트", category: "work", emoji: "💼", status: "pending" },
  { id: 2, date: "2025-12-13", time: "10:45 - 11:00", title: "휴식 & 스트레칭", category: "health", emoji: "🧘‍♀️", status: "completed" },
  { id: 3, date: "2025-12-13", time: "11:00 - 12:00", title: "이메일 확인", category: "work", emoji: "📧", status: "pending" },
  { id: 4, date: "2025-12-13", time: "14:00 - 15:30", title: "프로젝트 기획 회의", category: "meeting", emoji: "📊", status: "pending" },
  { id: 5, date: "2025-12-15", time: "09:00 - 10:00", title: "아침 요가", category: "health", emoji: "🧘", status: "pending" },
  { id: 6, date: "2025-12-15", time: "10:30 - 12:00", title: "코드 리뷰", category: "work", emoji: "💻", status: "pending" },
  { id: 7, date: "2025-12-15", time: "15:00 - 16:00", title: "개인 공부", category: "study", emoji: "📚", status: "pending" },
  { id: 8, date: "2025-12-20", time: "10:00 - 11:30", title: "클라이언트 미팅", category: "meeting", emoji: "🤝", status: "pending" },
  { id: 9, date: "2025-12-20", time: "14:00 - 15:00", title: "체육관 운동", category: "health", emoji: "💪", status: "completed" },
  { id: 10, date: "2025-12-25", time: "10:00 - 12:00", title: "가족 모임", category: "personal", emoji: "🎄", status: "pending" },
];

export default function SchedulePage() {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [selectedDate, setSelectedDate] = useState("2025-12-13");

  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const filteredSchedules = mockSchedules.filter(s => s.date === selectedDate);
  const [year, month] = selectedDate.split("-").map(Number);

  // 간단한 캘린더 생성
  const getDaysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m - 1, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const calendarDays = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const handleScheduleClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
  };

  return (
    <View className="bg-neutral-950 flex-1">
      {/* Header */}
      <View className="bg-[#1a1a1a] px-6 pt-14 pb-4 border-b border-[rgba(30,41,57,0.5)]">
        <Text className="text-white text-[20px] font-semibold">일정</Text>
      </View>

      <ScrollView className="flex-1 p-5 pb-24">
        {/* Calendar Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-white text-[17px]">
            {year}년 {monthNames[month - 1]}
          </Text>
          <View className="flex-row gap-3">
            <Pressable onPress={() => {}}>
              <Text className="text-[#99A1AF] text-[20px]">←</Text>
            </Pressable>
            <Pressable onPress={() => {}}>
              <Text className="text-[#99A1AF] text-[20px]">→</Text>
            </Pressable>
          </View>
        </View>

        {/* Weekday Headers */}
        <View className="flex-row mb-2">
          {weekdays.map((day, i) => (
            <View key={i} className="flex-1 items-center">
              <Text className={`text-[13px] ${i === 0 ? "text-[#ff6467]" : i === 6 ? "text-[#51a2ff]" : "text-[#6a7282]"}`}>
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View className="flex-row flex-wrap mb-6">
          {calendarDays.map((day, i) => (
            <Pressable
              key={i}
              className="w-[14.28%] aspect-square items-center justify-center"
              onPress={() => {
                if (day) {
                  const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  setSelectedDate(dateStr);
                }
              }}
            >
              {day && (
                <View className={`w-[90%] aspect-square rounded-[14px] items-center justify-center ${
                  selectedDate === `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                    ? "bg-[rgba(167,139,250,0.4)] border-2 border-violet-400"
                    : ""
                }`}>
                  <Text className="text-[#d1d5dc] text-[15px]">{day}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>

        {/* Schedule List */}
        <View className="gap-3">
          <Text className="text-[#4a5565] text-[13px] mb-2">
            {selectedDate} 일정
          </Text>
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((schedule) => {
              const category = CATEGORIES[schedule.category as keyof typeof CATEGORIES];
              const status = schedule.status ? STATUS_CONFIG[schedule.status] : null;

              return (
                <Pressable
                  key={schedule.id}
                  onPress={() => handleScheduleClick(schedule)}
                  className="bg-[#1a1a1a] rounded-[16px] border border-[#1e2939] p-4"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3 flex-1">
                      <Text className="text-[24px]">{schedule.emoji}</Text>
                      <View className="flex-1">
                        <Text className="text-white text-[15px] font-semibold">
                          {schedule.title}
                        </Text>
                        <Text className="text-[#6a7282] text-[13px]">
                          {schedule.time}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row gap-2">
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
                  </View>
                </Pressable>
              );
            })
          ) : (
            <View className="items-center py-10">
              <Text className="text-[#6a7282] text-[14px]">이 날짜에 일정이 없습니다</Text>
            </View>
          )}
        </View>
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
