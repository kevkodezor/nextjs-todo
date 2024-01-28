import { NextRequest, NextResponse } from "next/server";
import { Todo } from "@prisma/client";
import prisma from "@/lib/prisma";
import * as yup from 'yup';

interface Params {
    params: {
        id: string;
    }
}

const getTodo = async (id: string):Promise<Todo | null> => {
    const todo = await prisma.todo.findUnique({ where: { id }});
    return todo;
}

export async function GET(request: NextRequest, { params }: Params) {

    const todo = await getTodo(params.id);
    
    if (!todo) {
        return NextResponse.json(
            { sms: `ID '${params.id}' not exist` },
            { status: 404 }
        )
    }
    return NextResponse.json(todo);
}

const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional()
});

export async function PUT(request: NextRequest, { params }: Params) {

    const todo = await getTodo(params.id);
    
    if (!todo) {
        return NextResponse.json(
            { sms: `ID '${params.id}' not exist` },
            { status: 404 }
        )
    }

    try {
        const { complete, description } = await putSchema.validate(await request.json());
        const updateTodo = await prisma.todo.update({
            where: { id: params.id },
            data: { complete, description }
        });
        return NextResponse.json(updateTodo);
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}