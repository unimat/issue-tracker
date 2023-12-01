
import { IssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import autOptions from "@/app/auth/authOptions";

export async function PATCH(
  request: NextRequest, 
  { params }: { params: { id: string }}) {
    const session = await getServerSession(autOptions)

    if (!session)
      return NextResponse.json({}, {status: 401})

    const body = await request.json()
    const validation = IssueSchema.safeParse(body)
    if (!validation.success)
      return NextResponse.json(validation.error.format(), {status: 400});

    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) }
    })
    if (!issue)
      return NextResponse.json({ error: 'Invalid issue' }, {status: 404});

    const UpdatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title: body.title,
        description: body.description
      }
    })

    return NextResponse.json(UpdatedIssue)
  }

export async function DELETE(
  request: NextRequest, 
  { params }: { params: { id: string }}
  ) {
    const session = await getServerSession(autOptions)

    if (!session)
      return NextResponse.json({}, {status: 401})

    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!issue)
      return NextResponse.json({error: 'Invalid Issue'}, { status: 404})

    await prisma.issue.delete({
      where: { id: issue.id }
    })

    return NextResponse.json({})
  }
    