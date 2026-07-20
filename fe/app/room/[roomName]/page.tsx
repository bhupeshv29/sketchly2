import { getRoom } from "@/actions/getRoom";
import { RoomCanvas } from "@/canvas/RoomCanvas";
import { RoomHeader } from "@/components/RoomHeader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const RoomPage = async (props: {
  params: Promise<{
    roomName: string;
  }>;
}) => {
  const params = await props.params;
  const roomName = params.roomName;

  let room;
  try {
    room = await getRoom(roomName);
  } catch {
    room = null;
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Room not found</h1>
          <p className="text-muted-foreground">
            The room &ldquo;{roomName}&rdquo; doesn&apos;t exist or has been
            deleted.
          </p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RoomHeader roomName={room.roomName} />
      <div className="pt-12">
        <RoomCanvas roomId={room.id} room={room} />
      </div>
    </div>
  );
};

export default RoomPage;
