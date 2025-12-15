import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function FABButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleAddSchedule = () => {
    setIsOpen(false);
    router.push("/add-schedule");
  };

  const handleAddReflection = () => {
    setIsOpen(false);
    router.push("/reflection");
  };

  return (
    <View className="absolute bottom-[85px] right-[24px] z-50">
      <View className="items-end gap-3">
        {/* Action Buttons */}
        {isOpen && (
          <View className="gap-2">
            {/* Add Schedule Button */}
            <Pressable
              onPress={handleAddSchedule}
              className="flex-row items-center gap-2 bg-[rgba(167,139,250,0.3)] border border-[rgba(167,139,250,0.5)] rounded-full px-4 py-3"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text className="text-[20px]">📅</Text>
              <Text className="text-[14px] text-violet-400 pr-1">
                일정 추가
              </Text>
            </Pressable>

            {/* Add Reflection Button */}
            <Pressable
              onPress={handleAddReflection}
              className="flex-row items-center gap-2 bg-[rgba(167,139,250,0.3)] border border-[rgba(167,139,250,0.5)] rounded-full px-4 py-3"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text className="text-[20px]">✏️</Text>
              <Text className="text-[14px] text-violet-400 pr-1">
                회고 작성
              </Text>
            </Pressable>
          </View>
        )}

        {/* Main FAB Button */}
        <Pressable
          onPress={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full items-center justify-center"
          style={{
            backgroundColor: "#a78bfa",
            shadowColor: "rgba(167,139,250,0.4)",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 1,
            shadowRadius: 24,
            elevation: 12,
          }}
        >
          <Text
            className="text-white text-[28px]"
            style={{
              transform: [{ rotate: isOpen ? "45deg" : "0deg" }],
            }}
          >
            +
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
