import { getServerSession } from "next-auth/next";
import { SignJWT } from "jose";
import { env } from "@/utils/env";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse("No session", { status: 401 });
  }

  if (!session.user?.email) {
    return new NextResponse("No email", { status: 401 });
  }

  var jwt = await new SignJWT({ sub: session.user?.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(env("JWT_SECRET")));

  return NextResponse.json({ token: jwt });
}
