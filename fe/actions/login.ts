"use server";

import { LoginSchema } from "@/types";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/signin`, {
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

  if (data.token) {
    return data;
  }

  throw new Error("Something went wrong");
};
