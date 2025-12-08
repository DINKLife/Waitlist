"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { BRAND_COLORS, BRAND_COLORS_RGBA } from "@/constants/brand";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Submitted email:", email);
    setIsSuccess(true);
    setEmail("");
    
    // Close modal after success message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      classNames={{
        base: "bg-gradient-to-br from-gray-900 to-gray-800",
        closeButton: "hover:bg-white/10 active:bg-white/20 text-white/80 hover:text-white",
      }}
      backdrop="blur"
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1 text-white">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Join the Waitlist
            </h2>
            <p className="text-sm md:text-base font-normal text-gray-300 mt-2">
              Be the first to experience DinkLife and get exclusive early access benefits
            </p>
          </ModalHeader>
          
          <ModalBody className="py-6">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-green-400" 
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
                <p className="text-xl font-semibold text-white">You're on the list!</p>
                <p className="text-sm text-gray-400 mt-2 text-center">
                  Check your email for confirmation and exclusive updates
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    size="lg"
                    classNames={{
                      input: "bg-transparent text-white placeholder:text-gray-500",
                      inputWrapper: [
                        "bg-gray-800/50",
                        "border-2",
                        "border-gray-700",
                        "hover:border-gray-600",
                        "focus-within:!border-blue-500",
                        "backdrop-blur-sm",
                      ].join(" "),
                    }}
                  />
                </div>
                
                <div className="rounded-xl p-4 bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm text-gray-300 font-medium mb-2">
                    🎁 Early Access Bonus
                  </p>
                  <p className="text-sm text-gray-400">
                    Join now and get the <span className="font-semibold text-blue-400">7-Day Nervous System Reset</span> guide absolutely free!
                  </p>
                </div>
              </div>
            )}
          </ModalBody>
          
          {!isSuccess && (
            <ModalFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                color="default"
                variant="flat"
                onPress={onClose}
                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white"
              >
                Maybe Later
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto font-semibold text-white"
                style={{
                  background: isSubmitting 
                    ? BRAND_COLORS_RGBA.primary[30] 
                    : `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.light} 100%)`,
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Joining...
                  </span>
                ) : (
                  "Join the Waitlist"
                )}
              </Button>
            </ModalFooter>
          )}
        </form>
      </ModalContent>
    </Modal>
  );
}

