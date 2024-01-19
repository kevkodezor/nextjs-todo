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