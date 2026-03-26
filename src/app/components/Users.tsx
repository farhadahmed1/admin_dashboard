import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { Search, Plus, MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "manager" | "pharmacist" | "support";
  status: "active" | "inactive";
  joinedAt: string;
}

const initialUsers: User[] = [
  {
    id: "u1",
    name: "Sofia Berg",
    email: "sofia.berg@pharmadmin.com",
    phone: "+46 70 123 4567",
    role: "admin",
    status: "active",
    joinedAt: "2024-01-20",
  },
  {
    id: "u2",
    name: "Emil Johansson",
    email: "emil.johansson@pharmadmin.com",
    phone: "+46 70 234 5678",
    role: "pharmacist",
    status: "active",
    joinedAt: "2024-03-01",
  },
  {
    id: "u3",
    name: "Lisa Karlsson",
    email: "lisa.karlsson@pharmadmin.com",
    phone: "+46 70 345 6789",
    role: "support",
    status: "inactive",
    joinedAt: "2024-02-12",
  },
];

export function Users() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRole, setNewRole] = useState<User["role"]>("manager");
  const [newStatus, setNewStatus] = useState<User["status"]>("active");

  const filteredUsers = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(normalized) ||
        user.email.toLowerCase().includes(normalized) ||
        user.role.toLowerCase().includes(normalized);

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [query, users, statusFilter]);

  const handleAddUser = () => {
    if (!newName || !newEmail || !newPhone || !newRole) {
      toast.error("Please provide name, email, phone and role to add a user");
      return;
    }

    const newUser: User = {
      id: `u${Date.now()}`,
      name: newName,
      email: newEmail,
      phone: newPhone,
      role: newRole,
      status: newStatus,
      joinedAt: new Date().toISOString().split("T")[0],
    };

    setUsers((prev) => [newUser, ...prev]);
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setNewRole("manager");
    setNewStatus("active");
    setIsAddModalOpen(false);
    toast.success("User added successfully");
  };

  const handleRemove = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    toast.success("User removed");
  };

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user,
      ),
    );
    toast.success("User status updated");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">
            Manage staff users and permissions for the dashboard
          </p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new staff member to the system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="modal-name">Name</Label>
                <Input
                  id="modal-name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-email">Email</Label>
                <Input
                  id="modal-email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="user@pharmadmin.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-phone">Phone</Label>
                <Input
                  id="modal-phone"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+46 70 000 0000"
                  type="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-role">Role</Label>
                <select
                  id="modal-role"
                  className="w-full rounded-lg border p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as User["role"])}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="support">Support</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-status">Status</Label>
                <select
                  id="modal-status"
                  className="w-full rounded-lg border p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  value={newStatus}
                  onChange={(e) =>
                    setNewStatus(e.target.value as User["status"])
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <Button className="w-full" onClick={handleAddUser}>
                Create User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or role..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "active", "inactive"] as const).map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={statusFilter === status ? "default" : "outline"}
                  onClick={() => setStatusFilter(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "active" ? "default" : "secondary"
                        }
                        className="capitalize"
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() => toggleStatus(user.id)}
                            >
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => toggleStatus(user.id)}
                            >
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleRemove(user.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredUsers.length === 0 && (
              <div className="p-6 text-center text-muted-foreground">
                No users found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
