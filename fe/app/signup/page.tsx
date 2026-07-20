"use client";

import { GuestGuard } from "@/components/GuestGuard";
import { RegisterForm } from "@/components/auth/Register-form";

const SignupPage = () => {
  return (
    <GuestGuard>
      <div className="w-full min-h-screen flex items-center justify-center bg-background px-4">
        <RegisterForm />
      </div>
    </GuestGuard>
  );
};

export default SignupPage;
