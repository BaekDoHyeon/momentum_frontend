# React Native & Expo 완전 정복 가이드

> 백엔드 개발자를 위한 React Native/Expo 초급~고급 완전 정리
> 작성일: 2025-12-17

---

## 📚 목차

1. [React Native 기초 개념](#1-react-native-기초-개념)
2. [Expo 생태계](#2-expo-생태계)
3. [컴포넌트 & JSX](#3-컴포넌트--jsx)
4. [Props & State](#4-props--state)
5. [Navigation & Routing (Expo Router)](#5-navigation--routing-expo-router)
6. [Styling & UI](#6-styling--ui)
7. [State Management](#7-state-management)
8. [Hooks 완전 정복](#8-hooks-완전-정복)
9. [Performance & 최적화](#9-performance--최적화)
10. [애니메이션](#10-애니메이션)
11. [실전 패턴 & 요령](#11-실전-패턴--요령)
12. [디버깅 & 트러블슈팅](#12-디버깅--트러블슈팅)

---

## 1. React Native 기초 개념

### 1.1 React Native란?

React Native는 **JavaScript로 네이티브 모바일 앱을 만드는 프레임워크**입니다.

```
웹 React: JavaScript → HTML/CSS → 브라우저 렌더링
React Native: JavaScript → Native Components → iOS/Android 네이티브 렌더링
```

**핵심 차이점:**
- `<div>` ❌ → `<View>` ✅
- `<span>` ❌ → `<Text>` ✅
- `<button>` ❌ → `<Pressable>` ✅
- CSS 파일 ❌ → StyleSheet 또는 NativeWind ✅

### 1.2 프로젝트 구조 이해

```
momentum_frontend/
├── app/                    # 📂 Expo Router - 파일 기반 라우팅
│   ├── _layout.tsx        # 🎨 루트 레이아웃 (테마, 폰트 로딩)
│   ├── (tabs)/            # 📱 탭 네비게이션 그룹
│   │   ├── _layout.tsx    # 탭 바 설정
│   │   ├── index.tsx      # 홈 화면 (/)
│   │   ├── schedule.tsx   # 일정 화면 (/schedule)
│   │   └── stats.tsx      # 통계 화면 (/stats)
│   └── modal.tsx          # 모달 화면
├── components/            # ♻️ 재사용 가능한 컴포넌트
├── constants/             # 🎨 상수 (색상, 설정 등)
├── hooks/                 # 🪝 커스텀 훅
├── types/                 # 📝 TypeScript 타입 정의
└── utils/                 # 🛠️ 유틸리티 함수
```

### 1.3 개발 환경 이해

**Metro Bundler:**
- React Native의 번들러 (웹의 Webpack 같은 역할)
- JavaScript 코드를 번들링하고 앱에 전달
- Fast Refresh 제공 (코드 변경 시 즉시 반영)

**개발 서버 실행:**
```bash
npm start        # Expo 개발 서버 시작 (QR 코드 표시)
npm run android  # Android 에뮬레이터/기기에서 실행
npm run ios      # iOS 시뮬레이터/기기에서 실행
npm run web      # 웹 브라우저에서 실행
```

---

## 2. Expo 생태계

### 2.1 Expo vs React Native CLI

| 구분 | Expo | React Native CLI |
|------|------|------------------|
| **설정** | 간단 (Xcode/Android Studio 불필요) | 복잡 (네이티브 설정 필요) |
| **빌드** | Expo 서버에서 빌드 | 로컬에서 빌드 |
| **네이티브 코드** | 제한적 (Expo SDK 사용) | 완전 자유 |
| **업데이트** | OTA 업데이트 가능 | 앱스토어 재배포 필요 |
| **추천 대상** | MVP, 빠른 개발 | 복잡한 네이티브 기능 필요 시 |

### 2.2 Expo SDK 핵심 모듈

```typescript
// 카메라
import { Camera } from 'expo-camera';

// 위치
import * as Location from 'expo-location';

// 파일 시스템
import * as FileSystem from 'expo-file-system';

// 알림
import * as Notifications from 'expo-notifications';

// 폰트
import { useFonts } from 'expo-font';

// 라우팅
import { useRouter } from 'expo-router';
```

### 2.3 Expo Router (v6.0+)

**파일 기반 라우팅** - Next.js와 유사한 방식

```
app/
├── _layout.tsx           → 루트 레이아웃
├── index.tsx             → / (홈)
├── about.tsx             → /about
├── users/
│   ├── _layout.tsx       → /users 레이아웃
│   ├── index.tsx         → /users
│   └── [id].tsx          → /users/:id (동적 라우팅)
├── (tabs)/               → 그룹 라우팅 (URL에 표시 안됨)
│   ├── _layout.tsx
│   ├── home.tsx          → /home (탭)
│   └── profile.tsx       → /profile (탭)
└── modal.tsx             → /modal (모달)
```

**라우팅 설정 예시:**

```typescript
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
```

---

## 3. 컴포넌트 & JSX

### 3.1 기본 컴포넌트

**View - 레이아웃 컨테이너 (웹의 `<div>`)**

```typescript
import { View } from 'react-native';

// ❌ 잘못된 예
<div className="container">
  <p>텍스트</p>
</div>

// ✅ 올바른 예
<View className="flex-1 bg-neutral-950 p-6">
  <Text>텍스트</Text>
</View>
```

**Text - 텍스트 표시 (웹의 `<span>`, `<p>`)**

```typescript
import { Text } from 'react-native';

// ❌ 잘못된 예 - Text 없이 문자열 불가
<View>
  Hello World
</View>

// ✅ 올바른 예
<View>
  <Text className="text-white text-lg font-bold">
    Hello World
  </Text>
</View>
```

**ScrollView - 스크롤 가능한 컨테이너**

```typescript
import { ScrollView } from 'react-native';

// ✅ Best Practice
<ScrollView
  className="flex-1"
  contentContainerStyle={{ paddingBottom: 100 }} // 하단 여백 (탭바 고려)
  showsVerticalScrollIndicator={false}
>
  {/* 긴 콘텐츠 */}
</ScrollView>
```

**Pressable - 터치 가능한 요소 (웹의 `<button>`)**

```typescript
import { Pressable, Text } from 'react-native';

// ✅ Best Practice - Pressable 권장 (TouchableOpacity 대신)
<Pressable
  className="bg-violet-500 px-6 py-3 rounded-xl"
  onPress={() => console.log('클릭!')}
  // 시각적 피드백
  style={({ pressed }) => [
    { opacity: pressed ? 0.7 : 1 }
  ]}
>
  <Text className="text-white font-semibold">버튼</Text>
</Pressable>
```

### 3.2 리스트 렌더링

**FlatList - 성능 최적화된 리스트**

```typescript
import { FlatList } from 'react-native';

interface Item {
  id: string;
  title: string;
}

// ✅ Best Practice
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View className="p-4 border-b border-neutral-800">
      <Text className="text-white">{item.title}</Text>
    </View>
  )}
  // 성능 최적화
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
  // 빈 상태 처리
  ListEmptyComponent={<Text>데이터가 없습니다</Text>}
  // 하단 여백
  contentContainerStyle={{ paddingBottom: 20 }}
/>
```

**SectionList - 섹션이 있는 리스트**

```typescript
import { SectionList } from 'react-native';

const DATA = [
  { title: '오늘', data: ['일정1', '일정2'] },
  { title: '내일', data: ['일정3', '일정4'] },
];

<SectionList
  sections={DATA}
  keyExtractor={(item, index) => item + index}
  renderItem={({ item }) => <Text>{item}</Text>}
  renderSectionHeader={({ section: { title } }) => (
    <Text className="font-bold text-lg">{title}</Text>
  )}
/>
```

### 3.3 입력 컴포넌트

**TextInput - 텍스트 입력**

```typescript
import { TextInput } from 'react-native';

const [text, setText] = useState('');

// ✅ Best Practice
<TextInput
  className="bg-neutral-900 text-white px-4 py-3 rounded-lg"
  value={text}
  onChangeText={setText}
  placeholder="입력하세요"
  placeholderTextColor="#6a7282"
  // 키보드 설정
  keyboardType="default" // 'email-address', 'numeric', 'phone-pad' 등
  autoCapitalize="none"
  autoCorrect={false}
  // 보안 입력 (비밀번호)
  secureTextEntry={false}
/>
```

### 3.4 모달

```typescript
import { Modal, View, Text, Pressable } from 'react-native';

const [modalVisible, setModalVisible] = useState(false);

// ✅ Best Practice
<Modal
  visible={modalVisible}
  transparent={true}
  animationType="slide" // 'none', 'slide', 'fade'
  onRequestClose={() => setModalVisible(false)} // Android 뒤로가기
>
  <View className="flex-1 justify-center items-center bg-black/50">
    <View className="bg-neutral-900 p-6 rounded-2xl w-4/5">
      <Text className="text-white text-xl font-bold mb-4">모달 제목</Text>
      <Pressable onPress={() => setModalVisible(false)}>
        <Text className="text-violet-500">닫기</Text>
      </Pressable>
    </View>
  </View>
</Modal>
```

### 3.5 이미지

```typescript
import { Image } from 'react-native';

// 로컬 이미지
<Image
  source={require('./assets/logo.png')}
  className="w-20 h-20"
/>

// 원격 이미지
<Image
  source={{ uri: 'https://example.com/image.png' }}
  className="w-full h-48"
  resizeMode="cover" // 'contain', 'stretch', 'center'
/>
```

---

## 4. Props & State

### 4.1 Props - 컴포넌트 간 데이터 전달

**기본 개념:**
```typescript
// 부모 → 자식으로 데이터 전달 (읽기 전용)

// 자식 컴포넌트
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

function CustomButton({ title, onPress, variant = 'primary' }: ButtonProps) {
  const bgColor = variant === 'primary' ? 'bg-violet-500' : 'bg-neutral-800';

  return (
    <Pressable className={`px-6 py-3 rounded-xl ${bgColor}`} onPress={onPress}>
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
}

// 부모 컴포넌트
<CustomButton
  title="저장"
  onPress={() => console.log('저장!')}
  variant="primary"
/>
```

**Props 전개 연산자 활용:**
```typescript
// ✅ Best Practice - Props 타입 상속
import { PressableProps } from 'react-native';

interface CustomButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

function CustomButton({ title, variant = 'primary', ...rest }: CustomButtonProps) {
  return (
    <Pressable {...rest} className={`px-6 py-3 rounded-xl ${bgColor}`}>
      <Text>{title}</Text>
    </Pressable>
  );
}

// 모든 Pressable props 사용 가능
<CustomButton
  title="저장"
  onPress={() => {}}
  onLongPress={() => {}}
  disabled={false}
/>
```

### 4.2 State - 컴포넌트 내부 상태

**useState - 기본 상태 관리**

```typescript
import { useState } from 'react';

function Counter() {
  // [현재값, 변경함수] = useState(초기값)
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>{count}</Text>
      <Pressable onPress={() => setCount(count + 1)}>
        <Text>증가</Text>
      </Pressable>
      {/* ✅ 함수형 업데이트 - 최신 값 보장 */}
      <Pressable onPress={() => setCount(prev => prev + 1)}>
        <Text>증가 (안전)</Text>
      </Pressable>
    </View>
  );
}
```

**복잡한 상태 관리:**

```typescript
// ❌ 잘못된 예 - 객체 직접 수정
const [user, setUser] = useState({ name: '홍길동', age: 30 });
user.age = 31; // 리렌더링 안됨!
setUser(user); // 참조가 같아서 리렌더링 안됨!

// ✅ 올바른 예 - 새로운 객체 생성
setUser({ ...user, age: 31 });

// ✅ Best Practice - 깊은 복사
setUser(prev => ({ ...prev, age: 31 }));
```

**배열 상태 관리:**

```typescript
const [items, setItems] = useState<string[]>([]);

// 추가
setItems([...items, '새 항목']);
setItems(prev => [...prev, '새 항목']); // ✅ 권장

// 삭제
setItems(items.filter((_, index) => index !== 0));

// 수정
setItems(items.map((item, index) =>
  index === 0 ? '수정된 항목' : item
));
```

---

## 5. Navigation & Routing (Expo Router)

### 5.1 기본 네비게이션

**useRouter - 프로그래밍 방식 네비게이션**

```typescript
import { useRouter } from 'expo-router';

function HomeScreen() {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/details')}>
      <Text>상세로 이동</Text>
    </Pressable>
  );
}
```

**네비게이션 메서드:**

```typescript
const router = useRouter();

// 화면 이동
router.push('/profile');           // 스택에 추가
router.replace('/login');          // 현재 화면 대체 (뒤로가기 불가)
router.back();                     // 뒤로가기
router.dismiss();                  // 모달 닫기
router.dismissAll();               // 모든 모달 닫기

// 파라미터와 함께 이동
router.push({
  pathname: '/user/[id]',
  params: { id: '123', name: '홍길동' }
});
```

**Link - 선언적 네비게이션**

```typescript
import { Link } from 'expo-router';

<Link href="/about" asChild>
  <Pressable className="px-4 py-2 bg-violet-500 rounded">
    <Text className="text-white">About 페이지로</Text>
  </Pressable>
</Link>

// 파라미터 전달
<Link
  href={{
    pathname: '/user/[id]',
    params: { id: '123' }
  }}
>
  <Text>사용자 프로필</Text>
</Link>
```

### 5.2 동적 라우팅

**파일명 규칙:**

```
app/
├── user/
│   └── [id].tsx          → /user/123, /user/456
├── post/
│   └── [slug].tsx        → /post/hello-world
└── [...rest].tsx         → /any/nested/path (Catch-all)
```

**파라미터 접근:**

```typescript
// app/user/[id].tsx
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';

export default function UserProfile() {
  // 현재 라우트의 파라미터
  const { id } = useLocalSearchParams<{ id: string }>();

  // 전체 라우트의 파라미터 (쿼리스트링 포함)
  const params = useGlobalSearchParams();

  return (
    <View>
      <Text>User ID: {id}</Text>
    </View>
  );
}
```

### 5.3 레이아웃 구성

**Stack Layout - 화면 스택**

```typescript
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0a0a' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '홈',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          headerTitle: '모달 화면'
        }}
      />
    </Stack>
  );
}
```

**Tabs Layout - 탭 네비게이션**

```typescript
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#a78bfa',
        tabBarInactiveTintColor: '#6a7282',
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopColor: '#1e2939',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: '일정',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

### 5.4 고급 네비게이션 패턴

**모달 스택:**

```typescript
// app/_layout.tsx
<Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

  {/* 모달들 */}
  <Stack.Screen
    name="add-schedule"
    options={{
      presentation: 'modal',
      title: '일정 추가'
    }}
  />
  <Stack.Screen
    name="reflection"
    options={{
      presentation: 'fullScreenModal',
      title: '회고 작성'
    }}
  />
</Stack>
```

**Deep Linking 설정:**

```typescript
// app.json
{
  "expo": {
    "scheme": "momentum",
    "web": {
      "bundler": "metro"
    }
  }
}

// 앱 외부에서 열기
// momentum://user/123
// momentum://schedule?date=2025-12-17
```

**Navigation Guards (접근 제어):**

```typescript
// app/_layout.tsx
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // 로그인 안된 사용자 → 로그인 페이지
      router.replace('/login');
    } else if (user && inAuthGroup) {
      // 로그인된 사용자 → 홈
      router.replace('/(tabs)');
    }
  }, [user, segments]);

  return <Stack />;
}
```

---

## 6. Styling & UI

### 6.1 NativeWind (Tailwind CSS for React Native)

**기본 사용법:**

```typescript
import { View, Text } from 'react-native';

// ✅ Tailwind 유틸리티 클래스 사용
<View className="flex-1 bg-neutral-950 p-6">
  <Text className="text-white text-2xl font-bold mb-4">
    제목
  </Text>
  <View className="bg-violet-500 px-6 py-3 rounded-xl">
    <Text className="text-white text-center">버튼</Text>
  </View>
</View>
```

**조건부 스타일:**

```typescript
// ✅ Best Practice - 템플릿 리터럴
const isActive = true;
const variant = 'primary';

<View className={`p-4 rounded-lg ${isActive ? 'bg-violet-500' : 'bg-neutral-800'}`}>
  <Text className={`
    text-base font-semibold
    ${variant === 'primary' ? 'text-white' : 'text-gray-400'}
  `}>
    내용
  </Text>
</View>

// ✅ Best Practice - clsx/classnames 라이브러리
import clsx from 'clsx';

<View className={clsx(
  'p-4 rounded-lg',
  isActive ? 'bg-violet-500' : 'bg-neutral-800',
  disabled && 'opacity-50'
)}>
  <Text>내용</Text>
</View>
```

**동적 색상 (인라인 스타일):**

```typescript
// NativeWind는 동적 색상값 지원 안함
// ❌ 작동 안함
<View className={`bg-[${dynamicColor}]`}>

// ✅ 인라인 스타일 사용
<View
  className="px-4 py-2 rounded-lg"
  style={{ backgroundColor: category.color }}
>
  <Text style={{ color: category.color }}>카테고리</Text>
</View>
```

**반응형 디자인:**

```typescript
import { Dimensions, useWindowDimensions } from 'react-native';

// 화면 크기 가져오기
const { width, height } = useWindowDimensions();

// 조건부 렌더링
<View className={width > 768 ? 'flex-row' : 'flex-col'}>
  <View className="flex-1 p-4">왼쪽</View>
  <View className="flex-1 p-4">오른쪽</View>
</View>

// 계산된 크기
<View style={{ width: width * 0.9, height: height * 0.5 }}>
  <Text>화면의 90% 너비, 50% 높이</Text>
</View>
```

### 6.2 레이아웃 - Flexbox

**Flexbox 기본:**

```typescript
// React Native는 기본적으로 Flexbox 사용
// 기본값: flexDirection: 'column' (웹은 'row')

// ✅ 수평 정렬
<View className="flex-row justify-between items-center">
  <Text>왼쪽</Text>
  <Text>오른쪽</Text>
</View>

// ✅ 수직 정렬
<View className="flex-1 justify-center items-center">
  <Text>중앙 정렬</Text>
</View>

// ✅ 공간 분배
<View className="flex-1 flex-row">
  <View className="flex-1 bg-red-500">1</View>
  <View className="flex-2 bg-blue-500">2 (2배 크기)</View>
  <View className="flex-1 bg-green-500">3</View>
</View>
```

**실전 레이아웃 패턴:**

```typescript
// 카드 레이아웃
<View className="bg-[#1a1a1a] rounded-2xl p-4 mb-4">
  <View className="flex-row justify-between items-start mb-3">
    {/* 헤더 */}
    <Text className="text-white text-lg font-bold flex-1">제목</Text>
    <View className="bg-violet-500/30 px-3 py-1 rounded-full">
      <Text className="text-violet-400 text-xs">상태</Text>
    </View>
  </View>

  {/* 내용 */}
  <Text className="text-gray-400 mb-4">설명 텍스트</Text>

  {/* 푸터 */}
  <View className="flex-row justify-between items-center">
    <Text className="text-gray-500 text-sm">2시간 전</Text>
    <Pressable>
      <Text className="text-violet-500">더보기</Text>
    </Pressable>
  </View>
</View>

// 리스트 아이템
<Pressable className="flex-row items-center p-4 border-b border-neutral-800">
  <View className="w-12 h-12 rounded-full bg-violet-500 justify-center items-center mr-4">
    <Text className="text-white font-bold">A</Text>
  </View>
  <View className="flex-1">
    <Text className="text-white font-semibold mb-1">홍길동</Text>
    <Text className="text-gray-400 text-sm">안녕하세요</Text>
  </View>
  <Text className="text-gray-500 text-xs">10:30</Text>
</Pressable>
```

### 6.3 Shadow & Border

```typescript
// ✅ Cross-platform 그림자 (iOS + Android)
<View
  className="bg-white rounded-xl p-4"
  style={{
    // iOS 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android 그림자
    elevation: 5,
  }}
>
  <Text>그림자 있는 카드</Text>
</View>

// ✅ Tailwind shadow 클래스 (NativeWind v4)
<View className="bg-white rounded-xl p-4 shadow-lg">
  <Text>Tailwind 그림자</Text>
</View>

// 테두리
<View className="border-2 border-violet-500 rounded-lg p-4">
  <Text>테두리</Text>
</View>

// 특정 방향 테두리
<View
  className="p-4"
  style={{
    borderBottomWidth: 1,
    borderBottomColor: '#1e2939'
  }}
>
  <Text>하단 테두리만</Text>
</View>
```

### 6.4 SafeAreaView - 안전 영역

```typescript
import { SafeAreaView } from 'react-native-safe-area-context';

// ✅ Best Practice - 노치/상태바 영역 피하기
export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <View className="p-6">
        <Text className="text-white">안전 영역 내부</Text>
      </View>
    </SafeAreaView>
  );
}

// 특정 edge만 적용
<SafeAreaView edges={['top', 'left', 'right']}>
  {/* bottom은 제외 (탭바가 처리) */}
</SafeAreaView>
```

### 6.5 키보드 처리

```typescript
import { KeyboardAvoidingView, Platform } from 'react-native';

// ✅ Best Practice
<KeyboardAvoidingView
  className="flex-1"
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={100} // 헤더 높이 고려
>
  <ScrollView>
    <TextInput placeholder="입력하세요" />
  </ScrollView>
</KeyboardAvoidingView>

// 키보드 dismiss on tap
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View className="flex-1">
    <TextInput />
  </View>
</TouchableWithoutFeedback>
```

---

## 7. State Management

### 7.1 Local State (useState)

**단일 컴포넌트 상태:**

```typescript
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  return (
    <View>
      <TextInput value={input} onChangeText={setInput} />
      <Pressable onPress={addTodo}>
        <Text>추가</Text>
      </Pressable>
      {todos.map(todo => (
        <Text key={todo.id}>{todo.text}</Text>
      ))}
    </View>
  );
}
```

### 7.2 Context API - 전역 상태

**테마 Context 예시:**

```typescript
// contexts/ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

**사용법:**

```typescript
// app/_layout.tsx
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack />
    </ThemeProvider>
  );
}

// 컴포넌트에서 사용
import { useTheme } from '@/contexts/ThemeContext';

function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View className={theme === 'dark' ? 'bg-neutral-950' : 'bg-white'}>
      <Pressable onPress={toggleTheme}>
        <Text>테마 전환</Text>
      </Pressable>
    </View>
  );
}
```

### 7.3 useReducer - 복잡한 상태 로직

```typescript
// ✅ Best Practice - 복잡한 상태는 useReducer
import { useReducer } from 'react';

interface State {
  schedules: Schedule[];
  filter: 'all' | 'completed' | 'pending';
  selectedDate: Date;
}

type Action =
  | { type: 'ADD_SCHEDULE'; payload: Schedule }
  | { type: 'DELETE_SCHEDULE'; payload: string }
  | { type: 'SET_FILTER'; payload: State['filter'] }
  | { type: 'SET_DATE'; payload: Date };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_SCHEDULE':
      return { ...state, schedules: [...state.schedules, action.payload] };
    case 'DELETE_SCHEDULE':
      return {
        ...state,
        schedules: state.schedules.filter(s => s.id !== action.payload),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
}

function ScheduleScreen() {
  const [state, dispatch] = useReducer(reducer, {
    schedules: [],
    filter: 'all',
    selectedDate: new Date(),
  });

  const addSchedule = (schedule: Schedule) => {
    dispatch({ type: 'ADD_SCHEDULE', payload: schedule });
  };

  const deleteSchedule = (id: string) => {
    dispatch({ type: 'DELETE_SCHEDULE', payload: id });
  };

  return (
    <View>
      <Text>일정 {state.schedules.length}개</Text>
      {/* ... */}
    </View>
  );
}
```

### 7.4 Zustand - 권장 상태 관리 라이브러리

```bash
npm install zustand
```

```typescript
// stores/useScheduleStore.ts
import { create } from 'zustand';

interface ScheduleStore {
  schedules: Schedule[];
  addSchedule: (schedule: Schedule) => void;
  deleteSchedule: (id: string) => void;
  updateSchedule: (id: string, updates: Partial<Schedule>) => void;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  schedules: [],

  addSchedule: (schedule) =>
    set((state) => ({ schedules: [...state.schedules, schedule] })),

  deleteSchedule: (id) =>
    set((state) => ({
      schedules: state.schedules.filter((s) => s.id !== id),
    })),

  updateSchedule: (id, updates) =>
    set((state) => ({
      schedules: state.schedules.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),
}));
```

**사용법:**

```typescript
// 컴포넌트에서 사용
import { useScheduleStore } from '@/stores/useScheduleStore';

function ScheduleList() {
  // 필요한 상태만 구독 (성능 최적화)
  const schedules = useScheduleStore((state) => state.schedules);
  const addSchedule = useScheduleStore((state) => state.addSchedule);
  const deleteSchedule = useScheduleStore((state) => state.deleteSchedule);

  return (
    <View>
      {schedules.map((schedule) => (
        <View key={schedule.id}>
          <Text>{schedule.title}</Text>
          <Pressable onPress={() => deleteSchedule(schedule.id)}>
            <Text>삭제</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}
```

**Zustand 고급 패턴:**

```typescript
// 미들웨어 사용 (persist, devtools)
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useScheduleStore = create(
  persist<ScheduleStore>(
    (set) => ({
      schedules: [],
      addSchedule: (schedule) =>
        set((state) => ({ schedules: [...state.schedules, schedule] })),
      // ...
    }),
    {
      name: 'schedule-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## 8. Hooks 완전 정복

### 8.1 useEffect - 부수 효과 처리

**기본 사용법:**

```typescript
import { useEffect } from 'react';

// ✅ 마운트 시 한 번만 실행
useEffect(() => {
  console.log('컴포넌트 마운트');

  // 클린업 함수
  return () => {
    console.log('컴포넌트 언마운트');
  };
}, []); // 빈 배열 = 마운트/언마운트 시에만

// ✅ 특정 값 변경 시 실행
useEffect(() => {
  console.log('count 변경:', count);
}, [count]); // count가 변경될 때마다

// ✅ 매 렌더링마다 실행 (비권장)
useEffect(() => {
  console.log('매번 실행');
}); // 의존성 배열 없음
```

**실전 예제 - 타이머:**

```typescript
function DeepWorkToggle() {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    // 1초마다 실행
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // ✅ 클린업 - 언마운트 또는 isActive 변경 시 인터벌 정리
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <View>
      <Text>{seconds}초</Text>
      <Pressable onPress={() => setIsActive(!isActive)}>
        <Text>{isActive ? '정지' : '시작'}</Text>
      </Pressable>
    </View>
  );
}
```

**실전 예제 - 데이터 페칭:**

```typescript
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false; // ✅ cleanup을 위한 플래그

    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        if (!ignore) {
          setUser(data);
        }
      } catch (err) {
        if (!ignore) {
          setError('사용자 정보를 불러올 수 없습니다');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      ignore = true; // ✅ 컴포넌트 언마운트 시 상태 업데이트 무시
    };
  }, [userId]);

  if (loading) return <Text>로딩 중...</Text>;
  if (error) return <Text>{error}</Text>;

  return <Text>{user?.name}</Text>;
}
```

### 8.2 useMemo - 값 메모이제이션

```typescript
import { useMemo } from 'react';

function ScheduleList({ schedules }: { schedules: Schedule[] }) {
  // ❌ 매 렌더링마다 필터링 (비효율)
  const completedSchedules = schedules.filter(s => s.status === 'completed');

  // ✅ schedules가 변경될 때만 재계산
  const completedSchedules = useMemo(() => {
    console.log('필터링 실행');
    return schedules.filter(s => s.status === 'completed');
  }, [schedules]);

  return (
    <View>
      <Text>완료된 일정: {completedSchedules.length}</Text>
    </View>
  );
}

// ✅ 실전 예제 - 복잡한 계산
function StatsScreen({ schedules }: { schedules: Schedule[] }) {
  const stats = useMemo(() => {
    const total = schedules.length;
    const completed = schedules.filter(s => s.status === 'completed').length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return { total, completed, completionRate };
  }, [schedules]);

  return (
    <View>
      <Text>총 {stats.total}개</Text>
      <Text>완료율: {stats.completionRate.toFixed(1)}%</Text>
    </View>
  );
}
```

### 8.3 useCallback - 함수 메모이제이션

```typescript
import { useCallback } from 'react';

// ❌ 매 렌더링마다 새 함수 생성 → 자식 컴포넌트 불필요한 리렌더링
function Parent() {
  const [count, setCount] = useState(0);

  const handlePress = () => {
    console.log('클릭');
  };

  return <Child onPress={handlePress} />; // 매번 새 함수
}

// ✅ 함수 재사용
function Parent() {
  const [count, setCount] = useState(0);

  const handlePress = useCallback(() => {
    console.log('클릭');
  }, []); // 의존성 없음 → 한 번만 생성

  return <Child onPress={handlePress} />;
}

// ✅ 실전 예제 - 의존성 있는 콜백
function ScheduleItem({ schedule }: { schedule: Schedule }) {
  const updateSchedule = useScheduleStore(state => state.updateSchedule);

  const handleToggleComplete = useCallback(() => {
    updateSchedule(schedule.id, {
      status: schedule.status === 'completed' ? 'pending' : 'completed'
    });
  }, [schedule.id, schedule.status, updateSchedule]);

  return (
    <Pressable onPress={handleToggleComplete}>
      <Text>{schedule.title}</Text>
    </Pressable>
  );
}
```

### 8.4 useRef - 참조 유지

```typescript
import { useRef } from 'react';

// ✅ DOM 요소 참조
function AutoFocusInput() {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <TextInput ref={inputRef} />;
}

// ✅ 값 유지 (리렌더링 없이)
function Timer() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [seconds, setSeconds] = useState(0);

  const startTimer = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopTimer(); // 클린업
  }, []);

  return (
    <View>
      <Text>{seconds}초</Text>
      <Pressable onPress={startTimer}><Text>시작</Text></Pressable>
      <Pressable onPress={stopTimer}><Text>정지</Text></Pressable>
    </View>
  );
}

