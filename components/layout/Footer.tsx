"use client";

import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/constants/social-links";
import { BRAND_COLORS, BRAND_COLORS_RGBA } from "@/constants/brand";

export default function Footer() {
  return (
    <footer
      className="w-full relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 100%)`,
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D7E7FF] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#015EC2] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
                <Image
                  src="/favicon.svg"
                  alt="DinkLife Logo"
                  width={40}
                  height={40}
                  className="object-contain brightness-0 invert"
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                  priority
                />
              </div>
              <span
                className="font-bold text-xl"
                style={{ color: BRAND_COLORS.primary.light }}
              >
                DINKLIFE
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed text-center md:text-left max-w-md"
              style={{ color: BRAND_COLORS.primary.light, opacity: 0.8 }}
            >
              A healing platform built by someone who knows what it&apos;s like to be drowning – and
              who fought their way back.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 hover:rotate-6"
                style={{ color: BRAND_COLORS.primary.light }}
                aria-label={social.ariaLabel}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = BRAND_COLORS.white;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = BRAND_COLORS.primary.light;
                }}
              >
                <social.icon size={24} />
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full my-8"
          style={{ backgroundColor: BRAND_COLORS_RGBA.primaryLight[30] }}
        />

        {/* Copyright */}
        <div className="text-center">
          <p
            className="text-sm"
            style={{ color: BRAND_COLORS.primary.light, opacity: 0.7 }}
          >
            © {new Date().getFullYear()} DINKLife. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

