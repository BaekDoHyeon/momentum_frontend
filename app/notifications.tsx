import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";

interface Notification {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsPage() {
  const router = useRouter();

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: "1",
      type: "success",
      title: "일정 완료",
      message: '"팀 회의 준비" 일정을 완료했습니다!',
      time: "10분 전",
      read: false,
    },
    {
      id: "2",
      type: "info",
      title: "회고 작성 알림",
      message: "오늘의 회고를 작성해보세요.",
      time: "1시간 전",
      read: false,
    },
    {
      id: "3",
      type: "warning",
      title: "일정 시작 알림",
      message: '"프로젝트 기획" 일정이 15분 후 시작됩니다.',
      time: "2시간 전",
      read: true,
    },
    {
      id: "4",
      type: "success",
      title: "Streak 달성",
      message: "7일 연속 달성! 계속해서 좋은 습관을 유지하세요.",
      time: "어제",
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✓";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "•";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "#10b981";
      case "warning":
        return "#fb923c";
      case "info":
        return "#3b82f6";
      default:
        return "#6b7280";
    }
  };

  const getBackgroundColor = (type: string, read: boolean) => {
    if (read) return "rgba(30,41,57,0.3)";

    switch (type) {
      case "success":
        return "rgba(16,185,129,0.1)";
      case "warning":
        return "rgba(251,146,60,0.1)";
      case "info":
        return "rgba(59,130,246,0.1)";
      default:
        return "rgba(30,41,57,0.5)";
    }
  };

  return (
    <View className="bg-neutral-950 flex-1">
      {/* Header */}
      <View className="bg-[#1a1a1a] px-6 pt-14 pb-4 border-b border-[rgba(30,41,57,0.5)]">
        <View className="flex-row items-center gap-4">
          <Pressable onPress={() => router.back()}>
            <Text className="text-white text-[24px]">←</Text>
          </Pressable>
          <Text className="text-white text-[20px] font-semibold">알림</Text>
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView className="flex-1 p-6">
        <View className="gap-3">
          {notifications.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Text className="text-[64px] mb-4">🔔</Text>
              <Text className="text-[#6a7282] text-[15px]">알림이 없습니다</Text>
            </View>
          ) : (
            notifications.map((notification) => (
              <View
                key={notification.id}
                className="rounded-[16px] border border-[rgba(167,139,250,0.2)] p-4"
                style={{
                  backgroundColor: getBackgroundColor(
                    notification.type,
                    notification.read
                  ),
                }}
              >
                <View className="flex-row items-start gap-3">
                  <View
                    className="w-[24px] h-[24px] rounded-full items-center justify-center mt-1"
                    style={{ backgroundColor: `${getIconColor(notification.type)}30` }}
                  >
                    <Text
                      className="text-[14px]"
                      style={{ color: getIconColor(notification.type) }}
                    >
                      {getIcon(notification.type)}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-start justify-between mb-1">
                      <Text className="text-white text-[15px] font-semibold flex-1">
                        {notification.title}
                      </Text>
                      {!notification.read && (
                        <View className="w-2 h-2 bg-violet-400 rounded-full mt-1.5 ml-2" />
                      )}
                    </View>
                    <Text className="text-[#d1d5dc] text-[13px] mb-2">
                      {notification.message}
                    </Text>
                    <Text className="text-[#6a7282] text-[11px]">
                      {notification.time}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
