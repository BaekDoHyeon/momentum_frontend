import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { CATEGORY_OPTIONS, NOTIFICATION_OPTIONS } from "@/constants/scheduleConfig";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요";
    }

    if (!formData.date.trim()) {
      newErrors.date = "날짜를 입력해주세요";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
      newErrors.date = "날짜 형식이 올바르지 않습니다 (YYYY-MM-DD)";
    }

    if (!formData.startTime.trim()) {
      newErrors.startTime = "시작 시간을 입력해주세요";
    } else if (!/^\d{2}:\d{2}$/.test(formData.startTime)) {
      newErrors.startTime = "시간 형식이 올바르지 않습니다 (HH:MM)";
    }

    if (!formData.endTime.trim()) {
      newErrors.endTime = "종료 시간을 입력해주세요";
    } else if (!/^\d{2}:\d{2}$/.test(formData.endTime)) {
      newErrors.endTime = "시간 형식이 올바르지 않습니다 (HH:MM)";
    }

    if (!formData.category) {
      newErrors.category = "카테고리를 선택해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert("입력 오류", "필수 항목을 모두 입력해주세요");
      return;
    }

    // TODO: Save schedule data to backend/storage
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
            <Text className="text-[#d1d5dc] text-[14px]">
              제목 <Text className="text-[#ff6b6b]">*</Text>
            </Text>
            <TextInput
              value={formData.title}
              onChangeText={(text) => {
                setFormData({ ...formData, title: text });
                if (errors.title) setErrors({ ...errors, title: "" });
              }}
              placeholder="일정 제목을 입력하세요"
              placeholderTextColor="#6a7282"
              className={`bg-[rgba(30,41,57,0.5)] border ${
                errors.title ? "border-[#ff6b6b]" : "border-[rgba(167,139,250,0.2)]"
              } text-white p-3 rounded-[12px]`}
            />
            {errors.title && (
              <Text className="text-[#ff6b6b] text-[12px]">{errors.title}</Text>
            )}
          </View>

          {/* Date */}
          <View className="gap-2">
            <Text className="text-[#d1d5dc] text-[14px]">
              날짜 <Text className="text-[#ff6b6b]">*</Text>
            </Text>
            {/* TODO: Replace TextInput with DateTimePicker for better UX */}
            {/* Consider using @react-native-community/datetimepicker */}
            <TextInput
              value={formData.date}
              onChangeText={(text) => {
                setFormData({ ...formData, date: text });
                if (errors.date) setErrors({ ...errors, date: "" });
              }}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#6a7282"
              className={`bg-[rgba(30,41,57,0.5)] border ${
                errors.date ? "border-[#ff6b6b]" : "border-[rgba(167,139,250,0.2)]"
              } text-white p-3 rounded-[12px]`}
            />
            {errors.date && (
              <Text className="text-[#ff6b6b] text-[12px]">{errors.date}</Text>
            )}
          </View>

          {/* Time Range */}
          <View className="gap-2">
            <Text className="text-[#d1d5dc] text-[14px]">
              일정 시간 <Text className="text-[#ff6b6b]">*</Text>
            </Text>
            {/* TODO: Replace TextInput with TimePicker for better UX */}
            <View
              className={`bg-[rgba(30,41,57,0.5)] border ${
                errors.startTime || errors.endTime
                  ? "border-[#ff6b6b]"
                  : "border-[rgba(167,139,250,0.2)]"
              } rounded-[12px] p-4`}
            >
              <View className="flex-row items-center justify-between gap-3">
                <View className="flex-1">
                  <Text className="text-[#6a7282] text-[11px] mb-1">
                    시작 시간
                  </Text>
                  <TextInput
                    value={formData.startTime}
                    onChangeText={(text) => {
                      setFormData({ ...formData, startTime: text });
                      if (errors.startTime) setErrors({ ...errors, startTime: "" });
                    }}
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
                    onChangeText={(text) => {
                      setFormData({ ...formData, endTime: text });
                      if (errors.endTime) setErrors({ ...errors, endTime: "" });
                    }}
                    placeholder="00:00"
                    placeholderTextColor="#6a7282"
                    className="text-white text-[20px] font-semibold"
                  />
                </View>
              </View>
            </View>
            {(errors.startTime || errors.endTime) && (
              <Text className="text-[#ff6b6b] text-[12px]">
                {errors.startTime || errors.endTime}
              </Text>
            )}
          </View>

          {/* Notification */}
          <View className="gap-2">
            <Text className="text-[#d1d5dc] text-[14px]">알림</Text>
            <View className="flex-row flex-wrap gap-2">
              {NOTIFICATION_OPTIONS.map((notif) => (
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
            <Text className="text-[#d1d5dc] text-[14px]">
              카테고리 <Text className="text-[#ff6b6b]">*</Text>
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((cat) => (
                <Pressable
                  key={cat.value}
                  onPress={() => {
                    setFormData({ ...formData, category: cat.value });
                    if (errors.category) setErrors({ ...errors, category: "" });
                  }}
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
            {errors.category && (
              <Text className="text-[#ff6b6b] text-[12px]">{errors.category}</Text>
            )}
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
