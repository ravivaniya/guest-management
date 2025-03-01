"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GuestTable } from "@/components/guest-table";
import { getCookie } from "@/lib/utils";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const auth = getCookie("auth");
    if (!auth) {
      router.push("/signin");
      return;
    }

    // Get username from cookie
    const storedUsername = getCookie("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [router]);

  const handleSignOut = () => {
    // Clear cookies
    document.cookie = "auth=; path=/; max-age=0";
    document.cookie = "username=; path=/; max-age=0";
    router.push("/signin");
  };

  const handleAddGuest = () => {
    // In a real app, this would open a modal to add a new guest
    alert("Add guest functionality is not implemented yet");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    // In a real app, this would save data to a backend
    alert("Data saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Guest Management System</h1>
          <div className="flex items-center gap-4">
            <span>
              Welcome, <strong>{username}</strong>
            </span>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Guest List</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="w-full max-w-sm">
              <Input
                type="search"
                placeholder="Search guests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleAddGuest}>
                Add Guest
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                Print PDF
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>

          <GuestTable searchQuery={searchQuery} />
        </div>
      </main>
    </div>
  );
}
