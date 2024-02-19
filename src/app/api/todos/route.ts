import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as yup from 'yup';
import { getUserSession } from "@/actions/auth";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10');
    const skip = Number(searchParams.get('skip') ?? '0');
    if (isNaN(take)) {
        return NextResponse.json(
            { sms: `Is not number ${take}` },
            { status: 400 }
        )
    }
    if (isNaN(skip)) {
        return NextResponse.json(
            { sms: `Is not number ${skip}` },
            { status: 400 }
        )
    }
    const todos = await prisma.todo.findMany({ take, skip });
    return NextResponse.json(todos);
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
    const user = await getUserSession();
    if (!user) {
        return NextResponse.json('No Authorized', { status: 401 });
    }

    try {
        const { complete, description } = await postSchema.validate(await request.json());
        const todo = await prisma.todo.create({ data: { complete, description, userId: user.id } });
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}

export async function DELETE(request: NextRequest) {
    const user = await getUserSession();
    if (!user) {
        return NextResponse.json('No Authorized', { status: 401 });
    }

    try {
        await prisma.todo.deleteMany({ where: { complete: true, userId: user.id } });
        return NextResponse.json({ sms: 'Todos deleted' })
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}