"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Login from "./(auth)/login/page";
import { AppContext } from "./context/AppContext";

export default function Home() {
  const { aToken } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (aToken) {
      router.push("/admin"); // Redirect to Admin Page (change the path if needed)
    }
  }, [aToken, router]);

  return <>{!aToken ? <Login /> : null}</>;
}
