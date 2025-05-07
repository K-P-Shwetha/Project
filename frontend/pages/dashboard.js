import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const router = useRouter();
  const [userToken, setUserToken] = useState(null);
  const [trans, setTrans] = useState([]);

  // ✅ Get token client-side only
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setUserToken(token);
    }
  }, []);

  // ✅ Fetch only when userToken is available
  useEffect(() => {
    if (!userToken) return;

    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/transactions", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setTrans(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransactions();
  }, [userToken]);

  const totalIncome = trans
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = trans
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const pieData = {
    labels: ["Income", "Expense", "Balance"],
    datasets: [
      {
        data: [totalIncome, totalExpense, balance],
        backgroundColor: ["rgb(34,197,94)", "rgb(239,68,68)", "rgb(59,130,246)"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <Card className="p-4 bg-green-500 text-white">
              <h4>Income: ₹{totalIncome}</h4>
            </Card>
            <Card className="p-4 bg-red-500 text-white">
              <h4>Expenses: ₹{totalExpense}</h4>
            </Card>
            <Card className="p-4 bg-blue-500 text-white">
              <h4>Balance: ₹{balance}</h4>
            </Card>
            <div id="chart">
              <Pie data={pieData} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