// ✅ 이전 값 기억
function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// 사용
const [count, setCount] = useState(0);
const prevCount = usePrevious(count);
// count: 5, prevCount: 4
```

### 8.5 커스텀 훅 만들기

**useToggle - 불린 상태 토글:**

```typescript
// hooks/useToggle.ts
import { useState, useCallback } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse };
}

// 사용
function Modal() {
  const modal = useToggle(false);

  return (
    <View>
      <Pressable onPress={modal.setTrue}>
        <Text>모달 열기</Text>
      </Pressable>
      <Modal visible={modal.value} onClose={modal.setFalse} />
    </View>
  );
}
```

**useDebounce - 디바운스:**

```typescript
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// 사용 - 검색 입력
function SearchScreen() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      // API 호출
      console.log('검색:', debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <TextInput
      value={query}
      onChangeText={setQuery}
      placeholder="검색어 입력"
    />
  );
}
```

**useAsync - 비동기 처리:**

```typescript
// hooks/useAsync.ts
import { useState, useEffect, useCallback } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });

    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { ...state, refetch: execute };
}

// 사용
function UserList() {
  const { data, loading, error, refetch } = useAsync(
    () => fetch('/api/users').then(r => r.json()),
    []
  );

  if (loading) return <Text>로딩 중...</Text>;
  if (error) return <Text>에러: {error.message}</Text>;

  return (
    <View>
      {data.map((user: User) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
      <Pressable onPress={refetch}>
        <Text>새로고침</Text>
      </Pressable>
    </View>
  );
}
```

---

## 9. Performance & 최적화

### 9.1 리렌더링 최적화

**React.memo - 컴포넌트 메모이제이션:**

```typescript
import { memo } from 'react';

// ❌ Props가 바뀌지 않아도 부모가 리렌더링되면 자식도 리렌더링
function ScheduleItem({ schedule }: { schedule: Schedule }) {
  console.log('렌더링:', schedule.id);
  return <Text>{schedule.title}</Text>;
}

// ✅ Props가 같으면 리렌더링 스킵
const ScheduleItem = memo(function ScheduleItem({
  schedule
}: {
  schedule: Schedule
}) {
  console.log('렌더링:', schedule.id);
  return <Text>{schedule.title}</Text>;
});

// ✅ 커스텀 비교 함수
const ScheduleItem = memo(
  function ScheduleItem({ schedule }) {
    return <Text>{schedule.title}</Text>;
  },
  (prevProps, nextProps) => {
    // true 반환 시 리렌더링 스킵
    return prevProps.schedule.id === nextProps.schedule.id &&
           prevProps.schedule.title === nextProps.schedule.title;
  }
);
```

**FlatList 최적화:**

```typescript
// ✅ Best Practice
<FlatList
  data={schedules}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ScheduleItem schedule={item} />}

  // 성능 최적화 옵션
  removeClippedSubviews={true}           // 화면 밖 뷰 제거
  maxToRenderPerBatch={10}               // 한 번에 렌더링할 아이템 수
  updateCellsBatchingPeriod={50}         // 배치 업데이트 주기
  initialNumToRender={10}                // 초기 렌더링 아이템 수
  windowSize={5}                         // 렌더링 윈도우 크기

  // 아이템 레이아웃 최적화 (고정 높이일 때)
  getItemLayout={(data, index) => ({
    length: 80,                          // 아이템 높이
    offset: 80 * index,
    index,
  })}
/>
```

### 9.2 이미지 최적화

```typescript
import { Image } from 'expo-image';

// ✅ Expo Image 사용 (성능 향상)
<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  transition={200}
  cachePolicy="memory-disk" // 캐싱 전략
/>

// 로컬 이미지 최적화
// ✅ 여러 해상도 준비
import logo from './assets/logo.png';       // @1x
import logo2x from './assets/logo@2x.png';  // @2x
import logo3x from './assets/logo@3x.png';  // @3x
```

### 9.3 번들 사이즈 최적화

```typescript
// ❌ 전체 라이브러리 import
import _ from 'lodash';

// ✅ 필요한 함수만 import
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// ❌ 큰 아이콘 라이브러리 전체
import { Ionicons } from '@expo/vector-icons';

// ✅ 필요한 아이콘만 (더 작은 번들)
import HomeIcon from '@expo/vector-icons/Ionicons/home.svg';
```

### 9.4 메모리 관리

```typescript
// ✅ 클린업 제대로 하기
useEffect(() => {
  const subscription = someObservable.subscribe(data => {
    // 데이터 처리
  });

  return () => {
    subscription.unsubscribe(); // ✅ 클린업
  };
}, []);

// ✅ 타이머 정리
useEffect(() => {
  const timer = setTimeout(() => {
    // 작업
  }, 1000);

  return () => clearTimeout(timer);
}, []);

// ✅ 이벤트 리스너 제거
useEffect(() => {
  const handleAppStateChange = (state: AppStateStatus) => {
    console.log('App state:', state);
  };

  const subscription = AppState.addEventListener('change', handleAppStateChange);

  return () => {
    subscription.remove(); // ✅ 리스너 제거
  };
}, []);
```

---

## 10. 애니메이션

### 10.1 React Native Reanimated

```bash
npm install react-native-reanimated
```

**기본 애니메이션:**

```typescript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

function FadeInBox() {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return (
    <Animated.View style={[{ width: 100, height: 100 }, animatedStyle]}>
      <Text>Fade In</Text>
    </Animated.View>
  );
}
```

**제스처 애니메이션:**

```typescript
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

function DraggableBox() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Text>Drag me!</Text>
      </Animated.View>
    </GestureDetector>
  );
}
```

**실전 예제 - FAB 버튼:**

```typescript
function FABButton() {
  const rotation = useSharedValue(0);
  const [isOpen, setIsOpen] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    rotation.value = withSpring(isOpen ? 0 : 45);
  };

  return (
    <View>
      <Pressable onPress={toggleMenu}>
        <Animated.View style={animatedStyle}>
          <Text style={{ fontSize: 24 }}>+</Text>
        </Animated.View>
      </Pressable>

      {isOpen && (
        <View>
          <Pressable><Text>일정 추가</Text></Pressable>
          <Pressable><Text>회고 작성</Text></Pressable>
        </View>
      )}
    </View>
  );
}
```

---

## 11. 실전 패턴 & 요령

### 11.1 컴포넌트 구조 패턴

**Container/Presenter 패턴:**

```typescript
// ScheduleListContainer.tsx (로직)
export default function ScheduleListContainer() {
  const schedules = useScheduleStore(state => state.schedules);
  const [filter, setFilter] = useState<'all' | 'completed'>('all');

  const filteredSchedules = useMemo(() => {
    return filter === 'all'
      ? schedules
      : schedules.filter(s => s.status === 'completed');
  }, [schedules, filter]);

  return (
    <ScheduleListPresenter
      schedules={filteredSchedules}
      filter={filter}
      onFilterChange={setFilter}
    />
  );
}

