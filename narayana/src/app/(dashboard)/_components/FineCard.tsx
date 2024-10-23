import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Trash2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Transaction {
  id: string;
  amount: number;
  type: "add" | "remove";
  date: string;
}

const FinanceCard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState<string>("");

  const addTransaction = (type: "add" | "remove") => {
    if (!amount || isNaN(Number(amount))) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: Number(amount),
      type,
      date: new Date().toLocaleDateString(),
    };

    setTransactions([...transactions, newTransaction]);
    setAmount("");
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const totalBalance = transactions.reduce((acc, curr) => {
    return curr.type === "add" ? acc + curr.amount : acc - curr.amount;
  }, 0);

  // Prepare data for chart
  const chartData = transactions.reduce((acc: any[], curr) => {
    const existingDay = acc.find((item) => item.date === curr.date);
    if (existingDay) {
      existingDay.amount += curr.type === "add" ? curr.amount : -curr.amount;
    } else {
      acc.push({
        date: curr.date,
        amount: curr.type === "add" ? curr.amount : -curr.amount,
      });
    }
    return acc;
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Financial Overview</span>
          <span
            className={`text-2xl ${
              totalBalance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${totalBalance.toFixed(2)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Transaction Input */}
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={() => addTransaction("add")}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
            <Button
              onClick={() => addTransaction("remove")}
              className="bg-red-600 hover:bg-red-700"
            >
              <Minus className="w-4 h-4 mr-1" /> Remove
            </Button>
          </div>

          {/* Transactions List */}
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-2 bg-gray-100 rounded"
              >
                <span
                  className={
                    transaction.type === "add"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {transaction.type === "add" ? "+" : "-"} ${transaction.amount}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {transaction.date}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTransaction(transaction.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="amount"
                  fill="#8884d8"
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinanceCard;
