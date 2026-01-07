"use client";

import type React from "react";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import { BRAND_COLORS, BRAND_COLORS_RGBA } from "@/constants/brand";

export function WaitlistForm() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Submitted email:", email);
        setEmail("");
        setIsSubmitting(false);
    };

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <p
                className="text-balance font-medium md:text-lg"
                style={{ color: BRAND_COLORS.primary.light }}
            >
                Join the early list and get the 7-Day Nervous System Reset free.
            </p>
            <Form onSubmit={handleSubmit} className="flex flex-1 md:max-w-md">
                <div
                    className="flex w-full rounded-full overflow-hidden shadow-lg"
                    style={{
                        border: `2px solid ${BRAND_COLORS_RGBA.primaryLight[30]}`,
                        backgroundColor: BRAND_COLORS_RGBA.primaryDark[40],
                    }}
                >
                    <Input
                        type="email"
                        placeholder="Email here"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 flex-1 border-0 bg-transparent focus-visible:ring-0"
                        style={{ color: BRAND_COLORS.white }}
                        classNames={{
                            inputWrapper: "border-0 shadow-none bg-transparent rounded-none",
                            input: `bg-transparent placeholder:text-[${BRAND_COLORS.primary.light}] placeholder:opacity-60`,
                        }}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-12 whitespace-nowrap px-6 text-sm font-bold rounded-none border-0 transition-all duration-200"
                        style={{
                            backgroundColor: BRAND_COLORS.primary.main,
                            color: BRAND_COLORS.white,
                        }}
                        onMouseEnter={(e) => {
                            if (!isSubmitting) {
                                e.currentTarget.style.backgroundColor = BRAND_COLORS.primary.light;
                                e.currentTarget.style.color = BRAND_COLORS.primary.dark;
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = BRAND_COLORS.primary.main;
                            e.currentTarget.style.color = BRAND_COLORS.white;
                        }}
                    >
                        {isSubmitting ? "Joining..." : "Join the Early Access List"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

