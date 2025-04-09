"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { type Guest, updateGuest, deleteGuest } from "@/lib/data";

interface GuestTableProps {
  searchQuery: string;
  initialGuests: Guest[];
}

export function GuestTable({ searchQuery, initialGuests }: GuestTableProps) {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof Guest | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Guest>>({});

  const rowsPerPage = 10;

  useEffect(() => {
    setGuests(initialGuests);
  }, [initialGuests]);

  // Filter and sort guests
  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.mobileNumber.includes(searchQuery) ||
      guest.guestId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedGuests = [...filteredGuests].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  // Paginate guests
  const paginatedGuests = sortedGuests.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(sortedGuests.length / rowsPerPage);

  const handleSort = (column: keyof Guest) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleEdit = (guest: Guest) => {
    setCurrentGuest(guest);
    setEditFormData({ ...guest });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this guest?")) {
      await deleteGuest(id);
      setGuests(guests.filter((guest) => guest.id !== id)); // Update guests state directly
    }
  };

  const handleSaveEdit = async () => {
    if (currentGuest && editFormData) {
      await updateGuest(currentGuest.id, editFormData);
      setIsEditDialogOpen(false);
      setGuests(
        guests.map((guest) =>
          guest.id === currentGuest.id ? { ...guest, ...editFormData } : guest
        )
      ); // Update guests state directly
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Sr. No.</TableHead>
              <TableHead
                onClick={() => handleSort("guestId")}
                className="cursor-pointer"
              >
                Guest ID <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("name")}
                className="cursor-pointer"
              >
                Guest Name <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("address")}
                className="cursor-pointer"
              >
                Address <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("mobileNumber")}
                className="cursor-pointer"
              >
                Mobile Number <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("familyMembers")}
                className="cursor-pointer"
              >
                Family Members <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedGuests.length > 0 ? (
              paginatedGuests.map((guest, index) => (
                <TableRow key={guest.guestId}>
                  <TableCell>
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell>{guest.guestId}</TableCell>
                  <TableCell>{guest.name}</TableCell>
                  <TableCell>{guest.address}</TableCell>
                  <TableCell>{guest.mobileNumber}</TableCell>
                  <TableCell>{guest.familyMembers}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(guest)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(guest.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {paginatedGuests.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0}{" "}
          to {Math.min(currentPage * rowsPerPage, sortedGuests.length)} of{" "}
          {sortedGuests.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="text-sm">
            Page {currentPage} of {totalPages || 1}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Guest</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={editFormData.name || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={editFormData.address || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mobileNumber" className="text-right">
                Mobile Number
              </Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                value={editFormData.mobileNumber || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="familyMembers" className="text-right">
                Family Members
              </Label>
              <Input
                id="familyMembers"
                name="familyMembers"
                value={editFormData.familyMembers || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setIsEditDialogOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveEdit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
