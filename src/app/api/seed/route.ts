import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {

    await prisma.todo.deleteMany(); // WARNING = delete * from todo

    // const todo = await prisma.todo.create({
    //     data: {
    //         description: 'First data with Prisma',
    //         complete: true
    //     }
    // });

    // console.log(todo);

    await prisma.todo.createMany({
        data: [
            { description: 'Pasear a Susy', complete: true },
            { description: 'Escuchar musica' },
            { description: 'Practicar ingles' },
            { description: 'Curso NextJs' },
            { description: 'Plantilla Redux' },
        ],
    });
    

    return NextResponse.json({ sms: 'Seed data base postgres with prisma'  });
}