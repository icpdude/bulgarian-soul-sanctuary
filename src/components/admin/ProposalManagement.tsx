import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  votes: { for: number; against: number };
  createdAt: string;
}

const mockProposals: Proposal[] = [
  {
    id: "1",
    title: "Expand Educational Programs",
    description: "Allocate funds for new spiritual education courses",
    status: "pending",
    votes: { for: 45, against: 12 },
    createdAt: "2025-01-10"
  },
  {
    id: "2",
    title: "Community Garden Initiative",
    description: "Create sacred gardens in 5 Bulgarian cities",
    status: "approved",
    votes: { for: 78, against: 5 },
    createdAt: "2025-01-08"
  },
  {
    id: "3",
    title: "Digital Archive Project",
    description: "Digitize historical spiritual texts and artifacts",
    status: "pending",
    votes: { for: 34, against: 28 },
    createdAt: "2025-01-12"
  }
];

export const ProposalManagement = () => {
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);

  const handleStatusChange = (id: string, newStatus: "approved" | "rejected") => {
    setProposals(prev => 
      prev.map(p => p.id === id ? { ...p, status: newStatus } : p)
    );
    toast({
      title: "Proposal Updated",
      description: `Proposal has been ${newStatus}`,
    });
  };

  const handleDelete = (id: string) => {
    setProposals(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Proposal Deleted",
      description: "The proposal has been removed",
    });
  };

  const getStatusBadge = (status: string): "default" | "secondary" | "destructive" => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive"
    };
    return variants[status] || "secondary";
  };

  return (
    <div className="space-y-4">
      {proposals.map((proposal, index) => (
        <motion.div
          key={proposal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-primary/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{proposal.title}</CardTitle>
                  <CardDescription>{proposal.description}</CardDescription>
                </div>
                <Badge variant={getStatusBadge(proposal.status)}>
                  {proposal.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-6 text-sm text-muted-foreground">
                  <span>For: {proposal.votes.for}</span>
                  <span>Against: {proposal.votes.against}</span>
                  <span>Date: {proposal.createdAt}</span>
                </div>

                {proposal.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(proposal.id, "approved")}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusChange(proposal.id, "rejected")}
                      className="flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(proposal.id)}
                      className="flex items-center gap-2 ml-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
