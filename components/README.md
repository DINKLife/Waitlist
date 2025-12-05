# Components Documentation

## Navbar

A beautiful, modern navigation bar with the following features:

### Features
- ✨ **Glassmorphism Design** - Frosted glass effect with backdrop blur
- 🎨 **Gradient Overlay** - Subtle purple-pink-blue gradient
- 🔄 **Sticky Position** - Always visible when scrolling
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Smooth Animations** - Hover effects and scroll transitions
- 🎯 **Centered Layout** - Logo left, social icons center, CTA right

### Structure

```
┌─────────────────────────────────────────────────┐
│  [Logo]  [Social Icons in Center]  [CTA Button] │
└─────────────────────────────────────────────────┘
```

### Customization

#### Update Social Links

Edit the `socialLinks` array in `components/Navbar.tsx`:

```typescript
const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/your-handle",
    icon: TwitterIcon,
  },
  // Add more links...
];
```

#### Modify Appearance

Key CSS classes for styling:
- Background: `bg-white/10` - Adjust opacity (10%, 20%, etc.)
- Border: `border-white/20` - Control border opacity
- Rounded: `rounded-full` - Fully rounded corners
- Blur: `backdrop-blur-md` - Blur intensity (sm, md, lg)

#### Change Scroll Behavior

Adjust scroll detection threshold:

```typescript
setIsScrolled(window.scrollY > 20); // Change 20 to your preferred value
```

### Social Icons

Icons are located in `components/icons/SocialIcons.tsx`:

Available icons:
- TwitterIcon
- InstagramIcon
- LinkedInIcon
- FacebookIcon
- DiscordIcon
- YoutubeIcon

Add new icons by following the same SVG pattern.

### Mobile Responsiveness

The navbar automatically adjusts:
- Logo size: 8x8 (mobile) → 10x10 (desktop)
- Social icon spacing: 3 units (mobile) → 6 units (desktop)
- Button text: "Join" (mobile) → "Join Waitlist" (desktop)
- Padding: 4px (mobile) → 6px (desktop)

## Sections

### HeroSection

The main landing section with background image, logo, and waitlist form.

Located in: `components/sections/HeroSection.tsx`

## Forms

### Waitlist Form

Collects user information for the waitlist.

Located in: `components/Waitlist.tsx`

