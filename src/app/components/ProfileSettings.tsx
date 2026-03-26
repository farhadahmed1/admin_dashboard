import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function ProfileSettings() {
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState(
    localStorage.getItem("userEmail") ?? "admin@pharmadmin.com",
  );
  const [phone, setPhone] = useState("+46 70 000 0000");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("userEmail") ?? email);
  }, []);

  const handleSave = () => {
    if (!name || !email) {
      toast.error("Full name and email are required");
      return;
    }

    localStorage.setItem("userEmail", email);
    toast.success("Profile settings updated successfully");
    setPassword("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Update your account details and personal settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Keep your profile up to date with your latest contact info.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Full Name</Label>
              <Input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-phone">Phone Number</Label>
              <Input
                id="profile-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-password">New Password</Label>
              <Input
                id="profile-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Leave blank to keep current password"
              />
            </div>
          </div>

          <Button onClick={handleSave}>Save Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
