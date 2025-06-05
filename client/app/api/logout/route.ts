import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = cookies();
    (await cookieStore).delete("jwt");
    (await cookieStore).delete("user");

    return NextResponse.json({ success: true });
}