import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";

export default function DeepWorkToggle() {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [totalDailySeconds] = useState(3 * 3600 + 25 * 60); // Mock: 3h 25m

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatDailyTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <View className="flex-row gap-3 w-full">
      {/* Daily Deep Work Stats Card */}
      <View className="flex-1 bg-[#1a1a1a] rounded-[20px] border border-[#1e2939] p-5 justify-center">
        <Text className="text-[11px] text-[#6a7282] mb-2">
          오늘 누적 딥워크
        </Text>
        <Text className="text-[24px] font-semibold text-violet-400">
          {formatDailyTime(totalDailySeconds)}
        </Text>
      </View>

      {/* Deep Work Toggle Button Card */}
      <Pressable
        onPress={() => setIsActive(!isActive)}
        className={`flex-1 bg-[#1a1a1a] rounded-[20px] border p-5 flex-row items-center justify-center gap-3 ${
          isActive
            ? 'border-[rgba(167,139,250,0.6)]'
            : 'border-[#1e2939]'
        }`}
        style={isActive ? {
          backgroundColor: 'rgba(167,139,250,0.1)'
        } : {}}
      >
        <Text className="text-[32px]">
          {isActive ? '🧠' : '⏱️'}
        </Text>
        <View className="items-start">
          <Text className="text-[13px] font-semibold text-white">
            {isActive ? '딥워크 진행중' : '딥워크 시작'}
          </Text>
          {isActive && (
            <Text className="text-[17px] text-violet-400 font-semibold">
              {formatTime(seconds)}
            </Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}