// ScheduleListPresenter.tsx (UI)
interface Props {
  schedules: Schedule[];
  filter: 'all' | 'completed';
  onFilterChange: (filter: 'all' | 'completed') => void;
}

export default function ScheduleListPresenter({
  schedules,
  filter,
  onFilterChange
}: Props) {
  return (
    <View>
      <View className="flex-row gap-2 mb-4">
        <Pressable onPress={() => onFilterChange('all')}>
          <Text className={filter === 'all' ? 'font-bold' : ''}>전체</Text>
        </Pressable>
        <Pressable onPress={() => onFilterChange('completed')}>
          <Text className={filter === 'completed' ? 'font-bold' : ''}>완료</Text>
        </Pressable>
      </View>
      <FlatList
        data={schedules}
        renderItem={({ item }) => <ScheduleItem schedule={item} />}
      />
    </View>
  );
}
```

### 11.2 에러 처리 패턴

```typescript
// ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-red-500 text-lg font-bold mb-2">
            오류가 발생했습니다
          </Text>
          <Text className="text-gray-400">
            {this.state.error?.message}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

// 사용
<ErrorBoundary>
  <ScheduleList />
</ErrorBoundary>
```

### 11.3 로딩 상태 패턴

```typescript
// components/LoadingState.tsx
export function LoadingState() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#a78bfa" />
      <Text className="text-gray-400 mt-4">로딩 중...</Text>
    </View>
  );
}

