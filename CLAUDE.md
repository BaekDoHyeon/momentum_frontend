# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Starting the Development Server
```bash
npm start        # Start Expo development server (shows QR code)
npm run android  # Start on Android emulator/device
npm run ios      # Start on iOS simulator/device
npm run web      # Start web version
```

### Package Management
```bash
npm install      # Install all dependencies
```

## Project Architecture

### Technology Stack
- **React Native 0.81.5** with **Expo ~54.0** (New Architecture enabled)
- **Expo Router ~6.0** for file-based routing
- **NativeWind 4.2** for Tailwind CSS styling in React Native
- **TypeScript** with strict mode enabled
- **React Native Reanimated** for animations

### Routing Structure (Expo Router)
This app uses file-based routing with Expo Router. The routing structure is:

- `app/_layout.tsx` - Root layout with theme provider and font loading
- `app/(tabs)/_layout.tsx` - Tab navigation layout with 4 tabs (홈/일정/통계/더보기)
- `app/(tabs)/index.tsx` - Home page (현재 일정, 딥워크 토글, 다음 일정, 회고)
- `app/(tabs)/schedule.tsx` - Schedule page with calendar view
- `app/(tabs)/stats.tsx` - Statistics page with charts and metrics
- `app/(tabs)/more.tsx` - More/settings page
- Modal routes: `app/modal.tsx`, `app/notifications.tsx`, `app/reflection.tsx`, `app/add-schedule.tsx`

Initial route name is set to `(tabs)` in `app/_layout.tsx`.

### Styling Approach
This project uses **NativeWind (Tailwind CSS for React Native)**. Key patterns:

1. **Use className with Tailwind utilities**: `className="bg-neutral-950 flex-1 p-6"`
2. **For dynamic colors, use inline styles**: `style={{ backgroundColor: category.color }}`
3. **For opacity/alpha values on hex colors**: Use rgba notation or Tailwind opacity utilities
4. **Shadow effects**: Use both React Native shadow props and Tailwind classes for cross-platform compatibility
5. **Path alias**: Use `@/` to reference root directory (e.g., `@/components/DeepWorkToggle`)

Tailwind config is in `tailwind.config.js`, global styles in `global.css`.

### Component Patterns

#### Shared Data Structures
Schedule, Category, and Status types are duplicated across pages. When modifying these:
- `CATEGORIES` object appears in: `app/(tabs)/index.tsx`, `app/(tabs)/schedule.tsx`
- `STATUS_CONFIG` appears in: `app/(tabs)/index.tsx`, `app/(tabs)/schedule.tsx`
- `Schedule` interface is defined in multiple files with slight variations

Consider centralizing these in a shared constants file if making significant changes.

#### Reusable Components
- **DeepWorkToggle** (`components/DeepWorkToggle.tsx`) - Manages deep work timer state with useEffect intervals
- **EditScheduleDialog** (`components/EditScheduleDialog.tsx`) - Modal for editing schedules (used on Home and Schedule pages)
- **FABButton** (`components/FABButton.tsx`) - Floating action button with expandable menu (일정 추가, 회고 작성)

#### Time Calculations
Progress tracking for current schedules is handled by `calculateProgress()` helper in `app/(tabs)/index.tsx`:
- Calculates percentage progress between startTime and endTime
- Updates every minute via useEffect intervals
- Returns both progress percentage and remaining time string

### State Management
Currently using **local component state** with useState and useEffect. No global state management library is in use.

When adding state management:
- Schedule data is currently mocked in each page
- Consider Context API or a state management library for shared schedule state
- Deep work timer state is isolated to DeepWorkToggle component

### Key UI Patterns

#### Dark Theme Design
The app uses a consistent dark theme:
- Background: `bg-neutral-950` (#0a0a0a) and `bg-[#1a1a1a]` for cards
- Primary accent: Violet (`#a78bfa`, `#ad46ff`)
- Borders: `border-[#1e2939]` or `border-[rgba(167,139,250,0.2)]` for subtle divisions
- Text colors: White (`#fff`), muted (`#6a7282`), light gray (`#d1d5dc`)

#### Category Color System
Categories have fixed colors used across the app:
- 업무 (work): `#ad46ff` (violet)
- 개인 (personal): `#ff6b6b` (red)
- 건강 (health): `#51cf66` (green)
- 학습 (study): `#ffd43b` (yellow)
- 회의 (meeting): `#339af0` (blue)

When rendering category badges, use semi-transparent backgrounds: `backgroundColor: ${color}30`, `borderColor: ${color}50`

#### Status Indicators
Schedules have status badges (진행전/완료/실패) with color coding matching the category pattern.

### React Native Specific Considerations

1. **Modal Components**: Use React Native's `Modal` component with `transparent` and `animationType="slide"`
2. **ScrollView**: Always include `contentContainerStyle` for proper padding, especially with bottom navigation
3. **Pressable over TouchableOpacity**: Project consistently uses `Pressable` for touchable elements
4. **Custom Icons**: Tab icons are implemented as custom SVG components using `react-native-svg` rather than icon libraries
5. **Expo Router Navigation**: Use `useRouter()` hook and `router.push()` for navigation
6. **Dimensions**: Import from `react-native` when calculating responsive layouts (see EditScheduleDialog)

### Code Review Standards (from .coderabbit.yaml)
When reviewing code, focus on:
- Component responsibility separation (single responsibility principle)
- State management structure (minimize unnecessary re-renders)
- Performance considerations for React Native rendering
- Naming conventions and component reusability
- TypeScript type safety with strict mode
