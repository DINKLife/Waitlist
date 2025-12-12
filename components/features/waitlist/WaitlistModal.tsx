"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { BRAND_COLORS, BRAND_COLORS_RGBA } from "@/constants/brand";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  referralCode?: string;
}

const COUNTRIES = [
  // Priority countries
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "Netherlands",
  "France",
  "Sweden",
  "Norway",
  "Singapore",
  // Other countries
  "Spain",
  "Italy",
  "Belgium",
  "Switzerland",
  "Austria",
  "Denmark",
  "Finland",
  "Ireland",
  "New Zealand",
  "Japan",
  "South Korea",
  "Other",
];

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    referralCode: "",
  });
  const [countrySearchValue, setCountrySearchValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDetectingCountry, setIsDetectingCountry] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    referralCode?: string;
    referralLink?: string;
  } | null>(null);
  const [referralCodeValidation, setReferralCodeValidation] = useState<{
    isValidating: boolean;
    isValid: boolean | null;
    referrerName?: string;
  }>({ isValidating: false, isValid: null });

  // Auto-detect country and check for referral code in URL
  useEffect(() => {
    if (isOpen && !formData.country) {
      detectCountry();
    }
    // Reset search value when modal opens
    if (isOpen && formData.country) {
      setCountrySearchValue(formData.country);
    }
    // Check for referral code in URL query params
    if (isOpen) {
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get("ref");
      if (refCode && !formData.referralCode) {
        setFormData((prev) => ({ ...prev, referralCode: refCode.toUpperCase() }));
        validateReferralCode(refCode);
      }
    }
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        referralCode: "",
      });
      setCountrySearchValue("");
      setError(null);
      setIsSuccess(false);
      setSuccessData(null);
      setReferralCodeValidation({ isValidating: false, isValid: null });
    }
  }, [isOpen]);

  const detectCountry = async () => {
    setIsDetectingCountry(true);
    try {
      // Using ipapi.co for free IP geolocation (1000 requests/day limit)
      const response = await fetch("https://ipapi.co/json/");

      if (!response.ok) {
        throw new Error("Geolocation API failed");
      }

      const data = await response.json();

      if (data.country_name) {
        // Map API country name to our country list
        let detectedCountry = COUNTRIES.find(
          (country) => country.toLowerCase() === data.country_name.toLowerCase()
        );

        // Handle common country name variations
        if (!detectedCountry) {
          const countryMapping: Record<string, string> = {
            "USA": "United States",
            "UK": "United Kingdom",
          };

          const mappedName = countryMapping[data.country_name] || data.country_name;
          detectedCountry = COUNTRIES.find(
            (country) => country.toLowerCase() === mappedName.toLowerCase()
          );
        }

        if (detectedCountry) {
          setFormData((prev) => ({ ...prev, country: detectedCountry }));
          setCountrySearchValue(detectedCountry);
        }
      }
    } catch (error) {
      console.log("Could not detect country:", error);
      // Silently fail - user can still select manually
    } finally {
      setIsDetectingCountry(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Validate referral code when it changes
    if (field === "referralCode" && value.trim().length >= 4) {
      validateReferralCode(value);
    } else if (field === "referralCode" && value.trim().length === 0) {
      setReferralCodeValidation({ isValidating: false, isValid: null });
    }
  };

  const validateReferralCode = async (code: string) => {
    if (!code || code.trim().length < 4) {
      setReferralCodeValidation({ isValidating: false, isValid: null });
      return;
    }

    setReferralCodeValidation({ isValidating: true, isValid: null });

    try {
      const response = await fetch(`/api/waitlist/validate-referral/${code.toUpperCase().trim()}`);
      const data = await response.json();

      if (data.valid) {
        setReferralCodeValidation({
          isValidating: false,
          isValid: true,
          referrerName: data.referrerName,
        });
      } else {
        setReferralCodeValidation({
          isValidating: false,
          isValid: false,
        });
      }
    } catch (error) {
      console.error("Referral code validation error:", error);
      setReferralCodeValidation({ isValidating: false, isValid: null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to join waitlist");
      }

      setIsSuccess(true);
      setSuccessData({
        referralCode: data.data?.referralCode,
        referralLink: data.data?.referralLink,
      });

      // Close modal after success message (longer timeout to show referral code)
      setTimeout(() => {
        setFormData({ firstName: "", lastName: "", email: "", country: "", referralCode: "" });
        setCountrySearchValue("");
        setIsSubmitting(false);
        setIsSuccess(false);
        setSuccessData(null);
        onClose();
      }, 8000);
    } catch (err) {
      console.error("Waitlist submission error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Shared input styles
  const inputClassNames = {
    input: "text-white placeholder:text-white/40",
    inputWrapper: [
      "border-2",
      "bg-[#002860]/80",
      "backdrop-blur-sm",
      "hover:border-[#D7E7FF]",
      "hover:bg-[#015EC2]/30",
      "hover:shadow-lg",
      "hover:shadow-[#015EC2]/20",
      "data-[hover=true]:border-[#D7E7FF]",
      "data-[hover=true]:bg-[#015EC2]/30",
      "data-[hover=true]:shadow-lg",
      "data-[hover=true]:shadow-[#015EC2]/20",
      "group-data-[focus=true]:border-[#D7E7FF]",
      "group-data-[focus=true]:bg-[#015EC2]/30",
      "group-data-[focus=true]:shadow-lg",
      "group-data-[focus=true]:shadow-[#015EC2]/30",
      "transition-all",
      "duration-300",
      "shadow-none",
    ].join(" "),
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      classNames={{
        base: [
          "bg-gradient-to-br",
          "from-[#0a1a2e]",
          "via-[#002860]",
          "to-[#015EC2]",
          "border-2",
          "border-white/20",
          "backdrop-blur-xl",
          "shadow-2xl",
          "shadow-[#015EC2]/20",
        ].join(" "),
        closeButton: [
          "hover:bg-[#D7E7FF]/20",
          "active:bg-[#D7E7FF]/30",
          "text-white/80",
          "hover:text-[#D7E7FF]",
          "transition-all",
          "duration-300",
          "hover:scale-110",
          "z-50",
          "pointer-events-auto",
        ].join(" "),
        backdrop: "bg-black/60 backdrop-blur-md",
      }}
      backdrop="blur"
      scrollBehavior="inside"
      hideCloseButton={false}
      isDismissable={true}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent className="relative">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <ModalHeader
            className="flex flex-col gap-1 text-white pb-6 pt-8 relative overflow-hidden"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#015EC2]/20 via-[#D7E7FF]/10 to-[#015EC2]/20 animate-pulse" />
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D7E7FF] to-[#015EC2] flex items-center justify-center shadow-lg shadow-[#015EC2]/50">
                  <svg
                    className="w-6 h-6 text-[#002860]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-[#D7E7FF] via-white to-[#D7E7FF] bg-clip-text text-transparent drop-shadow-lg">
                Join the Waitlist
              </h2>
              <p
                className="text-sm md:text-base font-normal text-center mt-3 text-white/80"
              >
                Be the first to experience DinkLife and get exclusive early
                access benefits
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D7E7FF]/50 to-transparent" />
          </ModalHeader>

          {/* Body */}
          <ModalBody className="py-6">
            {isSuccess ? (
              <SuccessMessage 
                email={formData.email} 
                referralCode={successData?.referralCode}
                referralLink={successData?.referralLink}
              />
            ) : (
              <div className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div
                    className="p-4 rounded-lg border-2"
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      borderColor: "rgba(239, 68, 68, 0.3)",
                      color: "#FEE2E2",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  </div>
                )}
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    id="firstName"
                    label="First Name *"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(value) => handleInputChange("firstName", value)}
                    classNames={inputClassNames}
                  />
                  <InputField
                    id="lastName"
                    label="Last Name *"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(value) => handleInputChange("lastName", value)}
                    classNames={inputClassNames}
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium"
                    style={{ color: BRAND_COLORS.primary.light }}
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    size="lg"
                    startContent={<EmailIcon />}
                    classNames={inputClassNames}
                    style={{
                      borderColor: BRAND_COLORS_RGBA.primaryLight[30],
                    }}
                  />
                </div>

                {/* Country Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="country"
                    className="text-sm font-medium flex items-center gap-2"
                    style={{ color: BRAND_COLORS.primary.light }}
                  >
                    Country *
                    {isDetectingCountry && (
                      <span className="text-xs text-white/60 flex items-center gap-1">
                        <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Detecting...
                      </span>
                    )}
                    {!isDetectingCountry && formData.country && (
                      <span className="text-xs text-white/60">✓ Auto-detected</span>
                    )}
                  </label>
                  <Autocomplete
                    id="country"
                    placeholder={isDetectingCountry ? "Detecting your location..." : "Search or select your country"}
                    selectedKey={formData.country || null}
                    onSelectionChange={(key) => {
                      if (key) {
                        const selectedCountry = key.toString();
                        handleInputChange("country", selectedCountry);
                        setCountrySearchValue(selectedCountry);
                      } else {
                        handleInputChange("country", "");
                        setCountrySearchValue("");
                      }
                    }}
                    inputValue={countrySearchValue}
                    onInputChange={(value) => {
                      setCountrySearchValue(value);
                      // Clear selection if user is typing something different
                      if (value !== formData.country) {
                        handleInputChange("country", "");
                      }
                    }}
                    defaultItems={COUNTRIES.map((country) => ({
                      key: country,
                      value: country,
                      label: country,
                    }))}
                    allowsCustomValue={false}
                    required
                    size="lg"
                    isDisabled={isDetectingCountry}
                    classNames={{
                      base: "w-full",
                      listbox: "bg-[#0a1a2e] border-2 border-white/20 backdrop-blur-xl",
                      popoverContent: "bg-[#0a1a2e]/95 backdrop-blur-xl border-2 border-white/20 shadow-2xl shadow-[#015EC2]/20",
                      selectorButton: "text-white",
                    }}
                    inputProps={{
                      classNames: {
                        input: "text-white placeholder:text-white/40",
                        inputWrapper: [
                          "border-2",
                          "bg-[#002860]/80",
                          "backdrop-blur-sm",
                          "hover:border-[#D7E7FF]",
                          "hover:bg-[#015EC2]/30",
                          "hover:shadow-lg",
                          "hover:shadow-[#015EC2]/20",
                          "data-[hover=true]:border-[#D7E7FF]",
                          "data-[hover=true]:bg-[#015EC2]/30",
                          "data-[hover=true]:shadow-lg",
                          "data-[hover=true]:shadow-[#015EC2]/20",
                          "group-data-[focus=true]:border-[#D7E7FF]",
                          "group-data-[focus=true]:bg-[#015EC2]/30",
                          "group-data-[focus=true]:shadow-lg",
                          "group-data-[focus=true]:shadow-[#015EC2]/30",
                          "transition-all",
                          "duration-300",
                          "shadow-none",
                        ].join(" "),
                      },
                      style: {
                        borderColor: BRAND_COLORS_RGBA.primaryLight[30],
                      },
                    }}
                    startContent={<GlobeIcon />}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !formData.country) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {(country) => (
                      <AutocompleteItem
                        key={country.key}
                        textValue={country.value}
                        classNames={{
                          base: [
                            "text-white",
                            "hover:bg-gradient-to-r",
                            "hover:from-[#015EC2]",
                            "hover:to-[#015EC240]",
                            "data-[hover=true]:bg-gradient-to-r",
                            "data-[hover=true]:from-[#015EC2]",
                            "data-[hover=true]:to-[#015EC240]",
                            "data-[selected=true]:bg-gradient-to-r",
                            "data-[selected=true]:from-[#015EC2]",
                            "data-[selected=true]:to-[#015EC240]",
                            "data-[selected=true]:text-[#D7E7FF]",
                            "transition-all",
                            "duration-200",
                            "rounded-lg",
                            "mx-2",
                            "my-1",
                          ].join(" "),
                        }}
                      >
                        {country.value}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  {formData.country && !isDetectingCountry && (
                    <p className="text-xs text-white/50 mt-1">
                      Location detected automatically. You can change it if needed.
                    </p>
                  )}
                </div>

                {/* Referral Code Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="referralCode"
                    className="text-sm font-medium"
                    style={{ color: BRAND_COLORS.primary.light }}
                  >
                    Referral Code (Optional)
                  </label>
                  <div className="relative">
                    <Input
                      id="referralCode"
                      type="text"
                      placeholder="Enter a friend's referral code"
                      value={formData.referralCode || ""}
                      onChange={(e) => handleInputChange("referralCode", e.target.value.toUpperCase())}
                      size="lg"
                      startContent={<GiftIcon />}
                      classNames={inputClassNames}
                      style={{
                        borderColor: BRAND_COLORS_RGBA.primaryLight[30],
                      }}
                    />
                    {referralCodeValidation.isValidating && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <LoadingSpinner />
                      </div>
                    )}
                    {referralCodeValidation.isValid === true && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-green-400"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {referralCodeValidation.isValid === false && formData.referralCode && formData.referralCode.length >= 4 && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-red-400"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {referralCodeValidation.isValid === true && referralCodeValidation.referrerName && (
                    <p className="text-xs text-green-400 mt-1">
                      ✓ Valid code from {referralCodeValidation.referrerName}
                    </p>
                  )}
                  {referralCodeValidation.isValid === false && formData.referralCode && formData.referralCode.length >= 4 && (
                    <p className="text-xs text-red-400 mt-1">
                      Invalid referral code. Please check and try again.
                    </p>
                  )}
                  {formData.referralCode && formData.referralCode.length > 0 && formData.referralCode.length < 4 && (
                    <p className="text-xs text-white/50 mt-1">
                      Referral codes are at least 4 characters
                    </p>
                  )}
                </div>

                {/* Bonus Section */}
                <BonusSection />
              </div>
            )}
          </ModalBody>

          {/* Footer */}
          {!isSuccess && (
            <ModalFooter
              className="flex flex-col sm:flex-row gap-3 pt-6 pb-4 relative"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D7E7FF]/50 to-transparent" />
              <Button
                color="default"
                variant="flat"
                onPress={onClose}
                className="w-full sm:w-auto font-semibold border-2 transition-all duration-300 hover:scale-105 hover:border-[#D7E7FF] hover:bg-[#015EC2]/30 hover:shadow-lg hover:shadow-[#015EC2]/20 bg-[#002860]/80 backdrop-blur-sm"
                style={{
                  borderColor: BRAND_COLORS_RGBA.primaryLight[30],
                  color: BRAND_COLORS.primary.light,
                }}
              >
                Maybe Later
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto font-bold border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#D7E7FF]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none relative overflow-hidden group"
                style={{
                  background: isSubmitting
                    ? BRAND_COLORS_RGBA.primaryDark[50]
                    : `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.light} 100%)`,
                  borderColor: BRAND_COLORS.primary.light,
                  color: isSubmitting
                    ? BRAND_COLORS.primary.light
                    : BRAND_COLORS.primary.dark,
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join the Waitlist
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </ModalFooter>
          )}
        </form>
      </ModalContent>
    </Modal>
  );
}

// Sub-components for better organization

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  classNames: {
    input: string;
    inputWrapper: string;
  };
}

