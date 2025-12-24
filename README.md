# Expo React Native Starter Kit

A production-ready React Native starter kit powered by Expo, featuring a modern tech stack with database integration, state management, testing, and code quality tools pre-configured.

## Features

- **Expo SDK 54** - Latest Expo framework with React 19
- **Expo Router** - File-based routing for native navigation
- **TypeScript** - Type-safe development
- **NativeWind (Tailwind CSS)** - Utility-first styling for React Native
- **Drizzle ORM** - Type-safe database toolkit with SQLite
- **Zustand** - Lightweight state management
- **React Query** - Powerful data fetching and caching
- **Jest & Testing Library** - Comprehensive testing setup
- **ESLint & Prettier** - Code quality and formatting
- **Husky & lint-staged** - Pre-commit hooks for code quality
- **Drizzle Studio** - Database visualization and management

## Tech Stack

### Core
- [Expo](https://expo.dev/) ~54.0 - React Native development platform
- [React Native](https://reactnative.dev/) 0.81.5 - Mobile framework
- [TypeScript](https://www.typescriptlang.org/) ~5.9 - Type safety

### Navigation & UI
- [Expo Router](https://docs.expo.dev/router/introduction/) ~6.0 - File-based routing
- [NativeWind](https://www.nativewind.dev/) ^4.2 - Tailwind CSS for React Native
- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) - Safe area handling

### Database
- [Drizzle ORM](https://orm.drizzle.team/) ^0.44.7 - Type-safe ORM
- [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) ~16.0 - Local database
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) ^0.31.7 - Database migrations

### State Management
- [Zustand](https://zustand-demo.pmnd.rs/) ^5.0 - State management
- [React Query](https://tanstack.com/query/latest) ^5.90 - Server state management

### Testing
- [Jest](https://jestjs.io/) ~29.7 - Testing framework
- [Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/) ^13.1 - React Native testing utilities

### Code Quality
- [ESLint](https://eslint.org/) - Linting with Expo config
- [Prettier](https://prettier.io/) ^3.7 - Code formatting
- [Husky](https://typicode.github.io/husky/) ^9.1 - Git hooks
- [lint-staged](https://github.com/lint-staged/lint-staged) ^16.2 - Run linters on staged files

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- For iOS: macOS with Xcode
- For Android: Android Studio with SDK

## Getting Started

### 1. Clone or Use This Template

```bash
# Clone the repository
git clone <your-repo-url>
cd expo-app

# Or use as GitHub template
# Click "Use this template" button on GitHub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Your Project

Update the following files with your project details:

**[app.json](app.json)**
```json
{
  "expo": {
    "name": "your-app-name",
    "slug": "your-app-slug",
    "scheme": "your-app-scheme",
    "android": {
      "package": "com.yourcompany.yourapp"
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    }
  }
}
```

**[package.json](package.json)**
```json
{
  "name": "your-app-name",
  "version": "1.0.0"
}
```

### 4. Database Setup

Generate your first migration after modifying [db/schema.ts](db/schema.ts):

```bash
npm run db:generate
```

The database will automatically migrate when the app starts. You can also view and manage your database with:

```bash
npm run db:studio
```

### 5. Start Development

```bash
# Start Expo dev server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```

## Project Structure

```
expo-app/
├── app/                    # Expo Router pages
│   ├── index.tsx          # Home screen
│   └── _layout.tsx        # Root layout with providers
├── db/                     # Database configuration
│   ├── client.ts          # Drizzle client setup
│   └── schema.ts          # Database schema definitions
├── drizzle/               # Database migrations (auto-generated)
├── store/                 # Zustand stores
│   └── useExampleStore.ts # Example store
├── hooks/                 # Custom React hooks
│   └── useMulti.ts        # Zustand multi-selector hook
├── providers/             # React context providers
│   └── QueryProvider.tsx  # React Query provider
├── utils/                 # Utility functions
├── assets/                # Images, fonts, etc.
└── __tests__/            # Test files
```

## Available Scripts

### Development
- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser

### Database
- `npm run db:generate` - Generate migrations from schema changes
- `npm run db:migrate` - Apply migrations to database
- `npm run db:studio` - Open Drizzle Studio GUI

### Testing
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

### Code Quality
- `npm run lint` - Run ESLint

## Database Management

### Creating Tables

Define your schema in [db/schema.ts](db/schema.ts):

```typescript
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  createdAt: int({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
```

### Running Migrations

```bash
# Generate migration files
npm run db:generate

# The app will automatically apply migrations on startup
# Or manually run: npm run db:migrate
```

### Using the Database

```typescript
import { db } from "@/db/client";
import { users } from "@/db/schema";

// Insert
await db.insert(users).values({ name: "John", email: "john@example.com" });

// Query
const allUsers = await db.select().from(users);

// Update
await db.update(users).set({ name: "Jane" }).where(eq(users.id, 1));
```

## State Management

### Zustand Store

Create stores in the [store/](store/) directory:

```typescript
import { create } from "zustand";
import { useMulti } from "@/hooks/useMulti";

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Efficient multi-key selector
export const useAppStoreSelector = <K extends keyof AppState>(
  ...keys: K[]
): Pick<AppState, K> => {
  return useMulti(useAppStore, ...keys);
};
```

### React Query

```typescript
import { useQuery } from "@tanstack/react-query";

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await db.select().from(usersTable);
      return users;
    },
  });
}
```

## Styling with NativeWind

Use Tailwind CSS classes directly in your components:

```typescript
import { View, Text } from "react-native";

export default function MyComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-gray-900">
        Hello World
      </Text>
    </View>
  );
}
```

Configure Tailwind in [tailwind.config.js](tailwind.config.js).

## Testing

### Writing Tests

Create test files alongside your components:

```typescript
import { render, screen } from "@testing-library/react-native";
import HomeScreen from "@/app/index";

describe("HomeScreen", () => {
  it("renders welcome message", () => {
    render(<HomeScreen />);
    expect(screen.getByText(/Welcome/i)).toBeTruthy();
  });
});
```

### Running Tests

```bash
# Run once
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

## Code Quality

### Pre-commit Hooks

Husky runs lint-staged before each commit to ensure code quality:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["npx expo lint --fix"]
  }
}
```

### ESLint Configuration

Configured in [eslint.config.js](eslint.config.js) with:
- Expo recommended rules
- Prettier integration
- Testing Library rules for test files

## Deployment

### Building for Production

```bash
# Build for Android
npx expo run:android --variant release

# Build for iOS
npx expo run:ios --configuration Release

# Using EAS Build (recommended)
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

### Environment Variables

Create a `.env` file for environment-specific configuration (not tracked in git):

```bash
API_URL=https://api.example.com
```

Access in your app:

```typescript
import Constants from "expo-constants";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

## Customization

### Remove Unused Features

If you don't need certain features:

1. **Remove React Query**: Uninstall `@tanstack/react-query` and delete [providers/QueryProvider.tsx](providers/QueryProvider.tsx)
2. **Remove Database**: Uninstall `drizzle-orm`, `expo-sqlite`, and delete [db/](db/) directory
3. **Remove Zustand**: Uninstall `zustand` and delete [store/](store/) directory

### Add New Features

- **Navigation**: Add new screens in [app/](app/) directory (file-based routing)
- **API Integration**: Use [utils/axiosInstance.tsx](utils/axiosInstance.tsx) for HTTP requests
- **Authentication**: Integrate with Expo Auth Session or third-party providers

## Troubleshooting

### Database Issues

If you encounter database migration issues:

```bash
# Clear Expo cache
npx expo start -c

# Reset database (will lose data)
# Delete the app from emulator/device and reinstall
```

### Metro Bundler Issues

```bash
# Clear Metro cache
npx expo start -c

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Regenerate types
npx expo customize tsconfig.json
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - feel free to use this starter kit for your projects.

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Query Documentation](https://tanstack.com/query/latest)

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Join the Expo community on Discord

---

Built with ❤️ using Expo and React Native
