export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DINKLife - The Ultimate Platform for DINK Members",
  shortName: "DINKLife",
  description:
    "Join DINKLife - the premier platform designed for people living the DINK (Dual Income No Kids) lifestyle. Discover tools, resources, and a community tailored for members of the DINK community. Get early access, exclusive benefits, and founder pricing by joining our waitlist today.",
  keywords: [
    "DINK",
    "DINK members",
    "Dual Income No Kids",
    "DINK lifestyle",
    "DINK community",
    "childfree lifestyle",
    "DINKLife",
    "people without kids",
    "DINK resources",
    "DINK tools",
    "DINK platform",
    "DINK waitlist",
    "DINK benefits",
    "DINK lifestyle platform",
    "DINK community members",
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
    instagram:
      "https://www.instagram.com/dinklifecom/?utm_source=ig_web_button_share_sheet",
    linkedin: "https://www.linkedin.com/company/dinklife-inc",
    facebook: "https://www.facebook.com/dinklifecom",
    discord: "https://discord.gg/dinklife",
    youtube: "https://www.youtube.com/@DINKLife-com",
  },
};
