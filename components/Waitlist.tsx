"use client"

import type React from "react"

import { Form } from "@heroui/form"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { useState } from "react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] Submitted email:", email)
    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
      <p 
        className="text-balance font-medium md:text-lg"
        style={{ color: "#D7E7FF" }}
      >
        Join the early list and get the 7-Day Nervous System Reset free.
      </p>
      <Form onSubmit={handleSubmit} className="flex flex-1 md:max-w-md">
        <div 
          className="flex w-full rounded-full overflow-hidden shadow-lg"
          style={{
            border: "2px solid rgba(215, 231, 255, 0.3)",
            backgroundColor: "rgba(0, 40, 96, 0.4)",
          }}
        >
          <Input
            type="email"
            placeholder="Email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 flex-1 border-0 bg-transparent focus-visible:ring-0"
            style={{ color: "#FFFFFF" }}
            classNames={{
              inputWrapper: "border-0 shadow-none bg-transparent rounded-none",
              input: "bg-transparent placeholder:text-[#D7E7FF] placeholder:opacity-60",
            }}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 whitespace-nowrap px-6 text-sm font-bold rounded-none border-0 transition-all duration-200"
            style={{
              backgroundColor: "#015EC2",
              color: "#FFFFFF",
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = "#D7E7FF";
                e.currentTarget.style.color = "#002860";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#015EC2";
              e.currentTarget.style.color = "#FFFFFF";
            }}
          >
            {isSubmitting ? "Joining..." : "Join the Early Access List"}
          </Button>
        </div>
      </Form>
    </div>
  )
}
