import {
  TwitterIcon,
  InstagramIcon,
  LinkedInIcon,
  DiscordIcon,
} from "@/components/ui/icons";

export const SOCIAL_LINKS = [
  {
    name: "Twitter",
    href: "https://twitter.com/dinklife",
    icon: TwitterIcon,
    ariaLabel: "Follow us on Twitter",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/dinklife",
    icon: InstagramIcon,
    ariaLabel: "Follow us on Instagram",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/dinklife",
    icon: LinkedInIcon,
    ariaLabel: "Connect with us on LinkedIn",
  },
  {
    name: "Discord",
    href: "https://discord.gg/dinklife",
    icon: DiscordIcon,
    ariaLabel: "Join our Discord community",
  },
] as const;

