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
      <p className="text-balance font-medium text-white md:text-lg">
        Join the early list and get the 7-Day Nervous System Reset free.
      </p>
      <Form onSubmit={handleSubmit} className="flex flex-1 md:max-w-md">
        <div className="flex w-full rounded-full border-white bg-white/10 overflow-hidden">
          <Input
            type="email"
            placeholder="Email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 flex-1 border-0 bg-transparent text-white placeholder:text-white focus-visible:ring-0"
            classNames={{
              inputWrapper: "border-0 shadow-none bg-transparent rounded-none",
              input: "bg-transparent",
            }}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 whitespace-nowrap bg-white px-6 text-sm font-semibold text-gray-900 hover:bg-white/90 rounded-none border-0"
          >
            {isSubmitting ? "Joining..." : "Join the Early Access List"}
          </Button>
        </div>
      </Form>
    </div>
  )
}
