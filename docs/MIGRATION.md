# Migration Guide

## Code Reorganization Complete ✅

The codebase has been reorganized following modern Next.js 15 best practices.

## New Structure Overview

```
waitlist/
├── app/                          # App Router (Pages & API)
├── components/
│   ├── features/                 # Feature-specific components ⭐ NEW
│   ├── layout/                   # Layout components ⭐ NEW
│   └── ui/                       # Reusable UI components ⭐ NEW
├── constants/                    # Constants & configs ⭐ NEW
├── hooks/                        # Custom React hooks ⭐ NEW
├── lib/
│   ├── api/                      # API utilities ⭐ NEW
│   ├── utils/
│   └── validations/
├── types/                        # TypeScript types (enhanced)
├── config/                       # App configuration
├── styles/                       # Global styles
├── prisma/                       # Database
└── docs/                         # Documentation
```

## Files to Remove (Old Structure)

These old files can now be safely removed as they've been replaced:

```bash
# Old component files (replaced by new organized structure)
components/Navbar.tsx                    → components/layout/Navbar.tsx
components/Waitlist.tsx                  → components/features/waitlist/WaitlistForm.tsx
components/sections/HeroSection.tsx      → components/features/waitlist/HeroSection.tsx
components/icons/SocialIcons.tsx         → components/ui/icons/index.tsx
components/README.md                     → docs/CODE_STRUCTURE.md
```

### Commands to Clean Up

```bash
# Remove old files
rm components/Navbar.tsx
rm components/Waitlist.tsx
rm -rf components/sections
rm -rf components/icons

# Or keep them temporarily for reference during transition
```

## Import Changes Required

### Update any custom imports:

**Old:**
```typescript
import Navbar from "@/components/Navbar";
import { WaitlistForm } from "@/components/Waitlist";
import HeroSection from "@/components/sections/HeroSection";
import { TwitterIcon } from "@/components/icons/SocialIcons";
```

**New:**
```typescript
import Navbar from "@/components/layout/Navbar";
import { WaitlistForm } from "@/components/features/waitlist/WaitlistForm";
import HeroSection from "@/components/features/waitlist/HeroSection";
import { TwitterIcon } from "@/components/ui/icons";
```

## New Features Added

### 1. Constants (`constants/`)

Centralized configuration:
- `brand.ts` - Brand colors and design tokens
- `social-links.ts` - Social media links configuration

**Usage:**
```typescript
import { BRAND_COLORS } from "@/constants/brand";
import { SOCIAL_LINKS } from "@/constants/social-links";
```

### 2. Custom Hooks (`hooks/`)

Reusable React logic:
- `useScrollPosition.ts` - Scroll position tracker

**Usage:**
```typescript
import { useScrollPosition } from "@/hooks/useScrollPosition";

const isScrolled = useScrollPosition({ threshold: 20 });
```

### 3. API Utilities (`lib/api/`)

Client-side API functions:
- `waitlist-client.ts` - Waitlist API client
- `response-handlers.ts` - Shared response handlers

**Usage:**
```typescript
import { submitWaitlist, validateReferralCode } from "@/lib/api/waitlist-client";
import { successResponse, errorResponse } from "@/lib/api/response-handlers";
```

### 4. Enhanced Types (`types/`)

Comprehensive TypeScript definitions:
- `waitlist.ts` - All waitlist-related types

**Usage:**
```typescript
import type { WaitlistInput, WaitlistResponse, ReferralStats } from "@/types/waitlist";
```

## Benefits of New Structure

### ✅ Better Organization
- Clear separation of concerns
- Easy to locate files
- Scalable for future features

### ✅ Type Safety
- Centralized type definitions
- Consistent interfaces
- Better IDE autocomplete

### ✅ Reusability
- Shared constants
- Custom hooks
- API utilities
- Response handlers

### ✅ Maintainability
- Single source of truth
- DRY principle
- Easier to test
- Better documentation

### ✅ Modern Patterns
- Feature-based structure
- Absolute imports (@/)
- Barrel exports
- Server/Client component separation

## Verification

### Check Imports
```bash
# Search for old import paths
grep -r "from \"@/components/Navbar\"" .
grep -r "from \"@/components/Waitlist\"" .
grep -r "from \"@/components/sections" .
```

### Run Linter
```bash
npm run lint
```

### Test Build
```bash
npm run build
```

## File Count Summary

**Before:**
- Mixed component structure
- No constants folder
- No hooks folder
- No API utilities
- Limited types

**After:**
- ✅ 3 feature components
- ✅ 1 layout component
- ✅ 6 UI icons
- ✅ 2 constant files
- ✅ 1 custom hook
- ✅ 2 API utilities
- ✅ Enhanced types
- ✅ Complete documentation

## Next Steps

1. **Remove old files** (optional, can keep for reference)
2. **Update any custom code** that imports old paths
3. **Test the application** thoroughly
4. **Review documentation** in `docs/CODE_STRUCTURE.md`

## Support

For questions about the new structure:
- Read `docs/CODE_STRUCTURE.md` for detailed explanation
- Check `docs/BRAND_COLORS.md` for styling guidelines
- See `docs/REFERRAL_SYSTEM.md` for API documentation

## Rollback (If Needed)

If issues occur, the old files are preserved. Simply revert the imports in:
- `app/layout.tsx`
- `app/page.tsx`

And use the old paths until issues are resolved.

