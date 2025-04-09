"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GuestTable } from "@/components/guest-table";
import { getGuests, Guest } from "@/lib/data";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [guests, setGuests] = useState<Guest[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      router.push("/signin");
    }

    fetchGuests();
  }, [router]);

  const fetchGuests = async () => {
    try {
      const fetchedGuests = await getGuests();
      setGuests(fetchedGuests);
    } catch (error) {
      console.error("Failed to fetch guests:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/signout", { method: "POST" });
      if (response.ok) {
        const redirectUrl = response.headers.get("X-Redirect");
        if (redirectUrl) {
          router.push(redirectUrl);
        }
      } else {
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error during sign out:", error);
    }
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
          <GuestTable searchQuery={searchQuery} initialGuests={guests} />
        </div>
      </main>
    </div>
  );
}
