import { PrismaClient, Priority, Status } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Unable to reset password",
    description: "Customer is not receiving the password reset email.",
    customerEmail: "alice@example.com",
    priority: Priority.HIGH,
    status: Status.OPEN,
  },
  {
    title: "Payment failed during checkout",
    description: "Customer receives an error when trying to complete payment.",
    customerEmail: "bob@example.com",
    priority: Priority.HIGH,
    status: Status.IN_PROGRESS,
  },
  {
    title: "Account verification issue",
    description: "Verification email link is not working.",
    customerEmail: "charlie@example.com",
    priority: Priority.MEDIUM,
    status: Status.OPEN,
  },
  {
    title: "Unable to update profile",
    description: "Customer cannot save changes to their profile.",
    customerEmail: "david@example.com",
    priority: Priority.LOW,
    status: Status.RESOLVED,
  },
  {
    title: "Order status not updated",
    description: "The order status has not changed after shipment.",
    customerEmail: "emma@example.com",
    priority: Priority.MEDIUM,
    status: Status.IN_PROGRESS,
  },
  {
    title: "App crashes on login",
    description: "Mobile application closes immediately after login.",
    customerEmail: "frank@example.com",
    priority: Priority.HIGH,
    status: Status.OPEN,
  },
  {
    title: "Duplicate payment charged",
    description: "Customer reports being charged twice for one order.",
    customerEmail: "grace@example.com",
    priority: Priority.HIGH,
    status: Status.RESOLVED,
  },
  {
    title: "Invoice download failed",
    description: "Customer cannot download the invoice PDF.",
    customerEmail: "henry@example.com",
    priority: Priority.MEDIUM,
    status: Status.OPEN,
  },
  {
    title: "Notification emails delayed",
    description: "Customer receives notification emails several hours late.",
    customerEmail: "irene@example.com",
    priority: Priority.LOW,
    status: Status.IN_PROGRESS,
  },
  {
    title: "Subscription cancellation issue",
    description: "Customer cannot cancel their active subscription.",
    customerEmail: "jack@example.com",
    priority: Priority.HIGH,
    status: Status.OPEN,
  },
  {
    title: "Incorrect billing amount",
    description: "Customer was billed an amount different from the invoice.",
    customerEmail: "karen@example.com",
    priority: Priority.HIGH,
    status: Status.IN_PROGRESS,
  },
  {
    title: "Search results are incorrect",
    description: "Searching for products returns unrelated results.",
    customerEmail: "leo@example.com",
    priority: Priority.MEDIUM,
    status: Status.RESOLVED,
  },
  {
    title: "Profile image upload failed",
    description: "Customer gets an error while uploading a profile image.",
    customerEmail: "mia@example.com",
    priority: Priority.LOW,
    status: Status.OPEN,
  },
  {
    title: "Unable to access dashboard",
    description: "Customer sees a blank dashboard after signing in.",
    customerEmail: "noah@example.com",
    priority: Priority.HIGH,
    status: Status.IN_PROGRESS,
  },
  {
    title: "Refund has not arrived",
    description: "Customer requested a refund but has not received it.",
    customerEmail: "olivia@example.com",
    priority: Priority.HIGH,
    status: Status.OPEN,
  },
  {
    title: "Product image not loading",
    description: "Product images are missing from the product page.",
    customerEmail: "paul@example.com",
    priority: Priority.LOW,
    status: Status.RESOLVED,
  },
  {
    title: "Cart items disappearing",
    description: "Items disappear from the cart after refreshing the page.",
    customerEmail: "quinn@example.com",
    priority: Priority.MEDIUM,
    status: Status.OPEN,
  },
  {
    title: "Two-factor authentication issue",
    description: "Customer cannot complete two-factor authentication.",
    customerEmail: "rachel@example.com",
    priority: Priority.HIGH,
    status: Status.IN_PROGRESS,
  },
  {
    title: "Slow page loading",
    description: "Customer reports very slow loading times on the dashboard.",
    customerEmail: "sam@example.com",
    priority: Priority.MEDIUM,
    status: Status.RESOLVED,
  },
  {
    title: "Unable to change email",
    description: "Customer cannot change their registered email address.",
    customerEmail: "tina@example.com",
    priority: Priority.MEDIUM,
    status: Status.OPEN,
  },
  {
    title: "Missing order confirmation",
    description: "Customer did not receive an order confirmation email.",
    customerEmail: "uma@example.com",
    priority: Priority.LOW,
    status: Status.RESOLVED,
  },
  {
    title: "Checkout page not loading",
    description: "Checkout page remains stuck while loading.",
    customerEmail: "victor@example.com",
    priority: Priority.HIGH,
    status: Status.OPEN,
  },
  {
    title: "Incorrect product price",
    description: "Displayed product price differs from the checkout price.",
    customerEmail: "wendy@example.com",
    priority: Priority.MEDIUM,
    status: Status.IN_PROGRESS,
  },
  {
    title: "Account locked",
    description: "Customer account became locked after multiple login attempts.",
    customerEmail: "xavier@example.com",
    priority: Priority.HIGH,
    status: Status.RESOLVED,
  },
  {
    title: "Unable to apply discount",
    description: "Customer cannot apply a valid discount code.",
    customerEmail: "yara@example.com",
    priority: Priority.LOW,
    status: Status.OPEN,
  },
  {
    title: "Delivery address cannot be changed",
    description: "Customer cannot update the delivery address for an order.",
    customerEmail: "zach@example.com",
    priority: Priority.MEDIUM,
    status: Status.IN_PROGRESS,
  },
  {
    title: "Session expires unexpectedly",
    description: "Customer is logged out unexpectedly while using the application.",
    customerEmail: "aaron@example.com",
    priority: Priority.MEDIUM,
    status: Status.OPEN,
  },
  {
    title: "Report export failed",
    description: "Customer cannot export the requested report.",
    customerEmail: "bella@example.com",
    priority: Priority.LOW,
    status: Status.RESOLVED,
  },
  {
    title: "Support chat unavailable",
    description: "Customer cannot open the support chat window.",
    customerEmail: "carlos@example.com",
    priority: Priority.HIGH,
    status: Status.OPEN,
  },
  {
    title: "Incorrect notification preference",
    description: "Customer continues receiving notifications after disabling them.",
    customerEmail: "diana@example.com",
    priority: Priority.LOW,
    status: Status.RESOLVED,
  },
];

async function main() {
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets,
  });

  console.log(`Seeded ${tickets.length} tickets`);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });