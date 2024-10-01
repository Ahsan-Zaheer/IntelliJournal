import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();

  if (user) {
    const match = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    // Only create a new user if no match is found
    if (!match) {
      await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
        },
      });
    }

    redirect('/journal');
  } else {
    console.error("No current user found");
    // Handle no user scenario
  }
};

export default async function NewUser() {
  await createNewUser();
  return (
    <div>....Loading</div>
  );
}
