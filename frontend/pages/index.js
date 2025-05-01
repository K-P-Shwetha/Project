import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import '../styles/index.css'
export default function Home() {
  const router = useRouter();
  return (
    <div className="index">
      <div class="melting-text-container">
    <h1 class="melting-text">MONEY MANAGER</h1>
    <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
</div>
    </div>
  );
}