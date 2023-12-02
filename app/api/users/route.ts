import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

export async function GET(requset: NextRequest) {
  const users = await prisma.user.findMany({orderBy: { name: 'asc' }})
  return NextResponse.json(users)
}