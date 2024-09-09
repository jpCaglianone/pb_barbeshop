"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { MyContext } from "@/StateContext";
import Index from "..";

interface User {
  name: string;
  logged: boolean;
  token: string;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    name: "",
    logged: false,
    token: ""
  });

  useEffect(() => {
    if (!user.logged) {
      router.push("/auth/login");
    } else {
      router.push("/dashboard");
    }
  }, [user.logged, router]);

  return (
    <MyContext.Provider value={{ user, setUser }}>
      <main>
        <Index />
      </main>
    </MyContext.Provider>
  );
}