// components/EmptyState.tsx
export function EmptyState({ message, action }: {
  message: string;
  action?: { label: string; onPress: () => void };
}) {
  return (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-gray-400 text-center mb-4">{message}</Text>
      {action && (
        <Pressable
          className="bg-violet-500 px-6 py-3 rounded-xl"
          onPress={action.onPress}
        >
          <Text className="text-white font-semibold">{action.label}</Text>
        </Pressable>
      )}
    </View>
  );
}

// 사용
function ScheduleList() {
  const { data, loading, error } = useSchedules();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (data.length === 0) {
    return (
      <EmptyState
        message="일정이 없습니다"
        action={{ label: '일정 추가', onPress: () => router.push('/add-schedule') }}
      />
    );
  }

  return <FlatList data={data} {...} />;
}
```

### 11.4 폼 관리 패턴

```typescript
// hooks/useForm.ts
import { useState } from 'react';

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (name: keyof T) => (value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // 에러 초기화
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const setFieldError = (name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    setFieldError,
    reset,
  };
}

// 사용
function AddScheduleForm() {
  const { values, errors, handleChange, setFieldError } = useForm({
    title: '',
    description: '',
    startTime: new Date(),
  });

  const handleSubmit = () => {
    // 유효성 검사
    if (!values.title.trim()) {
      setFieldError('title', '제목을 입력하세요');
      return;
    }

    // 저장 로직
    console.log('저장:', values);
  };

  return (
    <View>
      <TextInput
        value={values.title}
        onChangeText={handleChange('title')}
        placeholder="제목"
      />
      {errors.title && <Text className="text-red-500">{errors.title}</Text>}

      <Pressable onPress={handleSubmit}>
        <Text>저장</Text>
      </Pressable>
    </View>
  );
}
```

---

## 12. 디버깅 & 트러블슈팅

### 12.1 개발 도구

**React DevTools:**
```bash
# Expo 앱 실행 후 터미널에서
# m - 개발자 메뉴 열기
# Cmd/Ctrl + D - iOS/Android 개발자 메뉴
```

**Flipper 사용:**
```bash
npm install --save-dev react-native-flipper
```

**Console Logging:**
```typescript
// ✅ 구조화된 로깅
console.log('User data:', { id: user.id, name: user.name });

