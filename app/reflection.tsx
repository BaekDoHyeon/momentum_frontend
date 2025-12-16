import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { formatDeepWorkTime } from "@/utils/timeFormat";

export default function ReflectionForm() {
  const router = useRouter();
  const [satisfaction, setSatisfaction] = useState<number>(0);
  const [focus, setFocus] = useState<number>(0);
  const [goodPoints, setGoodPoints] = useState("");
  const [improvementPoints, setImprovementPoints] = useState("");
  const [freeReflection, setFreeReflection] = useState("");

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const todayDeepWorkMinutes = 145;
  const todayCompletedSchedules = 5;
  const todayTotalSchedules = 8;

  const satisfactionLevels = [
    { value: 1, emoji: "😞" },
    { value: 2, emoji: "😕" },
    { value: 3, emoji: "😐" },
    { value: 4, emoji: "🙂" },
    { value: 5, emoji: "😊" },
  ];

  const focusLevels = [1, 2, 3, 4, 5];

  const handleSubmit = () => {
    console.log("Reflection data:", {
      satisfaction,
      focus,
      goodPoints,
      improvementPoints,
      freeReflection,
    });
    router.back();
  };

  return (
    <View className="bg-neutral-950 flex-1">
      {/* Header */}
      <View className="bg-[#1a1a1a] px-6 pt-14 pb-4 border-b border-[rgba(30,41,57,0.5)]">
        <View className="flex-row items-center gap-4">
          <Pressable onPress={() => router.back()}>
            <Text className="text-white text-[24px]">←</Text>
          </Pressable>
          <View className="flex-1">
            <Text className="text-white text-[20px] font-semibold">
              회고 작성
            </Text>
            <Text className="text-[#6a7282] text-[13px] mt-1">{today}</Text>
          </View>
        </View>
      </View>

      {/* Form */}
      <ScrollView className="flex-1 p-6 pb-24">
        <View className="gap-6">
          {/* Today's Summary */}
          <View className="bg-[rgba(30,41,57,0.5)] border border-[rgba(167,139,250,0.2)] rounded-[16px] p-5">
            <Text className="text-white text-[16px] font-semibold mb-4">
              📊 오늘 하루 요약
            </Text>
            <View className="flex-row gap-4">
              <View className="flex-1 flex-row items-center gap-3">
                <View className="bg-[rgba(167,139,250,0.2)] p-3 rounded-[12px]">
                  <Text className="text-[20px]">⏱️</Text>
                </View>
                <View>
                  <Text className="text-[#6a7282] text-[11px]">딥워크</Text>
                  <Text className="text-white text-[16px] font-semibold">
                    {formatDeepWorkTime(todayDeepWorkMinutes * 60)}
                  </Text>
                </View>
              </View>
              <View className="flex-1 flex-row items-center gap-3">
                <View className="bg-[rgba(167,139,250,0.2)] p-3 rounded-[12px]">
                  <Text className="text-[20px]">✓</Text>
                </View>
                <View>
                  <Text className="text-[#6a7282] text-[11px]">일정 완료</Text>
                  <Text className="text-white text-[16px] font-semibold">
                    {todayCompletedSchedules}/{todayTotalSchedules}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Satisfaction Rating */}
          <View className="gap-3">
            <Text className="text-[#d1d5dc] text-[14px]">⭐ 오늘의 만족도</Text>
            <View className="flex-row gap-2">
              {satisfactionLevels.map((level) => (
                <Pressable
                  key={level.value}
                  onPress={() => setSatisfaction(level.value)}
                  className={`flex-1 py-3 rounded-[12px] items-center border ${
                    satisfaction === level.value
                      ? "bg-[rgba(167,139,250,0.2)] border-violet-400"
                      : "bg-[rgba(30,41,57,0.5)] border-[rgba(167,139,250,0.2)]"
                  }`}
                >
                  <Text className="text-[24px]">{level.emoji}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Focus Rating */}
          <View className="gap-3">
            <Text className="text-[#d1d5dc] text-[14px]">🎯 집중도</Text>
            <View className="flex-row gap-2">
              {focusLevels.map((level) => (
                <Pressable
                  key={level}
                  onPress={() => setFocus(level)}
                  className={`flex-1 py-3 rounded-[12px] items-center border ${
                    focus === level
                      ? "bg-[rgba(167,139,250,0.2)] border-violet-400"
                      : "bg-[rgba(30,41,57,0.5)] border-[rgba(167,139,250,0.2)]"
                  }`}
                >
                  <Text
                    className={
                      focus === level ? "text-violet-400" : "text-[#d1d5dc]"
                    }
                  >
                    {level}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Good Points */}
          <View className="gap-2">
            <Text className="text-[#d1d5dc] text-[14px]">
              ✨ 오늘 잘한 점
            </Text>
            <TextInput
              value={goodPoints}
              onChangeText={setGoodPoints}
              placeholder="오늘 하루 동안 잘 실천했거나 성취한 것을 적어보세요"
              placeholderTextColor="#6a7282"
              multiline
              numberOfLines={4}
              className="bg-[rgba(30,41,57,0.5)] border border-[rgba(167,139,250,0.2)] text-white p-3 rounded-[12px] min-h-[100px]"
              textAlignVertical="top"
            />
          </View>

          {/* Improvement Points */}
          <View className="gap-2">
            <Text className="text-[#d1d5dc] text-[14px]">
              💡 개선할 점
            </Text>
            <TextInput
              value={improvementPoints}
              onChangeText={setImprovementPoints}
              placeholder="내일 더 나아지기 위해 개선할 점을 적어보세요"
              placeholderTextColor="#6a7282"
              multiline
              numberOfLines={4}
              className="bg-[rgba(30,41,57,0.5)] border border-[rgba(167,139,250,0.2)] text-white p-3 rounded-[12px] min-h-[100px]"
              textAlignVertical="top"
            />
          </View>

          {/* Free Reflection */}
          <View className="gap-2">
            <Text className="text-[#d1d5dc] text-[14px]">
              📝 자유 회고
            </Text>
            <TextInput
              value={freeReflection}
              onChangeText={setFreeReflection}
              placeholder="자유롭게 오늘의 생각을 기록해보세요"
              placeholderTextColor="#6a7282"
              multiline
              numberOfLines={6}
              className="bg-[rgba(30,41,57,0.5)] border border-[rgba(167,139,250,0.2)] text-white p-3 rounded-[12px] min-h-[150px]"
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <Pressable
            onPress={handleSubmit}
            className="w-full py-4 rounded-[16px] items-center"
            style={{
              backgroundColor: "#a78bfa",
            }}
          >
            <Text className="text-white font-semibold text-[16px]">저장</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
