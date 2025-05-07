import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import TransactionForm from "@/components/transactionForm/TransactionForm";
import axios from "axios";

export default function Transactions() {
  const [trans, setTrans] = useState([]);
  const userToken = localStorage.getItem("token");
  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/transactions",  {
        headers: {
          Authorization: `Bearer ${userToken}`
      }});
      setTrans(res.data);
    } catch (err) {
      console.error("Failed to fetch:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTransactionSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/transactions", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      setTrans((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error saving transaction:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-xl font-bold mb-4">Transactions</h2>
          
          {/* ✅ Corrected here */}
          <TransactionForm onSubmit={handleTransactionSubmit} />

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">All Transactions</h3>
            {trans.length > 0 ? (
              trans.map((t, idx) => (
                <div key={idx} className="p-2 border rounded mb-2">
                  ₹{t.amount} - {t.category} ({t.type})
                </div>
              ))
            ) : (
              <p>No transactions yet.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
