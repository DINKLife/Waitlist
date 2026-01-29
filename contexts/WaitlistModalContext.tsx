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
  null,
);

export function useWaitlistModal() {
  const ctx = useContext(WaitlistModalContext);

  if (!ctx)
    throw new Error(
      "useWaitlistModal must be used within WaitlistModalProvider",
    );

  return ctx;
}

export function WaitlistModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
        classNames={{
          base: "border border-gray-200",
          header: "border-b border-gray-100",
          footer: "border-t border-gray-100",
        }}
        isOpen={isOpen}
        placement="center"
        size="md"
        onOpenChange={(open) => {
          if (!open) closeWaitlistModal();
        }}
      >
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              <h2
                className="text-xl font-bold"
                style={{ color: BRAND_COLORS.primary.dark }}
              >
                Get Early Access
              </h2>
              <p className="text-sm font-normal text-gray-600">
                One AI co-pilot for community, travel, and wellness—built for
                adventurers and intentional living. Less juggling. Smarter
                plans. Real community.
              </p>
            </ModalHeader>
            <ModalBody>
              {success ? (
                <div className="text-center text-gray-700 py-4 space-y-2">
                  <p>
                    You&apos;re on the list. Check your email for a welcome
                    message.
                  </p>
                  <p className="text-sm">
                    We&apos;ll email you when early access opens and with
                    occasional updates.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {error && (
                    <p className="text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}
                  <Input
                    isRequired
                    autoComplete="email"
                    label="Email"
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onValueChange={setEmail}
                  />
                  <Input
                    autoComplete="name"
                    label="Name (optional)"
                    placeholder="Your name"
                    type="text"
                    value={name}
                    onValueChange={setName}
                  />
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              {success ? (
                <Button
                  style={{
                    background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 100%)`,
                    color: "white",
                  }}
                  type="button"
                  onPress={closeWaitlistModal}
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
                    isDisabled={loading}
                    isLoading={loading}
                    style={{
                      background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 100%)`,
                      color: "white",
                    }}
                    type="submit"
                  >
                    Get Early Access
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
