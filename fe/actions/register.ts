"use server";

import { RegisterSchema } from "@/types";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }

  if (data.user) {
    return data;
  }

  throw new Error("Something went wrong");
};
