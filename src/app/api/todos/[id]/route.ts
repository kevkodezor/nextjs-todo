import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
    params: {
        id: string;
    }
}

export async function GET(request: NextRequest, { params }: Params) {
    const { id } = params;
    const todo = await prisma.todo.findUnique({
        where: { id }
    });
    if (!todo) {
        return NextResponse.json(
            { sms: `ID '${id}' not exist` },
            { status: 404 }
        )
    }
    return NextResponse.json(todo);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { id } = params;
    const todo = await prisma.todo.findUnique({
        where: { id }
    });
    
    if (!todo) {
        return NextResponse.json(
            { sms: `ID '${id}' not exist` },
            { status: 404 }
        )
    }

    const body = await request.json();
    const updateTodo = await prisma.todo.update({
        where: { id },
        data: {...body}
    });

    return NextResponse.json(updateTodo);
}