import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import '../styles/index.css';
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      if (storedToken) {
        router.push("/dashboard"); // auto redirect if logged in
      }
    }
  }, []);

  return (
    <div className="index">
      <div className="melting-text-container">
        <h1 className="melting-text">MONEY MANAGER</h1>

        {/* Show buttons conditionally */}
        {token ? (
          <Button onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        ) : (
          <div className="space-x-4">
            <Button onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button onClick={() => router.push("/register")}>
              Register
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
