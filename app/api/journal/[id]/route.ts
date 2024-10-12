import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PATCH(request: Request, { params }) {
  const { content } = await request.json();
  const user = await getUserByClerkId();

  const entry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(entry.content);

  await prisma.analysis.upsert({
      where: {
          entryId: entry.id
      },
      create: {
          userId: user.id,
          entryId: entry.id,
          ...analysis,
      },
      update: analysis,
  });

  return NextResponse.json({ data: { ...entry, analysis: analysis } });
}


export async function DELETE(request: Request, { params }) {
  const user = await getUserByClerkId();

  const deletedEntry = await prisma.journalEntry.delete({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
  });

  if (!deletedEntry) {
    return NextResponse.json({ error: "Entry not found or deletion failed" }, { status: 404 });
  }

  revalidatePath('/journal');


  return NextResponse.json({ message: "Entry deleted successfully" });
}
