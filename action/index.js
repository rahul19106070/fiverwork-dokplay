"use server";

import { signIn } from "@/auth"; // next-auth's signIn or your custom wrapper
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function login(formData) {
  try {
    const result = await signIn("credentials", {
      email: formData?.email,
      password: formData?.password,
      redirect: false, // Important to manually handle redirection
    });

    // Check if login was successful
    if (result?.ok) {
      redirect("/auth/dashboard");
    } else {
      // Return an error that UI can handle (optional)
      return {
        error: "Invalid email or password",
      };
    }
  } catch (error) {
    if (isRedirectError(error)) {
      redirect("/");
    }

    console.error("Login error:", error);
    return {
      error: "Something went wrong. Try again later.",
    };
  }
}
