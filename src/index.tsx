"use client";

import React, { useEffect, useContext } from "react";
import { useRouter } from 'next/navigation';
import { MyContext } from "./StateContext";

export default function Index() {
    const router = useRouter();
    const context = useContext(MyContext);


    if (!context) {
        return <div>Loading...</div>;
    }

    const { user } = context;

    useEffect(() => {
        if (!user.logged) {
            router.push("/auth/login");
        } else {
            router.push("/Sidebar");
        }
    }, [user.logged, router]);

}
