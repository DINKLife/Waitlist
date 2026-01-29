"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { SOCIAL_LINKS } from "@/constants/social-links";
import { BRAND_COLORS } from "@/constants/brand";
import { useWaitlistModal } from "@/contexts/WaitlistModalContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openWaitlistModal } = useWaitlistModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "top-2" : "top-4"
      }`}
      style={{ width: "calc(100% - 2rem)", maxWidth: "1200px" }}
    >
      <div
        className={`relative backdrop-blur-lg border rounded-full px-4 sm:px-6 py-3 shadow-xl transition-all duration-300 ${
          isScrolled ? "shadow-2xl" : ""
        }`}
        style={{
          backgroundColor: "rgba(10, 26, 43, 0.85)",
          borderColor: "rgba(190, 210, 235, 0.25)",
        }}
      >
        {/* Background gradient overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background:
              "linear-gradient(120deg, rgba(210,230,255,0.28) 0%, rgba(160,185,210,0.14) 45%, rgba(90,120,150,0.22) 100%)",
          }}
        />

        <div className="relative flex items-center justify-between gap-2">
          {/* Logo - Left */}
          <Link className="flex items-center space-x-2 group shrink-0" href="/">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110">
              <Image
                priority
                alt="DinkLife Logo"
                className="object-contain brightness-0 invert"
                height={40}
                src="/favicon.svg"
                style={{
                  filter: "brightness(0) invert(1)",
                }}
                width={40}
              />
            </div>
            <span
              className="font-bold text-base sm:text-lg hidden sm:block"
              style={{ color: BRAND_COLORS.primary.light }}
            >
              DINKLIFE
            </span>
          </Link>

          {/* Center Content - Social Links */}
          <div className="flex items-center justify-center flex-1 px-2 sm:px-4">
            <div className="flex items-center space-x-3 sm:space-x-6">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  aria-label={social.ariaLabel}
                  className="transition-all duration-200 hover:scale-110"
                  href={social.href}
                  rel="noopener noreferrer"
                  style={{ color: BRAND_COLORS.primary.light }}
                  target="_blank"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = BRAND_COLORS.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = BRAND_COLORS.primary.light;
                  }}
                >
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - CTA */}
          <button
            className="px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105 shrink-0 border-2 cursor-pointer"
            style={{
              backgroundColor: BRAND_COLORS.primary.main,
              color: BRAND_COLORS.white,
              borderColor: BRAND_COLORS.primary.light,
            }}
            onClick={openWaitlistModal}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                BRAND_COLORS.primary.light;
              e.currentTarget.style.color = BRAND_COLORS.primary.dark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = BRAND_COLORS.primary.main;
              e.currentTarget.style.color = BRAND_COLORS.white;
            }}
          >
            <span className="hidden sm:inline">Get Early Access</span>
            <span className="sm:hidden">Early Access</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
