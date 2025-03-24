"use client"

import { useEffect, useState } from "react"

interface User {
    user : {id: string;
    name: string;
    room: {
      id: string;
      roomName: string;
    }[];}
  }
  
  interface UseUserResponse {
    user: User | undefined; 
    isLoading: boolean;
    error: string | null; 
  }
  

export const useUser = () : UseUserResponse => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isLoading , setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchUser = async () =>{
            setIsLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/user`, {
                    method: "GET",
                    headers: {
                        "authorization": `${localStorage.getItem("token")}`
                    }
                });

                if (!res.ok) {
                    throw new Error("Something Went Wrong");
                }

                const data = await res.json();
                setUser(data);
            } catch (e:any) {
                setError(e.message || "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, isLoading, error };
}