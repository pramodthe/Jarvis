import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@/lib/auth-server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.primaryEmailAddress.emailAddress;

    // Update user subscription to 'unlimted' in database
    const updatedUser = await db.update(usersTable)
        .set({ subscription: "unlimted" })
        .where(eq(usersTable.email, email))
        .returning();

    if (updatedUser.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser[0]);
}
