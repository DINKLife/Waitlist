export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DINKLife - The Ultimate Platform for DINK Couples",
  shortName: "DINKLife",
  description: "Join DINKLife - the premier platform designed exclusively for DINK (Dual Income No Kids) couples. Discover tools, resources, and a community tailored for couples living the DINK lifestyle. Get early access, exclusive benefits, and founder pricing by joining our waitlist today.",
  keywords: [
    "DINK",
    "DINK couples",
    "Dual Income No Kids",
    "DINK lifestyle",
    "DINK community",
    "childfree couples",
    "DINKLife",
    "couples without kids",
    "DINK resources",
    "DINK tools",
    "DINK platform",
    "DINK waitlist",
    "DINK benefits",
    "DINK lifestyle platform",
    "DINK couples community",
    "Timothy Brown",
    "DINKLife platform",
  ],
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://dinklife.com",
  ogImage: "/images/og-image.png",
  twitterHandle: "@dinklife",
  author: "Timothy Brown",
  creator: "DINKLife",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    twitter: "https://twitter.com/dinklife",
    instagram: "https://instagram.com/dinklifeapp",
    linkedin: "https://linkedin.com/company/dinklife-com",
    facebook: "https://www.facebook.com/share/1DdXbPqRBh/?mibextid=wwXIfr",
    discord: "https://discord.gg/dinklife",
    youtube: "https://youtube.com/@dinklife-app",
  },
};
