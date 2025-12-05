"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TwitterIcon,
  InstagramIcon,
  LinkedInIcon,
  DiscordIcon,
} from "@/components/icons/SocialIcons";

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/dinklife",
    icon: TwitterIcon,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/dinklife",
    icon: InstagramIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/dinklife",
    icon: LinkedInIcon,
  },
  {
    name: "Discord",
    href: "https://discord.gg/dinklife",
    icon: DiscordIcon,
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${isScrolled ? "top-2" : "top-4"
        }`}
      style={{ width: "calc(100% - 2rem)", maxWidth: "1200px" }}
    >
      <div
        className={`relative backdrop-blur-lg border rounded-full px-4 sm:px-6 py-3 shadow-xl transition-all duration-300 ${isScrolled ? "shadow-2xl" : ""
          }`}
        style={{
          backgroundColor: "rgba(0, 40, 96, 0.85)", // #002860 with 85% opacity
          borderColor: "rgba(215, 231, 255, 0.3)", // #D7E7FF with 30% opacity
        }}
      >
        {/* Background gradient overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background: "linear-gradient(90deg, rgba(1, 94, 194, 0.2) 0%, rgba(215, 231, 255, 0.1) 100%)",
          }}
        />

        <div className="relative flex items-center justify-between gap-2">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-2 group shrink-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110">
              <Image
                src="/favicon.svg"
                alt="DinkLife Logo"
                width={40}
                height={40}
                className="object-contain brightness-0 invert"
                style={{
                  filter: 'brightness(0) invert(1)',
                }}
                priority
              />
            </div>
            <span
              className="font-bold text-base sm:text-lg hidden sm:block"
              style={{ color: "#D7E7FF" }}
            >
              DINKLIFE
            </span>
          </Link>

          {/* Center Content - Social Links */}
          <div className="flex items-center justify-center flex-1 px-2 sm:px-4">
            <div className="flex items-center space-x-3 sm:space-x-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 hover:scale-110"
                  style={{ color: "#D7E7FF" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#D7E7FF";
                  }}
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - CTA */}
          <Link
            href="#join"
            className="px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105 shrink-0 border-2"
            style={{
              backgroundColor: "#015EC2",
              color: "#FFFFFF",
              borderColor: "#D7E7FF",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#D7E7FF";
              e.currentTarget.style.color = "#002860";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#015EC2";
              e.currentTarget.style.color = "#FFFFFF";
            }}
          >
            <span className="hidden sm:inline">Join Waitlist</span>
            <span className="sm:hidden">Join</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