function InputField({
  id,
  label,
  placeholder,
  value,
  onChange,
  classNames,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium"
        style={{ color: BRAND_COLORS.primary.light }}
      >
        {label}
      </label>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        size="lg"
        classNames={classNames}
        style={{
          borderColor: BRAND_COLORS_RGBA.primaryLight[30],
        }}
      />
    </div>
  );
}

function SuccessMessage({ 
  email, 
  referralCode, 
  referralLink 
}: { 
  email?: string;
  referralCode?: string;
  referralLink?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-6">
      <div
        className="w-16 h-16 mb-4 rounded-full flex items-center justify-center"
        style={{ backgroundColor: BRAND_COLORS_RGBA.primaryLight[30] }}
      >
        <svg
          className="w-8 h-8"
          style={{ color: BRAND_COLORS.primary.light }}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-xl font-semibold text-white">You're on the list! 🎉</p>
        <p
          className="text-sm mt-2 text-center max-w-md"
          style={{ color: BRAND_COLORS.primary.light }}
        >
          We've sent a welcome email to{" "}
          {email && (
            <span className="font-semibold text-white">{email}</span>
          )}
          {!email && "your email address"}. Check your inbox for exclusive updates and your welcome bonus!
        </p>
      </div>

      {referralCode && (
        <div
          className="w-full max-w-md rounded-xl p-6 border-2 relative overflow-hidden backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, ${BRAND_COLORS_RGBA.primaryLight[20]} 0%, ${BRAND_COLORS_RGBA.primary[30]} 100%)`,
            borderColor: BRAND_COLORS_RGBA.primaryLight[50],
          }}
        >
          <div className="text-center">
            <h3
              className="text-lg font-bold mb-3"
              style={{ color: BRAND_COLORS.primary.light }}
            >
              🎁 Your Referral Code
            </h3>
            <div
              className="bg-[#002860]/80 rounded-lg p-4 mb-4 border-2 border-dashed"
              style={{ borderColor: BRAND_COLORS_RGBA.primaryLight[50] }}
            >
              <p className="text-xs mb-2" style={{ color: BRAND_COLORS.primary.light }}>
                SHARE THIS CODE
              </p>
              <p
                className="text-3xl font-bold tracking-widest font-mono"
                style={{ color: BRAND_COLORS.primary.light }}
              >
                {referralCode}
              </p>
            </div>
            <p className="text-sm mb-4" style={{ color: BRAND_COLORS.primary.light }}>
              Share with friends and earn rewards for every person who joins!
            </p>
            {referralLink && (
              <div className="space-y-2">
                <Button
                  onPress={() => copyToClipboard(referralLink)}
                  className="w-full font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.light} 100%)`,
                    color: BRAND_COLORS.primary.dark,
                  }}
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Referral Link
                    </>
                  )}
                </Button>
                <Button
                  onPress={() => copyToClipboard(referralCode)}
                  variant="flat"
                  className="w-full font-semibold border-2"
                  style={{
                    borderColor: BRAND_COLORS_RGBA.primaryLight[50],
                    color: BRAND_COLORS.primary.light,
                  }}
                >
                  Copy Code Only
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BonusSection() {
  return (
    <div
      className="rounded-xl p-5 border-2 relative overflow-hidden backdrop-blur-sm"
      style={{
        background: `linear-gradient(135deg, ${BRAND_COLORS_RGBA.primaryLight[10]} 0%, ${BRAND_COLORS_RGBA.primary[20]} 100%)`,
        borderColor: BRAND_COLORS_RGBA.primaryLight[30],
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#015EC2]/10 via-[#D7E7FF]/5 to-[#015EC2]/10 animate-pulse" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D7E7FF] to-[#015EC2] flex items-center justify-center">
            <span className="text-lg">🎁</span>
          </div>
          <p
            className="text-sm font-bold"
            style={{ color: BRAND_COLORS.primary.light }}
          >
            Early Access Bonus
          </p>
        </div>
        <p className="text-sm text-white/90 leading-relaxed">
          Join now and get the{" "}
          <span
            className="font-bold bg-gradient-to-r from-[#D7E7FF] to-white bg-clip-text text-transparent"
          >
            7-Day Nervous System Reset
          </span>{" "}
          guide absolutely free!
        </p>
      </div>
    </div>
  );
}

// Icon Components

function EmailIcon() {
  return (
    <svg
      className="w-5 h-5"
      style={{ color: BRAND_COLORS.primary.light }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="w-5 h-5"
      style={{ color: BRAND_COLORS.primary.light }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg
      className="w-5 h-5"
      style={{ color: BRAND_COLORS.primary.light }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
