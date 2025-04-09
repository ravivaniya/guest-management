"use client";
export interface Guest {
  id: number;
  guestId: string;
  name: string;
  address: string;
  mobileNumber: string;
  familyMembers: number;
}

export async function getGuests(): Promise<Guest[]> {
  const response = await fetch("/api/guests");
  if (!response.ok) {
    throw new Error("Failed to fetch guests");
  }
  return response.json();
}

export async function createGuest(data: Omit<Guest, "id">): Promise<Guest> {
  const response = await fetch("/api/guests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create guest");
  }
  return response.json();
}

export async function updateGuest(
  id: number,
  data: Partial<Guest>
): Promise<Guest> {
  const response = await fetch(`/api/guests/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      familyMembers: data.familyMembers
        ? Number(data.familyMembers)
        : undefined,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to update guest");
  }
  return response.json();
}

export async function deleteGuest(id: number): Promise<void> {
  const response = await fetch(`/api/guests/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete guest");
  }
}