// ✅ 조건부 로깅
const DEBUG = __DEV__;
if (DEBUG) {
  console.log('Debug info:', data);
}

// ✅ 성능 측정
console.time('fetchData');
await fetchData();
console.timeEnd('fetchData');
```

### 12.2 흔한 에러 해결

**1. "Invariant Violation: requireNativeComponent"**
```bash
# 네이티브 모듈 재빌드
npm start -- --reset-cache
```

**2. "Metro bundler stuck"**
```bash
# Metro 캐시 초기화
npx expo start -c
```

**3. "Element type is invalid"**
```typescript
// ❌ 잘못된 import
import { Component } from './Component';
// Component가 default export가 아닌 경우

// ✅ 올바른 import
import Component from './Component';  // default export
import { Component } from './Component';  // named export
```

**4. "Can't find variable: __DEV__"**
```typescript
// tsconfig.json 또는 babel.config.js 설정 확인
// __DEV__는 개발 모드에서만 true
```

**5. "TextInput 한글 입력 문제"**
```typescript
// Android에서 한글 조합 중 상태 업데이트 문제
<TextInput
  value={text}
  onChangeText={setText}
  // ✅ Android 한글 입력 최적화
  keyboardType="default"
  textContentType="none"
/>
```

### 12.3 성능 디버깅

```typescript
// Render 횟수 추적
import { useEffect, useRef } from 'react';

