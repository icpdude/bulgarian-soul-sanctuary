import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "income",
    amount: 5000,
    category: "Donations",
    description: "Community fundraiser",
    date: "2025-01-10"
  },
  {
    id: "2",
    type: "expense",
    amount: 1200,
    category: "Educational Programs",
    description: "Course materials",
    date: "2025-01-08"
  },
  {
    id: "3",
    type: "income",
    amount: 3500,
    category: "NFT Sales",
    description: "Digital heritage collection",
    date: "2025-01-12"
  }
];

export const TreasuryManagement = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "expense" as "income" | "expense",
    amount: "",
    category: "",
    description: ""
  });

  const totalBalance = transactions.reduce((acc, t) => 
    t.type === "income" ? acc + t.amount : acc - t.amount, 0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setShowForm(false);
    setFormData({ type: "expense", amount: "", category: "", description: "" });
    toast({
      title: "Transaction Added",
      description: `${formData.type === "income" ? "Income" : "Expense"} recorded successfully`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Treasury Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
            ${totalBalance.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "New Transaction"}
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Add Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value: "income" | "expense") => 
                        setFormData(prev => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    required
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <Button type="submit" className="w-full">Add Transaction</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-primary/20 bg-card/50 backdrop-blur">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === "income" 
                        ? "bg-green-500/10 text-green-500" 
                        : "bg-red-500/10 text-red-500"
                    }`}>
                      {transaction.type === "income" ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <p className={`text-lg font-bold ${
                    transaction.type === "income" ? "text-green-500" : "text-red-500"
                  }`}>
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
