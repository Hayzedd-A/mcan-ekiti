import { JWT_SECRET } from "@/config/constants";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

const JWTSecret = new TextEncoder().encode(JWT_SECRET as string);

export interface AdminPayload {
  id: string;
  email: string;
  [key: string]: unknown;
}

export async function signToken(payload: AdminPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWTSecret);
}

export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWTSecret);
    return { id: payload.id as string, email: payload.email as string };
  } catch (error) {
    console.log("verification failed: ", error);
    return null;
  }
}

export async function getAdminFromRequest(
  req: NextRequest,
): Promise<AdminPayload | null> {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}
