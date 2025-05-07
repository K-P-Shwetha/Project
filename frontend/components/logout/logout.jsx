"use client";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    router.push("/");                 // Redirect to home
  };

  return (
    <div className="btn">
    <Button onClick={handleLogout} variant="destructive" >Logout</Button>
    </div>
  );
};

export default Logout;