function useRenderCount() {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`Render count: ${renderCount.current}`);
  });

  return renderCount.current;
}

// 사용
function MyComponent() {
  const renderCount = useRenderCount();

  return <Text>Rendered {renderCount} times</Text>;
}
```

---

## 13. 추가 학습 자료

### 공식 문서
- [React Native 공식 문서](https://reactnative.dev/)
- [Expo 공식 문서](https://docs.expo.dev/)
- [Expo Router 가이드](https://docs.expo.dev/router/introduction/)
- [NativeWind 문서](https://www.nativewind.dev/)

### 권장 라이브러리
```bash
# 상태 관리
npm install zustand

# 폼 관리
npm install react-hook-form

# 날짜/시간
npm install date-fns

# 네트워킹
npm install axios
npm install @tanstack/react-query

# 아이콘
npm install @expo/vector-icons

# 애니메이션
npm install react-native-reanimated
npm install react-native-gesture-handler
```

---

## 마치며

이 가이드는 React Native와 Expo를 처음 접하는 백엔드 개발자를 위해 작성되었습니다.

**학습 로드맵:**
1. ✅ 기본 컴포넌트와 JSX 익히기 (1-3일)
2. ✅ Navigation & Routing 마스터 (2-3일)
3. ✅ Styling & UI 패턴 학습 (3-5일)
4. ✅ State Management 적용 (3-5일)
5. ✅ Performance 최적화 (진행 중)

**다음 단계:**
- 실제 프로젝트에 적용하며 학습
- 공식 문서 정독
- 커뮤니티 Best Practice 탐색

화이팅! 🚀
