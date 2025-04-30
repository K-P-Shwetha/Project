import { useState } from "react";

export default function TransactionForm({ onSubmit}) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the amount
    if (isNaN(amount) || amount <= 0) {
      console.error("Please enter a valid amount.");
      return;
    }

    // Pass the form data to the parent component
    onSubmit({
      amount: parseFloat(amount), // Convert amount to number
      category,
      type,
    });

    // Reset form fields
    setAmount("");
    setCategory("");
    setType("expense");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded mb-6">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Transaction
      </button>
    </form>
  );
}
