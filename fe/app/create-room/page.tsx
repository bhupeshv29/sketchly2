"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { CreateRoomForm } from "@/components/auth/CreateRoomForm";

const CreateRoomPage = () => {
  return (
    <AuthGuard>
      <div className="w-full min-h-screen flex items-center justify-center bg-background px-4">
        <CreateRoomForm />
      </div>
    </AuthGuard>
  );
};

export default CreateRoomPage;
