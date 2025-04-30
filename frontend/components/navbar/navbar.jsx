import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link href="/" className="text-lg font-bold">Money Manager</Link>
      <div className="space-x-4">
        <Button variant="ghost" asChild><Link href="/dashboard">Dashboard</Link></Button>
        <Button variant="ghost" asChild><Link href="/transactions">Transactions</Link></Button>
        <Button variant="ghost" asChild><Link href="/settings">Settings</Link></Button>
      </div>
    </nav>
  );
}
