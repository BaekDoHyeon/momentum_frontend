import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

const CATEGORIES = [
  { value: "work", label: "업무" },
  { value: "personal", label: "개인" },
  { value: "health", label: "건강" },
  { value: "study", label: "학습" },
  { value: "meeting", label: "회의" },
];

const NOTIFICATIONS = [
  { value: "none", label: "알림 없음" },
  { value: "5min", label: "5분 전" },
  { value: "15min", label: "15분 전" },
  { value: "30min", label: "30분 전" },
  { value: "1hour", label: "1시간 전" },
];

export default function AddScheduleForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    notification: "none",
    category: "",
    memo: "",
  });

  const handleSubmit = () => {
    console.log("Schedule data:", formData);
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
          <Text className="text-white text-[20px] font-semibold">
            일정 추가
          </Text>
        </View>
      </View>

      {/* Form */}
      <ScrollView className="flex-1 p-6 pb-24">
        <View className="gap-6">
          {/* Title */}
          <View className="gap-2">
            <Text className="text-[#d1d5dc] text-[14px]">제목</Text>
            <TextInput
              value={formData.title}
              onChangeText={(text) =>
                setFormData({ ...formData, title: text })
              }
              placeholder="일정 제목을 입력하세요"
              placeholderTextColor="#6a7282"
              className="bg-[rgba(30,41,57,0.5)] border border-[rgba(167,139,250,0.2)] text-white p-3 rounded-[12px]"
            />
          </View>

          {/* Date */}
          <View className="gap-2">
            <Text className="text-[#d1d5dc] text-[14px]">날짜</Text>
            <TextInput
              value={formData.date}
              onChangeText={(text) =>
                setFormData({ ...formData, date: text })
              }
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#6a7282"
              className="bg-[rgba(30,41,57,0.5)] border border-[rgba(167,139,250,0.2)] text-white p-3 rounded-[12px]"
            />
          </View>

          {/* Time Range */}
          <View className="gap-2">
            <Text className="text-[#d1d5dc] text-[14px]">일정 시간</Text>
            <View className="bg-[rgba(30,41,57,0.5)] border border-[rgba(167,139,250,0.2)] rounded-[12px] p-4">
              <View className="flex-row items-center justify-between gap-3">
                <View className="flex-1">
                  <Text className="text-[#6a7282] text-[11px] mb-1">
                    시작 시간
                  </Text>
                  <TextInput
                    value={formData.startTime}
                    onChangeText={(text) =>
                      setFormData({ ...formData, startTime: text })
                    }
                    placeholder="00:00"
                    placeholderTextColor="#6a7282"
                    className="text-white text-[20px] font-semibold"
                  />
                </View>

                <Text className="text-[#6a7282] text-[20px]">→</Text>

                <View className="flex-1">
                  <Text className="text-[#6a7282] text-[11px] mb-1">
                    종료 시간
                  </Text>
                  <TextInput
                    value={formData.endTime}
                    onChangeText={(text) =>
                      setFormData({ ...formData, endTime: text })
                    }
                    placeholder="00:00"
                    placeholderTextColor="#6a7282"
                    className="text-white text-[20px] font-semibold"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Notification */}
          <View className="gap-2">
            <Text className="text-[#d1d5dc] text-[14px]">알림</Text>
            <View className="flex-row flex-wrap gap-2">
              {NOTIFICATIONS.map((notif) => (
                <Pressable
                  key={notif.value}
                  onPress={() =>
                    setFormData({ ...formData, notification: notif.value })
                  }
                  className={`px-4 py-2 rounded-[8px] border ${
                    formData.notification === notif.value
                      ? "bg-[rgba(167,139,250,0.2)] border-violet-400"
                      : "bg-[rgba(30,41,57,0.5)] border-[rgba(167,139,250,0.2)]"
                  }`}
                >
                  <Text
                    className={
                      formData.notification === notif.value
                        ? "text-violet-400"
                        : "text-[#d1d5dc]"
                    }
                  >
                    {notif.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Category */}
          <View className="gap-2">
            <Text className="text-[#d1d5dc] text-[14px]">카테고리</Text>
            <View className="flex-row flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.value}
                  onPress={() =>
                    setFormData({ ...formData, category: cat.value })
                  }
                  className={`px-4 py-2 rounded-[8px] border ${
                    formData.category === cat.value
                      ? "bg-[rgba(167,139,250,0.2)] border-violet-400"
                      : "bg-[rgba(30,41,57,0.5)] border-[rgba(167,139,250,0.2)]"
                  }`}
                >
                  <Text
                    className={
                      formData.category === cat.value
                        ? "text-violet-400"
                        : "text-[#d1d5dc]"
                    }
                  >
                    {cat.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Memo */}
          <View className="gap-2">
            <Text className="text-[#d1d5dc] text-[14px]">메모</Text>
            <TextInput
              value={formData.memo}
              onChangeText={(text) =>
                setFormData({ ...formData, memo: text })
              }
              placeholder="메모를 입력하세요"
              placeholderTextColor="#6a7282"
              multiline
              numberOfLines={4}
              className="bg-[rgba(30,41,57,0.5)] border border-[rgba(167,139,250,0.2)] text-white p-3 rounded-[12px] min-h-[120px]"
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
            <Text className="text-white font-semibold text-[16px]">
              저장
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
