"use client";

import { GuestGuard } from "@/components/GuestGuard";
import { LoginForm } from "@/components/auth/LoginForm";

const SigninPage = () => {
  return (
    <GuestGuard>
      <div className="w-full min-h-screen flex items-center justify-center bg-background px-4">
        <LoginForm />
      </div>
    </GuestGuard>
  );
};

export default SigninPage;
