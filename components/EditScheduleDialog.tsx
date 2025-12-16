import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { Schedule } from "@/types/schedule";
import {
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
  NOTIFICATION_OPTIONS,
} from "@/constants/scheduleConfig";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface EditScheduleDialogProps {
  schedule: Schedule;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditScheduleDialog({
  schedule,
  isOpen,
  onClose,
}: EditScheduleDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    notification: "none",
    category: "",
    status: "pending",
    memo: "",
  });

  useEffect(() => {
    if (schedule) {
      const times = schedule.time.includes("-")
        ? schedule.time.split("-").map((t) => t.trim())
        : [schedule.time, ""];

      setFormData({
        title: schedule.title,
        date: schedule.date || new Date().toISOString().split("T")[0],
        startTime: schedule.startTime || times[0] || "",
        endTime: schedule.endTime || times[1] || "",
        notification: "none",
        category: schedule.category || "",
        status: schedule.status || "pending",
        memo: "",
      });
    }
  }, [schedule]);

  const handleSubmit = () => {
    console.log("Updated schedule data:", formData);
    onClose();
  };

  const handleDelete = () => {
    console.log("Delete schedule:", schedule.id);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/70 justify-end">
        <Pressable className="flex-1" onPress={onClose} />
        <View
          className="bg-neutral-950 rounded-t-[24px] border-t border-l border-r border-[rgba(167,139,250,0.3)]"
          style={{ maxHeight: SCREEN_HEIGHT * 0.9 }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between p-6 border-b border-[rgba(30,41,57,0.5)]">
            <Text className="text-white text-[20px] font-semibold">
              일정 수정
            </Text>
            <Pressable onPress={onClose}>
              <Text className="text-white text-[24px]">✕</Text>
            </Pressable>
          </View>

          {/* Form */}
          <ScrollView
            className="p-6"
            contentContainerStyle={{ paddingBottom: 20 }}
          >
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
                <Text className="text-[#d1d5dc] text-[14px]">시간</Text>
                <View className="flex-row gap-4">
                  <TextInput
                    value={formData.startTime}
                    onChangeText={(text) =>
                      setFormData({ ...formData, startTime: text })
                    }
                    placeholder="00:00"
                    placeholderTextColor="#6a7282"
                    className="flex-1 bg-[rgba(30,41,57,0.5)] border border-[rgba(167,139,250,0.2)] text-white p-3 rounded-[12px]"
                  />
                  <TextInput
                    value={formData.endTime}
                    onChangeText={(text) =>
                      setFormData({ ...formData, endTime: text })
                    }
                    placeholder="00:00"
                    placeholderTextColor="#6a7282"
                    className="flex-1 bg-[rgba(30,41,57,0.5)] border border-[rgba(167,139,250,0.2)] text-white p-3 rounded-[12px]"
                  />
                </View>
              </View>

              {/* Category */}
              <View className="gap-2">
                <Text className="text-[#d1d5dc] text-[14px]">카테고리</Text>
                <View className="flex-row flex-wrap gap-2">
                  {CATEGORY_OPTIONS.map((cat) => (
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

              {/* Status */}
              <View className="gap-2">
                <Text className="text-[#d1d5dc] text-[14px]">상태</Text>
                <View className="flex-row flex-wrap gap-2">
                  {STATUS_OPTIONS.map((stat) => (
                    <Pressable
                      key={stat.value}
                      onPress={() =>
                        setFormData({ ...formData, status: stat.value })
                      }
                      className={`px-4 py-2 rounded-[8px] border ${
                        formData.status === stat.value
                          ? "bg-[rgba(167,139,250,0.2)] border-violet-400"
                          : "bg-[rgba(30,41,57,0.5)] border-[rgba(167,139,250,0.2)]"
                      }`}
                    >
                      <Text
                        className={
                          formData.status === stat.value
                            ? "text-violet-400"
                            : "text-[#d1d5dc]"
                        }
                      >
                        {stat.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
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

              {/* Action Buttons */}
              <View className="flex-row gap-3 pt-2 pb-8">
                <Pressable
                  onPress={handleDelete}
                  className="flex-1 bg-[rgba(255,107,107,0.1)] border border-[rgba(255,107,107,0.3)] py-4 rounded-[16px] items-center"
                >
                  <Text className="text-[#ff6b6b] font-semibold">삭제</Text>
                </Pressable>
                <Pressable
                  onPress={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-[#a78bfa] to-[#818cf8] py-4 rounded-[16px] items-center"
                  style={{
                    backgroundColor: "#a78bfa",
                  }}
                >
                  <Text className="text-white font-semibold">저장</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
