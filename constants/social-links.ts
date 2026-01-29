import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "@/components/ui/icons";

export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/dinklife-inc",
    icon: LinkedInIcon,
    ariaLabel: "Connect with us on LinkedIn",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/dinklifecom",
    icon: FacebookIcon,
    ariaLabel: "Follow us on Facebook",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/dinklifecom/?utm_source=ig_web_button_share_sheet",
    icon: InstagramIcon,
    ariaLabel: "Follow us on Instagram",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@DINKLife-com",
    icon: YoutubeIcon,
    ariaLabel: "Subscribe to our YouTube channel",
  },
] as const;
