"use client";

import { useState } from "react";
import { useFormStore } from "@/store/useFormStore";
import { supabase, type ContactSubmission } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function ContactForm() {
  const {
    email,
    phone,
    isLoading,
    isSubmitted,
    error,
    setEmail,
    setPhone,
    setLoading,
    setSubmitted,
    setError,
  } = useFormStore();

  const [contactType, setContactType] = useState<"email" | "phone">("email");
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!", { contactType, email, phone });
    setError(null);

    // Test Supabase connection first
    try {
      console.log("Testing Supabase connection...");
      const { data: testData, error: testError } = await supabase
        .from("contact_submissions")
        .select("count")
        .limit(1);

      console.log("Supabase connection test:", { testData, testError });

      if (testError) {
        console.error("Supabase connection failed:", testError);
        setError(`Database connection failed: ${testError.message}`);
        return;
      }
    } catch (connectionError) {
      console.error("Supabase connection error:", connectionError);
      setError(
        "Unable to connect to database. Please check your internet connection."
      );
      return;
    }

    if (contactType === "email" && !validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (contactType === "phone" && !validatePhone(phone)) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);

    try {
      // Prepare data for Supabase
      const submissionData: Omit<ContactSubmission, "id" | "created_at"> = {
        name: contactType === "email" ? email : phone, // Using email/phone as name for now
        message: "User wants to be notified when we're back online",
        ...(contactType === "email" ? { email } : { phone }),
      };

      console.log("Submitting to Supabase:", submissionData);

      // Insert into Supabase
      const { data, error: supabaseError } = await supabase
        .from("contact_submissions")
        .insert([submissionData])
        .select();

      console.log("Supabase response:", { data, error: supabaseError });

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        throw supabaseError;
      }

      // Show success toast
      toast({
        title: "Success! 🎉",
        description:
          "We've received your contact information and will notify you when we're back online.",
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Something went wrong. Please try again.");

      // Show error toast
      toast({
        title: "Error",
        description:
          "Failed to submit your contact information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank you!</h3>
        <p className="text-gray-600">
          We&apos;ve received your contact information and will notify you when
          we&apos;re back online.
        </p>
        <button
          onClick={() => useFormStore.getState().resetForm()}
          className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Submit another contact
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          How would you like us to contact you?
        </label>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setContactType("email")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              contactType === "email"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setContactType("phone")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              contactType === "phone"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Phone
          </button>
        </div>
      </div>

      <div>
        {contactType === "email" ? (
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left"
              placeholder="your@email.com"
              required
            />
          </div>
        ) : (
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left"
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Debug button to test form functionality */}
      <button
        type="button"
        onClick={() => {
          console.log("Debug button clicked!");
          toast({
            title: "Debug Test",
            description:
              "Toast is working! Form state: " +
              JSON.stringify({ contactType, email, phone, isLoading }),
          });
        }}
        className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 mb-2"
      >
        🐛 Test Toast & Debug
      </button>

      <button
        type="submit"
        disabled={isLoading || (contactType === "email" ? !email : !phone)}
        onClick={() =>
          console.log("Button clicked!", {
            isLoading,
            contactType,
            email,
            phone,
          })
        }
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            Submitting...
          </div>
        ) : (
          "Notify Me When We're Back"
        )}
      </button>
    </form>
  );
}
