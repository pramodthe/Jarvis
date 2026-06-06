import { db } from "@/config/db";
import { CompletedExerciseTable, EnrolledCourseTable, usersTable } from "@/config/schema";
import { currentUser } from "@/lib/auth-server";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { courseId, chapterId, exerciseId, xpEarned } = await req.json();
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.insert(CompletedExerciseTable).values({
        chapterId: chapterId,
        courseId: courseId,
        exerciseId: exerciseId,
        userId: user.primaryEmailAddress.emailAddress
    }).returning()

    //Update Course XP Earned
    await db.update(EnrolledCourseTable).set({
        xpEarned: sql`${EnrolledCourseTable.xpEarned} + ${xpEarned}`
        //@ts-ignore
    }).where(eq(EnrolledCourseTable.courseId, courseId));
    //Update User XP Earn Points
    await db.update(usersTable).set({
        points: sql`${usersTable.points} + ${xpEarned}`
        //@ts-ignore
    }).where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress))

    return NextResponse.json(result);

}