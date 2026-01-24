"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { BRAND_COLORS } from "@/constants/brand";

type WaitlistModalContextValue = {
  openWaitlistModal: () => void;
  closeWaitlistModal: () => void;
};

const WaitlistModalContext = createContext<WaitlistModalContextValue | null>(
  null
);

export function useWaitlistModal() {
  const ctx = useContext(WaitlistModalContext);
  if (!ctx) throw new Error("useWaitlistModal must be used within WaitlistModalProvider");
  return ctx;
}

export function WaitlistModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const openWaitlistModal = useCallback(() => {
    setEmail("");
    setName("");
    setError(null);
    setSuccess(false);
    setLoading(false);
    setIsOpen(true);
  }, []);

  const closeWaitlistModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const value: WaitlistModalContextValue = {
    openWaitlistModal,
    closeWaitlistModal,
  };

  return (
    <WaitlistModalContext.Provider value={value}>
      {children}
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) closeWaitlistModal();
        }}
        size="md"
        placement="center"
        classNames={{
          base: "border border-gray-200",
          header: "border-b border-gray-100",
          footer: "border-t border-gray-100",
        }}
      >
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              <h2
                className="text-xl font-bold"
                style={{ color: BRAND_COLORS.primary.dark }}
              >
                Join the Waitlist
              </h2>
              <p className="text-sm font-normal text-gray-600">
                Community, wellness, and travel for DINK couples.
              </p>
            </ModalHeader>
            <ModalBody>
              {success ? (
                <p className="text-center text-gray-700 py-4">
                  You&apos;re on the list. Check your email for a welcome message.
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  {error && (
                    <p className="text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onValueChange={setEmail}
                    isRequired
                    autoComplete="email"
                  />
                  <Input
                    label="Name (optional)"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onValueChange={setName}
                    autoComplete="name"
                  />
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              {success ? (
                <Button
                  type="button"
                  onPress={closeWaitlistModal}
                  style={{
                    background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 100%)`,
                    color: "white",
                  }}
                >
                  Done
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="light"
                    onPress={closeWaitlistModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={loading}
                    isDisabled={loading}
                    style={{
                      background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 100%)`,
                      color: "white",
                    }}
                  >
                    Join Waitlist
                  </Button>
                </>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </WaitlistModalContext.Provider>
  );
}
