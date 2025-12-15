import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

interface MenuItemProps {
  icon: string;
  title: string;
  onClick?: () => void;
}

function MenuItem({ icon, title, onClick }: MenuItemProps) {
  return (
    <Pressable
      onPress={onClick}
      className="w-full flex-row items-center justify-between p-4 rounded-[16px] bg-[#1a1a1a] border border-[#1e2939]"
    >
      <View className="flex-row items-center gap-3">
        <Text className="text-violet-400 text-[20px]">{icon}</Text>
        <Text className="text-[15px] text-white">{title}</Text>
      </View>
      <Text className="text-[#6a7282] text-[18px]">›</Text>
    </Pressable>
  );
}

export default function MorePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View className="bg-neutral-950 flex-1">
      {/* Header */}
      <View className="bg-[#1a1a1a] px-6 pt-14 pb-4 border-b border-[rgba(30,41,57,0.5)]">
        <Text className="text-white text-[24px] font-semibold">더보기</Text>
      </View>

      <ScrollView className="flex-1 p-5 pb-24">
        <View className="gap-6">
          {/* User Profile */}
          <View className="bg-[rgba(167,139,250,0.15)] rounded-[24px] border border-[rgba(167,139,250,0.3)] p-6">
            <View className="flex-row items-center gap-4">
              <View className="w-[60px] h-[60px] rounded-full items-center justify-center" style={{ backgroundColor: "#a78bfa" }}>
                <Text className="text-white text-[30px]">👤</Text>
              </View>
              <View className="flex-1">
                <Text className="text-[17px] font-semibold text-white">
                  사용자
                </Text>
                <Text className="text-[13px] text-violet-400 mt-1">
                  생산성 마스터 🚀
                </Text>
              </View>
            </View>
          </View>

          {/* Theme Toggle */}
          <View className="w-full flex-row items-center justify-between p-4 rounded-[16px] bg-[#1a1a1a] border border-[#1e2939]">
            <View className="flex-row items-center gap-3">
              <Text className="text-violet-400 text-[20px]">
                {isDarkMode ? "🌙" : "☀️"}
              </Text>
              <Text className="text-[15px] text-white">
                {isDarkMode ? "다크 모드" : "라이트 모드"}
              </Text>
            </View>
            <Pressable
              onPress={toggleTheme}
              className={`w-[52px] h-[28px] rounded-full justify-center ${
                isDarkMode ? "items-end" : "items-start"
              }`}
              style={{
                backgroundColor: isDarkMode ? "#a78bfa" : "#4a5565",
              }}
            >
              <View className="w-[24px] h-[24px] rounded-full bg-white m-[2px]" />
            </Pressable>
          </View>

          {/* Menu Items */}
          <View className="gap-3">
            <MenuItem icon="📖" title="내 회고록" onClick={() => {}} />
            <MenuItem icon="🏆" title="뱃지 목록" onClick={() => {}} />
            <MenuItem icon="⚙️" title="설정" onClick={() => {}} />
            <MenuItem icon="🔔" title="알림 설정" onClick={() => {}} />
            <MenuItem icon="❓" title="도움말" onClick={() => {}} />
            <MenuItem icon="ℹ️" title="앱 정보" onClick={() => {}} />
          </View>

          {/* App Version */}
          <View className="items-center">
            <Text className="text-[13px] text-[#4a5565]">
              Momentum v1.0.0
            </Text>
          </View>

          {/* Logout Button */}
          <Pressable className="w-full flex-row items-center justify-center gap-2 p-4 rounded-[16px] bg-[rgba(255,107,107,0.1)] border border-[rgba(255,107,107,0.3)]">
            <Text className="text-[20px]">🚪</Text>
            <Text className="text-[15px] text-[#ff6b6b]">로그아웃</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
