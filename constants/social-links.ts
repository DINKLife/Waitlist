import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "@/components/ui/icons";

export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/dinklife-com",
    icon: LinkedInIcon,
    ariaLabel: "Connect with us on LinkedIn",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1DdXbPqRBh/?mibextid=wwXIfr",
    icon: FacebookIcon,
    ariaLabel: "Follow us on Facebook",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/dinklifeapp",
    icon: InstagramIcon,
    ariaLabel: "Follow us on Instagram",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@dinklife-app",
    icon: YoutubeIcon,
    ariaLabel: "Subscribe to our YouTube channel",
  },
] as const;

