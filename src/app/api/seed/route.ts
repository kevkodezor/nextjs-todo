import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {

    await prisma.todo.deleteMany(); // WARNING = delete * from todo
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            email: 'myuser@email.com',
            password: bcrypt.hashSync('123456'),
            rol: ['admin', 'user', 'superUser'],
            todos: {
                create: [
                    { description: 'Pasear a Susy', complete: true },
                    { description: 'Escuchar musica' },
                    { description: 'Practicar ingles' },
                    { description: 'Curso NextJs' },
                    { description: 'Plantilla Redux' },
                ]
            }
        }
    });

    // const todo = await prisma.todo.create({
    //     data: {
    //         description: 'First data with Prisma',
    //         complete: true
    //     }
    // });

    // console.log(todo);

    // await prisma.todo.createMany({
    //     data: [
    //         { description: 'Pasear a Susy', complete: true },
    //         { description: 'Escuchar musica' },
    //         { description: 'Practicar ingles' },
    //         { description: 'Curso NextJs' },
    //         { description: 'Plantilla Redux' },
    //     ],
    // });

    return NextResponse.json({ sms: 'Seed data base postgres with prisma'  });
}