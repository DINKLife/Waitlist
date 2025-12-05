# Code Structure

This project follows modern Next.js 15 best practices with a clean, organized structure.

## Directory Structure

```
waitlist/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── waitlist/            
│   │       ├── route.ts          # Main waitlist endpoints (GET, POST)
│   │       ├── leaderboard/      # Leaderboard endpoint
│   │       ├── referrals/        # Referral stats endpoint
│   │       └── validate-referral/ # Referral validation endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── providers.tsx             # Theme providers
│
├── components/                   # React Components
│   ├── features/                 # Feature-specific components
│   │   └── waitlist/
│   │       ├── HeroSection.tsx   # Hero section
│   │       └── WaitlistForm.tsx  # Waitlist form
│   ├── layout/                   # Layout components
│   │   └── Navbar.tsx            # Navigation bar
│   └── ui/                       # Reusable UI components
│       └── icons/
│           └── index.tsx         # Social media icons
│
├── constants/                    # Constants and configs
│   ├── brand.ts                  # Brand colors and design tokens
│   └── social-links.ts           # Social media links
│
├── hooks/                        # Custom React hooks
│   └── useScrollPosition.ts      # Scroll position tracker
│
├── lib/                          # Utilities and helpers
│   ├── api/                      # API utilities
│   │   ├── waitlist-client.ts    # Client-side API functions
│   │   └── response-handlers.ts  # Shared response handlers
│   ├── db.ts                     # Prisma client
│   ├── utils/
│   │   └── referral.ts           # Referral utilities
│   └── validations/
│       └── waitlist.ts           # Zod schemas
│
├── types/                        # TypeScript types
│   ├── index.ts                  # General types
│   └── waitlist.ts               # Waitlist-specific types
│
├── prisma/                       # Database
│   └── schema.prisma             # Database schema
│
├── public/                       # Static assets
│   ├── images/
│   │   ├── backgrounds/
│   │   └── ...
│   ├── favicon.png
│   └── logo.png
│
├── styles/                       # Global styles
│   ├── globals.css               # Global CSS
│   └── colors.css                # Color variables
│
├── config/                       # App configuration
│   ├── fonts.ts                  # Font configuration
│   └── site.ts                   # Site metadata
│
└── docs/                         # Documentation
    ├── BRAND_COLORS.md           # Brand guidelines
    ├── CODE_STRUCTURE.md         # This file
    └── REFERRAL_SYSTEM.md        # Referral system docs
```

## Organization Principles

### 1. Feature-Based Structure

Components are organized by feature rather than type:
- `components/features/waitlist/` - All waitlist-related components
- Easy to locate and modify related code
- Promotes modularity

### 2. Shared UI Components

Reusable components in `components/ui/`:
- Icons
- Buttons
- Form elements
- Layout primitives

### 3. Clear Separation of Concerns

- **Components** - UI and presentation
- **Lib** - Business logic and utilities
- **Hooks** - Reusable React logic
- **Types** - TypeScript definitions
- **Constants** - Configuration and static data

### 4. API Organization

```
app/api/waitlist/
├── route.ts                 # Main endpoints
├── [resource]/
│   └── route.ts            # Nested resources
```

Each API route is self-contained with:
- Request validation
- Business logic
- Response formatting
- Error handling

## File Naming Conventions

- **Components**: PascalCase (e.g., `WaitlistForm.tsx`, `HeroSection.tsx`)
- **Utilities**: camelCase (e.g., `waitlist-client.ts`, `response-handlers.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useScrollPosition.ts`)
- **Types**: camelCase (e.g., `waitlist.ts`)
- **Constants**: camelCase (e.g., `brand.ts`, `social-links.ts`)

## Import Patterns

### Absolute Imports

Always use `@/` prefix for absolute imports:

```typescript
import { WaitlistForm } from "@/components/features/waitlist/WaitlistForm";
import { BRAND_COLORS } from "@/constants/brand";
import { useScrollPosition } from "@/hooks/useScrollPosition";
```

### Barrel Exports

Index files (`index.ts`) for grouping related exports:

```typescript
// components/ui/icons/index.tsx
export { TwitterIcon, InstagramIcon, LinkedInIcon };
```

Usage:
```typescript
import { TwitterIcon, InstagramIcon } from "@/components/ui/icons";
```

## Component Patterns

### Server Components (Default)

```typescript
// components/features/waitlist/HeroSection.tsx
export default function HeroSection() {
  return <section>...</section>;
}
```

### Client Components

```typescript
// components/layout/Navbar.tsx
"use client";

export default function Navbar() {
  const [state, setState] = useState();
  return <nav>...</nav>;
}
```

### Custom Hooks

```typescript
// hooks/useScrollPosition.ts
export function useScrollPosition(options) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => { ... }, []);
  return isScrolled;
}
```

## API Route Patterns

### Request Handler

```typescript
// app/api/[resource]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/lib/api/response-handlers";

export async function POST(request: NextRequest) {
  try {
    // Validate
    // Process
    // Return
    return successResponse(data, "Success message", 201);
  } catch (error) {
    return errorResponse("Error", "Message", 500);
  }
}
```

### Response Helpers

Use shared response handlers from `lib/api/response-handlers.ts`:

```typescript
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  conflictResponse,
} from "@/lib/api/response-handlers";
```

## State Management

### Local State

Use React hooks for component-local state:

```typescript
const [email, setEmail] = useState("");
```

### Custom Hooks

Extract reusable logic into custom hooks:

```typescript
const isScrolled = useScrollPosition({ threshold: 20 });
```

### Server State

Use React Server Components for server-side data fetching.

## Styling Approach

### Inline Styles for Brand Colors

```typescript
<div style={{ backgroundColor: BRAND_COLORS.primary.main }}>
```

### Tailwind for Layout

```typescript
<div className="flex items-center justify-center">
```

### CSS Variables

```css
:root {
  --color-primary: #015EC2;
}
```

## Type Safety

### Explicit Types

```typescript
interface WaitlistInput {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  referralCode?: string;
}
```

### Type Exports

```typescript
export type { WaitlistInput, WaitlistResponse };
```

## Testing Structure (Future)

```
__tests__/
├── components/
├── hooks/
├── lib/
└── api/
```

## Best Practices

1. **Single Responsibility** - Each file/function has one clear purpose
2. **DRY Principle** - Extract reusable code into utilities/hooks
3. **Type Safety** - Use TypeScript types everywhere
4. **Clear Naming** - Descriptive names for files and functions
5. **Documentation** - JSDoc comments for complex functions
6. **Error Handling** - Consistent error handling patterns
7. **Validation** - Zod schemas for all input validation
8. **Constants** - Extract magic numbers and strings

## Adding New Features

1. Create feature directory in `components/features/[feature-name]/`
2. Add types in `types/[feature-name].ts`
3. Add API routes in `app/api/[feature-name]/`
4. Add validations in `lib/validations/[feature-name].ts`
5. Add utilities in `lib/utils/[feature-name].ts`
6. Update documentation

## Migration from Old Structure

Old → New:
- `components/Navbar.tsx` → `components/layout/Navbar.tsx`
- `components/Waitlist.tsx` → `components/features/waitlist/WaitlistForm.tsx`
- `components/sections/HeroSection.tsx` → `components/features/waitlist/HeroSection.tsx`
- `components/icons/SocialIcons.tsx` → `components/ui/icons/index.tsx`

All old files can be safely deleted after migration.

