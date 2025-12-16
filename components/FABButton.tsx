import { useState, useCallback, useMemo, memo } from "react";
import { View, Text, Pressable, ViewStyle } from "react-native";
import { useRouter } from "expo-router";

const ACTION_BUTTON_SHADOW: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
};

const MAIN_FAB_SHADOW: ViewStyle = {
  backgroundColor: "#a78bfa",
  shadowColor: "rgba(167,139,250,0.4)",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 1,
  shadowRadius: 24,
  elevation: 12,
};

interface ActionButtonProps {
  onPress: () => void;
  emoji: string;
  label: string;
}

const ActionButton = memo(({ onPress, emoji, label }: ActionButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-2 bg-[rgba(167,139,250,0.3)] border border-[rgba(167,139,250,0.5)] rounded-full px-4 py-3"
      style={ACTION_BUTTON_SHADOW}
    >
      <Text className="text-[20px]">{emoji}</Text>
      <Text className="text-[14px] text-violet-400 pr-1">{label}</Text>
    </Pressable>
  );
});
ActionButton.displayName = "ActionButton";

export default function FABButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleAddSchedule = useCallback(() => {
    setIsOpen(false);
    router.push("/add-schedule");
  }, [router]);

  const handleAddReflection = useCallback(() => {
    setIsOpen(false);
    router.push("/reflection");
  }, [router]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const rotationStyle = useMemo(
    () => ({
      transform: [{ rotate: isOpen ? "45deg" : "0deg" }],
    }),
    [isOpen]
  );

  return (
    <View className="absolute bottom-[85px] right-[24px] z-50">
      <View className="items-end gap-3">
        {/* Action Buttons */}
        {isOpen && (
          <View className="gap-2">
            <ActionButton
              onPress={handleAddSchedule}
              emoji="📅"
              label="일정 추가"
            />
            <ActionButton
              onPress={handleAddReflection}
              emoji="✏️"
              label="회고 작성"
            />
          </View>
        )}

        {/* Main FAB Button */}
        <Pressable
          onPress={toggleOpen}
          className="w-14 h-14 rounded-full items-center justify-center"
          style={MAIN_FAB_SHADOW}
        >
          <Text className="text-white text-[28px]" style={rotationStyle}>
            +
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
