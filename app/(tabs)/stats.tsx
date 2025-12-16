import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon?: string;
}) {
  return (
    <View className="bg-[#1a1a1a] rounded-[24px] border border-[#1e2939] p-6">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-[13px] text-[#6a7282]">{title}</Text>
        {icon && <Text className="text-[20px]">{icon}</Text>}
      </View>
      <Text className="text-[28px] font-semibold text-white">{value}</Text>
      {subtitle && (
        <Text className="text-[13px] text-violet-400 mt-1">{subtitle}</Text>
      )}
    </View>
  );
}

// Select Button Component
function SelectButton({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="relative">
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="bg-[rgba(167,139,250,0.15)] border border-[rgba(167,139,250,0.3)] rounded-[8px] px-3 py-1"
      >
        <Text className="text-violet-400 text-[13px]">{value}</Text>
      </Pressable>
      {isOpen && (
        <View className="absolute top-full mt-1 right-0 bg-[#1a1a1a] border border-[rgba(167,139,250,0.3)] rounded-[8px] z-50 min-w-[100px]">
          {options.map((option) => (
            <Pressable
              key={option}
              onPress={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="px-3 py-2 border-b border-[rgba(167,139,250,0.1)] last:border-b-0"
            >
              <Text className="text-white text-[13px]">{option}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

export default function StatsPage() {
  const [focusTimePeriod, setFocusTimePeriod] = useState("주별");
  const [categoryPeriod, setCategoryPeriod] = useState("최근 1개월");

  // Mock data - 집중 시간 추이
  const focusTimeData: Record<string, { name: string; time: number }[]> = {
    일별: [
      { name: "월", time: 3.5 },
      { name: "화", time: 4.2 },
      { name: "수", time: 5.1 },
      { name: "목", time: 3.8 },
      { name: "금", time: 4.5 },
      { name: "토", time: 2.1 },
      { name: "일", time: 1.8 },
    ],
    주별: [
      { name: "1주", time: 18 },
      { name: "2주", time: 22 },
      { name: "3주", time: 25 },
      { name: "4주", time: 28 },
    ],
    월별: [
      { name: "9월", time: 72 },
      { name: "10월", time: 85 },
      { name: "11월", time: 93 },
      { name: "12월", time: 105 },
    ],
  };

  // 시간대별 집중 패턴 데이터
  const heatmapData = [
    { time: "00-02", value: 1 },
    { time: "02-04", value: 0 },
    { time: "04-06", value: 0 },
    { time: "06-08", value: 3 },
    { time: "08-10", value: 5 },
    { time: "10-12", value: 7 },
    { time: "12-14", value: 4 },
    { time: "14-16", value: 9 },
    { time: "16-18", value: 6 },
    { time: "18-20", value: 3 },
    { time: "20-22", value: 2 },
    { time: "22-24", value: 1 },
  ];

  const maxHeatmapValue = Math.max(...heatmapData.map((d) => d.value));
  const currentFocusData = focusTimeData[focusTimePeriod] || focusTimeData["주별"];
  const maxFocusTime = Math.max(...currentFocusData.map((d) => d.time));

  return (
    <View className="bg-neutral-950 flex-1">
      {/* Header */}
      <View className="bg-[#1a1a1a] px-6 pt-14 pb-4 border-b border-[rgba(30,41,57,0.5)]">
        <Text className="text-white text-[24px] font-semibold">통계</Text>
      </View>

      <ScrollView className="flex-1 p-5 pb-24">
        <View className="gap-6">
          {/* 핵심 지표 */}
          <View className="flex-row gap-4">
            <View className="flex-1">
              <StatCard title="달성률" value="85%" subtitle="이번 주" />
            </View>
            <View className="flex-1">
              <StatCard
                title="총 집중 시간"
                value="18.5h"
                subtitle="+2h 지난주 대비"
              />
            </View>
          </View>

          <StatCard
            title="Streak"
            value="7일"
            subtitle="연속 달성 중!"
            icon="🔥"
          />

          {/* 집중 시간 추이 - 일별/주별/월별 선택 추가 */}
          <View className="bg-[#1a1a1a] rounded-[24px] border border-[#1e2939] p-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-[17px] font-semibold text-white">
                집중 시간 추이
              </Text>
              <SelectButton
                options={["일별", "주별", "월별"]}
                value={focusTimePeriod}
                onChange={setFocusTimePeriod}
              />
            </View>
            <View className="flex-row items-end gap-2 h-[150px]">
              {currentFocusData.map((item, index) => {
                const height = (item.time / maxFocusTime) * 100;
                return (
                  <View key={index} className="flex-1 items-center justify-end">
                    <Text className="text-violet-400 text-[11px] mb-1">
                      {item.time}
                      {focusTimePeriod === "일별" ? "h" : focusTimePeriod === "주별" ? "h/주" : "h/월"}
                    </Text>
                    <View
                      className="w-full bg-violet-400 rounded-t-[8px]"
                      style={{ height: `${height}%` }}
                    />
                    <Text className="text-[#6a7282] text-[12px] mt-2">
                      {item.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* 시간대별 집중 패턴 */}
          <View className="bg-[#1a1a1a] rounded-[24px] border border-[#1e2939] p-6">
            <Text className="text-[17px] font-semibold text-white mb-2">
              시간대별 집중 패턴
            </Text>
            <Text className="text-[13px] text-violet-400 mb-4">
              오후 2-4시에 집중력이 가장 높아요
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {heatmapData.map((item) => {
                const opacity = item.value / maxHeatmapValue;
                return (
                  <View
                    key={item.time}
                    className="w-[30%] p-3 rounded-[12px]"
                    style={{
                      backgroundColor:
                        item.value === 0
                          ? "rgba(106, 114, 130, 0.1)"
                          : `rgba(167, 139, 250, ${0.2 + opacity * 0.6})`,
                    }}
                  >
                    <Text className="text-white text-[11px] mb-1">
                      {item.time}
                    </Text>
                    <Text className="text-white text-[16px] font-semibold">
                      {item.value}h
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* 평균 세션 길이 & 시간 추정 정확도 */}
          <View className="flex-row gap-4">
            <View className="flex-1 bg-[#1a1a1a] rounded-[24px] border border-[#1e2939] p-6">
              <Text className="text-[13px] text-[#6a7282] mb-2">
                평균 세션 길이
              </Text>
              <Text className="text-[28px] font-semibold text-white">52분</Text>
              <Text className="text-[13px] text-[#51cf66] mt-1">
                +8분 지난주 대비
              </Text>
            </View>
            <View className="flex-1 bg-[#1a1a1a] rounded-[24px] border border-[#1e2939] p-6">
              <Text className="text-[13px] text-[#6a7282] mb-2">
                시간 추정 정확도
              </Text>
              <Text className="text-[28px] font-semibold text-white">92%</Text>
              <Text className="text-[13px] text-violet-400 mt-1">
                계획 vs 실제
              </Text>
            </View>
          </View>

          {/* 일정 완료율 추이 */}
          <View className="bg-[#1a1a1a] rounded-[24px] border border-[#1e2939] p-6">
            <Text className="text-[17px] font-semibold text-white mb-4">
              일정 완료율 추이
            </Text>
            <View className="gap-3">
              {[
                { label: "월", rate: 80 },
                { label: "화", rate: 90 },
                { label: "수", rate: 85 },
                { label: "목", rate: 95 },
                { label: "금", rate: 88 },
                { label: "토", rate: 70 },
                { label: "일", rate: 60 },
              ].map((day) => (
                <View key={day.label} className="flex-row items-center gap-3">
                  <Text className="text-[13px] text-[#6a7282] w-[20px]">
                    {day.label}
                  </Text>
                  <View className="flex-1 bg-[rgba(255,255,255,0.1)] h-[8px] rounded-full overflow-hidden">
                    <View
                      className="h-full bg-[#51cf66] rounded-full"
                      style={{ width: `${day.rate}%` }}
                    />
                  </View>
                  <Text className="text-[13px] text-[#d1d5dc] w-[40px] text-right">
                    {day.rate}%
                  </Text>
                </View>
              ))}
            </View>
            <Text className="text-[13px] text-violet-400 mt-4">
              목요일에 가장 많이 달성해요
            </Text>
          </View>

          {/* 가장 많이 미룬 카테고리 & 작성된 회고 */}
          <View className="flex-row gap-4">
            <View className="flex-1 bg-[#1a1a1a] rounded-[24px] border border-[#1e2939] p-6">
              <Text className="text-[13px] text-[#6a7282] mb-2">
                가장 많이 미룬 카테고리
              </Text>
              <Text className="text-[20px] font-semibold text-white">업무</Text>
              <Text className="text-[13px] text-[#ff6b6b] mt-1">
                미완료 8건
              </Text>
            </View>
            <View className="flex-1 bg-[#1a1a1a] rounded-[24px] border border-[#1e2939] p-6">
              <Text className="text-[13px] text-[#6a7282] mb-2">
                작성된 회고
              </Text>
              <Text className="text-[20px] font-semibold text-white">23개</Text>
              <Text className="text-[13px] text-violet-400 mt-1">
                이번 달
              </Text>
            </View>
          </View>

          {/* 카테고리별 분포 - 기간 선택 추가 */}
          <View className="bg-[#1a1a1a] rounded-[24px] border border-[#1e2939] p-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-[17px] font-semibold text-white">
                카테고리별 분포
              </Text>
              <SelectButton
                options={["최근 1개월", "최근 3개월", "최근 6개월", "최근 1년"]}
                value={categoryPeriod}
                onChange={setCategoryPeriod}
              />
            </View>
            <View className="gap-3">
              {[
                { label: "업무", count: 18, color: "#ad46ff" },
                { label: "개인", count: 12, color: "#ff6b6b" },
                { label: "건강", count: 10, color: "#51cf66" },
                { label: "학습", count: 8, color: "#ffd43b" },
              ].map((category) => (
                <View
                  key={category.label}
                  className="flex-row items-center justify-between"
                >
                  <View className="flex-row items-center gap-2">
                    <View
                      className="w-[12px] h-[12px] rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <Text className="text-[13px] text-[#d1d5dc]">
                      {category.label}
                    </Text>
                  </View>
                  <Text className="text-[13px] text-[#6a7282]">
                    {category.count}건
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
