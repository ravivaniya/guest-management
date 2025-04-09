import { PrismaClient } from "@prisma/client";
import { Guest } from "@/lib/data";

const prisma = new PrismaClient();

async function main() {
  // Mock data for the guest table
  const guests: Guest[] = [
    {
      id: 1,
      guestId: "G001",
      name: "John Doe",
      address: "123 Main St, Anytown, USA",
      mobileNumber: "555-123-4567",
      familyMembers: 2,
    },
    {
      id: 2,
      guestId: "G002",
      name: "Jane Smith",
      address: "456 Oak Ave, Somewhere, USA",
      mobileNumber: "555-987-6543",
      familyMembers: 3,
    },
    {
      id: 3,
      guestId: "G003",
      name: "Robert Johnson",
      address: "789 Pine Rd, Nowhere, USA",
      mobileNumber: "555-456-7890",
      familyMembers: 1,
    },
    {
      id: 4,
      guestId: "G004",
      name: "Emily Davis",
      address: "321 Elm St, Anywhere, USA",
      mobileNumber: "555-789-0123",
      familyMembers: 4,
    },
    {
      id: 5,
      guestId: "G005",
      name: "Michael Wilson",
      address: "654 Maple Dr, Everywhere, USA",
      mobileNumber: "555-234-5678",
      familyMembers: 2,
    },
    {
      id: 6,
      guestId: "G006",
      name: "Sarah Brown",
      address: "987 Cedar Ln, Someplace, USA",
      mobileNumber: "555-345-6789",
      familyMembers: 5,
    },
    {
      id: 7,
      guestId: "G007",
      name: "David Miller",
      address: "159 Birch Blvd, Othertown, USA",
      mobileNumber: "555-456-7890",
      familyMembers: 3,
    },
    {
      id: 8,
      guestId: "G008",
      name: "Jennifer Taylor",
      address: "753 Spruce St, Newtown, USA",
      mobileNumber: "555-567-8901",
      familyMembers: 2,
    },
    {
      id: 9,
      guestId: "G009",
      name: "Thomas Anderson",
      address: "951 Willow Way, Oldtown, USA",
      mobileNumber: "555-678-9012",
      familyMembers: 1,
    },
    {
      id: 10,
      guestId: "G010",
      name: "Jessica Martinez",
      address: "357 Aspen Ave, Uptown, USA",
      mobileNumber: "555-789-0123",
      familyMembers: 4,
    },
    {
      id: 11,
      guestId: "G011",
      name: "Daniel Garcia",
      address: "246 Redwood Rd, Downtown, USA",
      mobileNumber: "555-890-1234",
      familyMembers: 3,
    },
    {
      id: 12,
      guestId: "G012",
      name: "Amanda Rodriguez",
      address: "135 Sequoia St, Midtown, USA",
      mobileNumber: "555-901-2345",
      familyMembers: 2,
    },
    {
      id: 13,
      guestId: "G013",
      name: "Christopher Lee",
      address: "864 Fir Ct, Crosstown, USA",
      mobileNumber: "555-012-3456",
      familyMembers: 5,
    },
    {
      id: 14,
      guestId: "G014",
      name: "Stephanie Hernandez",
      address: "975 Cypress Cir, Hometown, USA",
      mobileNumber: "555-123-4567",
      familyMembers: 1,
    },
  ];

  for (const guest of guests) {
    await prisma.guest.create({
      data: guest,
    });
  }

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
