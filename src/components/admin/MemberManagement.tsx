import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Crown, User, UserCog } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Member {
  id: string;
  name: string;
  email: string;
  role: "admin" | "moderator" | "member";
  joinedAt: string;
  votingPower: number;
}

const mockMembers: Member[] = [
  {
    id: "1",
    name: "Elena Dimitrova",
    email: "elena@example.com",
    role: "admin",
    joinedAt: "2024-01-15",
    votingPower: 100
  },
  {
    id: "2",
    name: "Ivan Petrov",
    email: "ivan@example.com",
    role: "moderator",
    joinedAt: "2024-02-20",
    votingPower: 50
  },
  {
    id: "3",
    name: "Maria Georgieva",
    email: "maria@example.com",
    role: "member",
    joinedAt: "2024-11-10",
    votingPower: 10
  },
  {
    id: "4",
    name: "Georgi Ivanov",
    email: "georgi@example.com",
    role: "member",
    joinedAt: "2025-01-05",
    votingPower: 5
  }
];

export const MemberManagement = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers);

  const handleRoleChange = (id: string, newRole: "admin" | "moderator" | "member") => {
    setMembers(prev => 
      prev.map(m => m.id === id ? { ...m, role: newRole } : m)
    );
    toast({
      title: "Role Updated",
      description: `Member role has been changed to ${newRole}`,
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return <Crown className="w-4 h-4" />;
      case "moderator": return <Shield className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin": return "default";
      case "moderator": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="w-5 h-5" />
            Member Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">
                {members.filter(m => m.role === "admin").length}
              </p>
              <p className="text-sm text-muted-foreground">Admins</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {members.filter(m => m.role === "moderator").length}
              </p>
              <p className="text-sm text-muted-foreground">Moderators</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {members.filter(m => m.role === "member").length}
              </p>
              <p className="text-sm text-muted-foreground">Members</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-xl font-semibold">All Members</h3>

      <div className="space-y-4">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-primary/20 bg-card/50 backdrop-blur">
              <CardContent className="py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{member.name}</p>
                        <Badge variant={getRoleBadgeVariant(member.role)} className="flex items-center gap-1">
                          {getRoleIcon(member.role)}
                          {member.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Joined: {member.joinedAt} • Voting Power: {member.votingPower}
                      </p>
                    </div>
                  </div>
                  <div className="w-40">
                    <Select 
                      value={member.role} 
                      onValueChange={(value: "admin" | "moderator" | "member") => 
                        handleRoleChange(member.id, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
