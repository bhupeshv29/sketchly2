"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateRoomSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function CreateRoomForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateRoomSchema>>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      roomName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateRoomSchema>) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        form.setError("root", { message: data.error });
        return;
      }

      toast.success("Room created!");
      router.push(`/room/${values.roomName}`);
    } catch (err) {
      const msg = (err as Error).message || "Failed to create room";
      toast.error(msg);
      form.setError("root", { message: msg });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Link
            href="/dashboard"
            className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
        <CardTitle className="text-2xl">Create a new room</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {form.formState.errors.root && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            <FormField
              control={form.control}
              name="roomName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My awesome room"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Create Room
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
